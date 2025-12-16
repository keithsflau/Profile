# Implementation Plan: MP3 to Sheet Music Converter (CUDA Optimized)

## Project Overview

A high-performance local web application that converts MP3 audio files into sheet music (MusicXML/MXL) using AI models accelerated by an NVIDIA RTX 4090.

## Target Directory

`c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Music\MP3_to_Sheet`

## File Structure

```
MP3_to_Sheet/
├── app.py                  # Main FastAPI backend handling the pipeline
├── requirements.txt        # Python dependencies with CUDA 12.1 support
├── templates/
│   └── index.html          # Frontend UI with OSMD renderer
├── uploads/                # Temporary storage for uploaded MP3s
└── outputs/                # generated MusicXML files
```

## Core Components

1.  **Backend (FastAPI)**:

    - Endpoint `/upload`: Accepts MP3.
    - **Pipeline**:
      1.  **Separation**: `demucs` (htdemucs) separates vocals/other from the specific instrument (user might want main melody or full mix, but demucs separates into drums, bass, other, vocals. "htdemucs" is the model). We will default to extracting the 'other' or 'vocals' or mix down relevant stems for transcription. _Self-correction_: Basic Pitch works best on polyphonic audio. We might run it on the original or specific stems. The user mentioned "separating vocals/instruments", presumably to transcribe a specific part or remove noise. I will implement logic to run transcription on the separated 'vocals' or 'other' (melody) stems, or offer a choice. For simplicity in V1, we'll transcribe the separating 'vocals' stem and 'other' stem separately or combine them. Let's assume the user wants the "instrumental" part mostly, but I will provide options or just transcribe the "other" (often melody instruments) and "vocals".
      2.  **Transcription**: `basic_pitch` converts audio to MIDI.
      3.  **Quantization**: `pretty_midi` processes the MIDI to snap note onsets/offsets to a 1/16th grid.
      4.  **Conversion**: Convert MIDI to MusicXML.

2.  **Frontend (HTML/JS)**:
    - File upload zone.
    - Progress bar (via WebSocket or polling - simple polling/response wait for V1).
    - `opensheetmusicdisplay` (OSMD) to render the resulting MusicXML XML.

## Technology Stack & Constraints

- **Hardware**: Force `device='cuda'`.
- **Models**: `htdemucs`, `basic_pitch`.
- **Rhythm Repair**: Custom `quantize_midi` function.
