import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Play, Pause, Info, RotateCw } from 'lucide-react';
import { cardiacData } from './utils/cardiacData';
import { useHeartCycle } from './hooks/useHeartCycle';
import HeartVisual from './components/HeartVisual';

function App() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.5); // Multiplier
  const requestRef = useRef();

  const heartState = useHeartCycle(time);
  const [soundVisual, setSoundVisual] = useState(null); // "LUB", "DUP" or null
  const prevValveState = useRef({ bicuspid: true, aortic: false });

  // Animation Loop
  const animate = (timestamp) => {
    if (isPlaying) {
      setTime(prevTime => {
        const newTime = prevTime + 0.005 * playbackSpeed;
        return newTime > 0.8 ? 0 : newTime;
      });
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, playbackSpeed]);

  // Sound Logic (Valve Closures)
  useEffect(() => {
    // LUB: AV Valves Close (Start of Systole) - Approx 0.1s
    if (prevValveState.current.bicuspid && !heartState.isBicuspidOpen) {
      triggerSound("LUB - 1st Heart Sound");
    }
    // DUP: Semilunar Valves Close (End of Systole) - Approx 0.4s
    if (prevValveState.current.aortic && !heartState.isAorticOpen) {
      triggerSound("DUP - 2nd Heart Sound");
    }

    prevValveState.current = {
      bicuspid: heartState.isBicuspidOpen,
      aortic: heartState.isAorticOpen
    };
  }, [heartState.isBicuspidOpen, heartState.isAorticOpen]);

  const triggerSound = (text) => {
    setSoundVisual(text);
    setTimeout(() => setSoundVisual(null), 600);
  };

  const handleGraphHover = (e) => {
    if (e && e.activeLabel) {
      setTime(Number(e.activeLabel));
      setIsPlaying(false); // Pause on manual scrub
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 lg:p-8 flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Cardiac Cycle <span className="text-red-500">Simulator</span>
          </h1>
          <p className="text-slate-400 mt-1">HKDSE Biology: Pressure Changes & Valve Mechanics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : 'Play Cycle'}
          </button>
          <button
            onClick={() => setTime(0)}
            className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 text-slate-300"
            title="Reset"
          >
            <RotateCw size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Visual & Info */}
        <div className="flex flex-col gap-4">

          {/* Heart Container */}
          <div className="relative aspect-[4/5] bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 ring-1 ring-white/10">
            <HeartVisual
              data={heartState}
              isBicuspidOpen={heartState.isBicuspidOpen}
              isAorticOpen={heartState.isAorticOpen}
              soundVisual={soundVisual}
            />

            {/* Phase Indicator Overlay */}
            <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold border border-slate-700 shadow-sm text-blue-200">
              Phase: {heartState.phase}
            </div>
          </div>

          {/* Educational Sidebar / Context */}
          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="text-indigo-400 mt-1 shrink-0" size={20} />
              <div>
                <h3 className="font-bold text-indigo-300 mb-1">Current Mechanics</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {heartState.phase === "Atrial Systole" && "Atria contract, pushing remaining blood into ventricles. Bicuspid valve is open."}
                  {heartState.phase === "Isovolumetric Contraction" && "Ventricles contract. Pressure rises sharply. Valves CLOSED. Volume constant (Iso-volumetric)."}
                  {heartState.phase === "Ventricular Ejection" && "Ventricle P > Aortic P. Semilunar triggers open. Blood ejects rapidly."}
                  {heartState.phase === "Isovolumetric Relaxation" && "Ventricles relax. Pressure drops. Valves CLOSED. Volume constant."}
                  {heartState.phase === "Ventricular Diastole" && "Ventricle P < Atrium P. Mitral Valve opens. Passive filling occurs."}
                </p>
              </div>
            </div>
          </div>

          {/* DSE Specific Note */}
          {(heartState.time > 0.45 || heartState.time < 0.1) && (
            <div className="bg-yellow-950/30 border border-yellow-900/50 p-4 rounded-xl">
              <h4 className="font-bold text-yellow-500 text-sm mb-1">DSE Key Point: Elastic Recoil</h4>
              <p className="text-yellow-200/80 text-sm">
                Validating Aortic Pressure floor: Notice Aortic Pressure holds at ~80 mmHg even during diastole. This is due to the
                <strong className="text-yellow-400"> elastic recoil</strong> of the aortic wall maintaining blood flow.
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Graph */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">Pressure Changes (Left Heart)</h2>
            <p className="text-sm text-slate-400">Hover over the graph to scrub time.</p>
          </div>

          <div className="flex-1 w-full min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cardiacData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                onMouseMove={handleGraphHover}
                onMouseLeave={() => setIsPlaying(true)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={[0, 0.8]}
                  tickCount={9}
                  stroke="#94a3b8"
                  label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -10, fill: '#94a3b8' }}
                />
                <YAxis
                  domain={[0, 140]}
                  stroke="#94a3b8"
                  label={{ value: 'Pressure (mmHg)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <Tooltip
                  trigger="hover"
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: '1px solid #334155', color: 'white' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  labelStyle={{ color: '#94a3b8' }}
                />

                {/* Aorta */}
                <Line
                  type="monotone"
                  dataKey="pressureAorta"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={false}
                  name="Aorta Pressure"
                />

                {/* Ventricle */}
                <Line
                  type="monotone"
                  dataKey="pressureVentricle"
                  stroke="#f59e0b" /* Bright Amber -> Better Contrast on Dark */
                  strokeWidth={2}
                  dot={false}
                  name="Left Ventricle Pressure"
                />

                {/* Atrium */}
                <Line
                  type="monotone"
                  dataKey="pressureAtrium"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Left Atrium Pressure"
                />

                {/* Current Time Indicator */}
                <ReferenceLine x={heartState.time} stroke="#6366f1" strokeDasharray="3 3" />

              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
            <div className="p-3 bg-red-950/30 rounded-lg border border-red-900/50">
              <div className="font-bold text-red-400">Aorta P.</div>
              <div className="text-xl font-mono text-red-200">{Math.round(heartState.pressureAorta)} <span className="text-xs">mmHg</span></div>
            </div>
            <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-900/50">
              <div className="font-bold text-amber-500">Ventricle P.</div>
              <div className="text-xl font-mono text-amber-200">{Math.round(heartState.pressureVentricle)} <span className="text-xs">mmHg</span></div>
            </div>
            <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-900/50">
              <div className="font-bold text-blue-400">Atrium P.</div>
              <div className="text-xl font-mono text-blue-200">{Math.round(heartState.pressureAtrium)} <span className="text-xs">mmHg</span></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
