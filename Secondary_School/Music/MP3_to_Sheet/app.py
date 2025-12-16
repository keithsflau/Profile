import os
import shutil
import subprocess
import torch
import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from basic_pitch.inference import predict
from basic_pitch import ICASSP_2022_MODEL_PATH
import pretty_midi
import numpy as np
from pathlib import Path

# --- Configuration ---
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
TEMPLATES_DIR = Path("templates")

UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Soniq MP3 to Sheet Music")
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Hardware Check ---
if torch.cuda.is_available():
    DEVICE = "cuda"
    print(f"✅ Running on {torch.cuda.get_device_name(0)} (RTX 4090 Optimized)")
else:
    DEVICE = "cpu"
    print("⚠️ CUDA not available. Running on CPU (Expect slow performance).")

# --- Core Logic ---

def quantize_midi(pm: pretty_midi.PrettyMIDI) -> pretty_midi.PrettyMIDI:
    """
    Quantizes the MIDI notes to a 1/16th note grid.
    """
    # 1. Estimate tempo (if variable, this is just an average)
    bpm = pm.estimate_tempo()
    if bpm is None or bpm == 0:
        bpm = 120.0  # Fallback
    
    print(f"Quantizing at estimated BPM: {bpm}")
    
    # 60 seconds / BPM = seconds per beat
    # 1/16th note = 1/4 of a beat
    quarter_note_duration = 60.0 / bpm
    sixteenth_note_duration = quarter_note_duration / 4.0
    
    for instrument in pm.instruments:
        for note in instrument.notes:
            # Snap start time
            quantized_start = round(note.start / sixteenth_note_duration) * sixteenth_note_duration
            # Snap end time (ensure at least one 16th note length)
            quantized_end = round(note.end / sixteenth_note_duration) * sixteenth_note_duration
            if quantized_end <= quantized_start:
                quantized_end = quantized_start + sixteenth_note_duration
            
            note.start = quantized_start
            note.end = quantized_end
            
    return pm

def run_demucs(input_path: Path) -> Path:
    """
    Separates audio using Demucs (htdemucs) on CUDA.
    Returns the path to the 'no_vocals' (instrumental) stem.
    """
    input_str = str(input_path)
    print(f"Starting Demucs separation on {input_str}...")
    
    # Using 'htdemucs' model, 2 stems (vocals/no_vocals)
    # Output structure: separated/htdemucs/{track_name}/...
    cmd = [
        "demucs",
        "-n", "htdemucs",
        "--two-stems", "vocals",
        "-d", DEVICE,
        str(input_path),
        "-o", str(OUTPUT_DIR)
    ]
    
    # Run Demucs
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Demucs Error: {result.stderr}")
        raise RuntimeError("Demucs separation failed")
        
    print("Demucs separation complete.")
    
    # Locate output file
    # Demucs creates a folder with the filename (without ext) inside the output dir
    track_name = input_path.stem
    # Standard path: output_dir/htdemucs/{track_name}/no_vocals.wav
    no_vocals_path = OUTPUT_DIR / "htdemucs" / track_name / "no_vocals.wav"
    
    if not no_vocals_path.exists():
        # Fallback search if something changed in demucs version
        print(f"Warning: Expected path {no_vocals_path} not found. Searching...")
        found = list(OUTPUT_DIR.glob(f"**/{track_name}/no_vocals.wav"))
        if found:
            no_vocals_path = found[0]
        else:
            raise FileNotFoundError(f"Could not find separated audio for {track_name}")
            
    return no_vocals_path

def convert_audio_to_midi(audio_path: Path) -> pretty_midi.PrettyMIDI:
    """
    Uses Spotify's Basic Pitch to transcribe audio to MIDI.
    """
    print(f"Transcribing {audio_path} using Basic Pitch...")
    
    # Basic Pitch invocation
    # predict returns: model_output, midi_data, note_events
    # We rely on the internal device management of basic-pitch
    # Note: basic-pitch uses TF/TFLite, but is fast on CPU for inference if GPU fails.
    
    model_output, midi_data, note_events = predict(
        str(audio_path),
        ICASSP_2022_MODEL_PATH,
    )
    
    return midi_data

# --- API Endpoints ---

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/upload")
async def process_audio(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    
    # Save Upload
    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        # 1. Separation (Demucs)
        stem_path = run_demucs(file_path)
        
        # 2. Transcription (Basic Pitch)
        raw_midi = convert_audio_to_midi(stem_path)
        
        # 3. Quantization
        clean_midi = quantize_midi(raw_midi)
        
        # 4. Conversion to MusicXML
        # pretty_midi doesn't write musicxml directly, but it writes MIDI.
        # We need a way to pass MusicXML to the frontend.
        # Approach: Write MIDI, then Convert MIDI to MusicXML?
        # Actually, OSMD can render MusicXML. Can it render MIDI? No, mainly MusicXML/MXL.
        # We need a converter. `music21` is perfect for this.
        # Adding `music21` to requirements might be needed, or we send MIDI if OSMD supports it?
        # OSMD does NOT support MIDI. It needs XML.
        # We MUST convert MIDI to XML.
        
        # Save MIDI first
        midi_output_path = OUTPUT_DIR / f"{file_path.stem}.mid"
        clean_midi.write(str(midi_output_path))
        
        # Convert to MusicXML using music21
        import music21
        print("Converting MIDI to MusicXML...")
        m21_stream = music21.converter.parse(str(midi_output_path))
        
        # Export
        xml_output_filename = f"{file_path.stem}.musicxml"
        xml_output_path = OUTPUT_DIR / xml_output_filename
        m21_stream.write('musicxml', fp=str(xml_output_path))
        
        # Read XML content to return
        with open(xml_output_path, "r", encoding='utf-8') as f:
            xml_content = f.read()
            
        return {"filename": xml_output_filename, "musicxml": xml_content}
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
