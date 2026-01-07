import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Play, Pause, RefreshCw, Info, Activity } from 'lucide-react';

const GasExchangeSimulator = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [breathingRate, setBreathingRate] = useState(50); // 0-100 placeholder
  const [diffusionRate, setDiffusionRate] = useState(50);
  const [showLabels, setShowLabels] = useState(true);

  // Animation states
  const [rbcs, setRbcs] = useState([]);
  const canvasRef = useRef(null);
  
  // Constants
  const RBC_SPAWN_RATE = 2000; // ms
  const MAX_RBCS = 8;
  
  // Generate particles (mock data for visualization)
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    type: i % 2 === 0 ? 'O2' : 'CO2',
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wind className="w-8 h-8 text-blue-600" />
              </div>
              Alveolar Gas Exchange
            </h1>
            <p className="mt-2 text-slate-600 font-medium">Interactive simulation of diffusion across the respiratory membrane</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Activity className="w-4 h-4 text-green-500" />
              Junior Science Series
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Simulation Panel */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative" style={{ height: '600px' }}>
              <SimulationCanvas 
                isPlaying={isPlaying}
                breathingRate={breathingRate} 
                diffusionRate={diffusionRate}
                showLabels={showLabels}
              />
            </div>
          </div>

          {/* Controls & Education Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Controls Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-500" />
                Simulation Controls
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Play / Pause</label>
                  </div>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
                  >
                    {isPlaying ? <><Pause className="w-5 h-5" /> Pause Simulation</> : <><Play className="w-5 h-5" /> Resume Simulation</>}
                  </button>
                </div>

                <div>
                   <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Breathing Rate</label>
                    <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-500">Normal</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="90" 
                    value={breathingRate} 
                    onChange={(e) => setBreathingRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                 <div className="flex items-center gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="labels"
                      checked={showLabels}
                      onChange={(e) => setShowLabels(e.target.checked)}
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="labels" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">Show Labels & Guides</label>
                 </div>
              </div>
            </div>

            {/* Educational Legend */}
            <div className="bg-slate-900 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Key Concepts
              </h2>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1 shrink-0 animate-pulse"></div>
                  <div>
                    <strong className="text-white block">Oxygen (O₂)</strong>
                    Diffuses from the alveolus (high conc.) into the blood (low conc.).
                  </div>
                </li>
                 <li className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mt-1 shrink-0"></div>
                  <div>
                    <strong className="text-white block">Carbon Dioxide (CO₂)</strong>
                    Diffuses from the blood (high conc.) into the alveolus (low conc.).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-3 rounded-full bg-gradient-to-r from-blue-700 to-red-600 mt-1 shrink-0"></div>
                  <div>
                    <strong className="text-white block">Gas Exchange</strong>
                    Blood changes from deoxygenated (blue) to oxygenated (red) as it passes the alveolus.
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


// The core visualization component
const SimulationCanvas = ({ isPlaying, breathingRate, diffusionRate, showLabels }) => {
  // We use Framer Motion for the layout and simple animations
  // We need an "Alveolus" container and a "Capillary" path.
  
  return (
    <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. Alveolus (The Air Sac) */}
      {/* Animate expansion/contraction based on breathingRate */}
      <motion.div 
        animate={{ 
          scale: isPlaying ? [1, 1.05, 1] : 1,
        }}
        transition={{ 
          duration: (100 - breathingRate) / 10, // heuristic for speed
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-[300px] h-[300px] bg-pink-100 rounded-full border-4 border-pink-300 shadow-inner flex items-center justify-center relative z-10"
      >
        <span className="text-pink-300/20 text-6xl font-black select-none pointer-events-none">AIR</span>
        
        {/* Floating O2 Molecules inside Alveolus */}
        <Particles type="O2" count={12} containerSize={280} isPlaying={isPlaying} />
        
        {showLabels && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full border border-pink-200 shadow-sm">
             <span className="text-pink-700 text-xs font-bold uppercase tracking-wider">Alveolus</span>
          </div>
        )}
      </motion.div>


      {/* 2. Capillary (Blood Vessel) */}
      {/* A visual track running below the alveolus */}
      <div className="absolute top-[60%] w-full h-32 bg-transparent z-20">
         {/* Capillary Walls */}
         <div className="absolute top-0 left-0 right-0 h-24 bg-red-50/30 border-y-2 border-red-200 overflow-hidden flex items-center">
            
            {showLabels && (
              <div className="absolute bottom-2 left-4 bg-white/80 px-3 py-1 rounded-full border border-red-200 shadow-sm z-30">
                <span className="text-red-700 text-xs font-bold uppercase tracking-wider">Capillary</span>
              </div>
            )}

            {/* Red Blood Cells Stream */}
            <RBCStream isPlaying={isPlaying} />
            
            {/* Floating CO2 Molecules in Blood */}
            <BloodParticles isPlaying={isPlaying} />
         </div>
      </div>
      
      {/* 3. Diffusion Animation Layer (The Magic) */}
      {/* Visible particles crossing the barrier */}
      <DiffusionEffect isPlaying={isPlaying} />

    </div>
  );
};


const Particles = ({ type, count, containerSize, isPlaying }) => {
  // Random wandering particles inside the container
  const particles = React.useMemo(() => Array.from({ length: count }), [count]);
  
  return (
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full ${type === 'O2' ? 'bg-red-500 shadow-sm' : 'bg-blue-400'}`}
          initial={{ 
            x: Math.random() * containerSize, 
            y: Math.random() * containerSize 
          }}
          animate={isPlaying ? {
            x: [null, Math.random() * containerSize],
            y: [null, Math.random() * containerSize],
          } : {}}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

const RBCStream = ({ isPlaying }) => {
  // Stream of RBCs moving from Left (Deoxygenated) to Right (Oxygenated)
  // We need to continuously spawn them.
  // Or just have a set of them looping.
  
  return (
    <div className="w-full h-full relative">
       {/* We create a set of RBCs spaced out */}
       {Array.from({ length: 6 }).map((_, i) => (
          <RBC key={i} delay={i * 1.5} isPlaying={isPlaying} />
       ))}
    </div>
  );
};

const RBC = ({ delay, isPlaying }) => {
  return (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-16 h-12 rounded-[50%] flex items-center justify-center shadow-md border border-black/10"
          initial={{ left: '-10%', backgroundColor: '#60A5FA' }} // Blue-400
          animate={ isPlaying ? {
            left: '110%',
            backgroundColor: ['#60A5FA', '#60A5FA', '#EF4444', '#EF4444'] // Blue -> Red transition
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: delay,
            ease: "linear",
            times: [0, 0.4, 0.6, 1] // Change color in the middle
          }}
        >
          {/* Indent shape for RBC */}
          <div className="w-10 h-8 bg-black/5 rounded-[50%]"></div>
        </motion.div>
  );
}

const BloodParticles = ({ isPlaying }) => {
   // CO2 in plasma, moving into alveolus?
   // Visual hack: just random particles in the background of the capillary
   return (
      <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300/60 rounded-full"
              initial={{ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' }}
              animate={isPlaying ? { x: Math.random() * 50 } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
      </div>
   )
}

const DiffusionEffect = ({ isPlaying }) => {
  // The most important educational part: Showing direction of flow
  // O2: Alveolus (Center) -> Capillary (Bottom)
  // CO2: Capillary (Bottom) -> Alveolus (Center)
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
       {/* O2 Diffusion Stream */}
       {Array.from({ length: 8 }).map((_, i) => (
         <motion.div
            key={`o2-diff-${i}`}
            className="absolute w-2 h-2 bg-red-500 rounded-full shadow-lg"
            initial={{ top: '40%', left: '45%', opacity: 0 }}
            animate={isPlaying ? {
              top: ['40%', '65%'],
              left: ['45%', 40 + Math.random() * 10 + '%'], // Slight spread
              opacity: [0, 1, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
         />
       ))}

       {/* CO2 Diffusion Stream */}
       {Array.from({ length: 8 }).map((_, i) => (
         <motion.div
            key={`co2-diff-${i}`}
            className="absolute w-2 h-2 bg-blue-500 rounded-full shadow-lg"
            initial={{ top: '65%', left: '55%', opacity: 0 }}
            animate={isPlaying ? {
              top: ['65%', '40%'],
              left: ['55%', 50 + Math.random() * 10 + '%'],
              opacity: [0, 1, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
         />
       ))}
    </div>
  )
}

export default GasExchangeSimulator;
