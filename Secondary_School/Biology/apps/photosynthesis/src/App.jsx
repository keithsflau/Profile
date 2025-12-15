import React, { useState } from 'react';
import { EnergyInventory } from './components/EnergyInventory';
import { ThylakoidView } from './components/ThylakoidView';
import { CalvinCycleView } from './components/CalvinCycleView';
import { Info, Sun, RotateCw } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const [view, setView] = useState('split'); // 'thylakoid', 'calvin', 'split'
  
  // Inventory State
  // Start with 0 charged, 20 empty
  const [atp, setAtp] = useState(0);
  const [adp, setAdp] = useState(20);
  const [nadph, setNadph] = useState(0);
  const [nadp, setNadp] = useState(20);

  const handleSynthesizeATP = () => {
    if (adp > 0) {
      setAtp(p => p + 1);
      setAdp(p => p - 1);
    }
  };

  const handleReduceNADP = () => {
    if (nadp > 0) {
      setNadph(p => p + 1);
      setNadp(p => p - 1);
    }
  };

  const handleConsume = (atpCost, nadphCost) => {
    if (atp >= atpCost && nadph >= nadphCost) {
      setAtp(p => p - atpCost);
      setAdp(p => p + atpCost);
      setNadph(p => p - nadphCost);
      setNadp(p => p + nadphCost);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Top Bar: Energy Inventory */}
      <EnergyInventory atp={atp} adp={adp} nadph={nadph} nadp={nadp} />

      {/* Main Controls & Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 flex flex-col gap-6">
        
        {/* View Toggle */}
        <div className="flex justify-center mb-0">
           <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex gap-1">
              <button 
                onClick={() => setView('thylakoid')}
                className={clsx("px-4 py-2 rounded-md flex items-center gap-2 font-bold transition-all", view === 'thylakoid' ? "bg-teal-600 text-white shadow" : "hover:bg-slate-100 text-slate-500")}
              >
                <Sun className="w-4 h-4" /> Light Reaction
              </button>
              <button 
                onClick={() => setView('calvin')}
                className={clsx("px-4 py-2 rounded-md flex items-center gap-2 font-bold transition-all", view === 'calvin' ? "bg-amber-600 text-white shadow" : "hover:bg-slate-100 text-slate-500")}
              >
                <RotateCw className="w-4 h-4" /> Calvin Cycle
              </button>
              <button 
                onClick={() => setView('split')}
                className={clsx("px-4 py-2 rounded-md font-bold transition-all hidden md:block", view === 'split' ? "bg-indigo-600 text-white shadow" : "hover:bg-slate-100 text-slate-500")}
              >
                Split View
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className={clsx("grid gap-6", view === 'split' ? "lg:grid-cols-2" : "grid-cols-1")}>
            
            {/* View A: Thylakoid */}
            {(view === 'thylakoid' || view === 'split') && (
               <div className="flex flex-col gap-2">
                 <div className="bg-white p-3 rounded-t-xl border-b-2 border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-teal-800">Light-Dependent Reaction</h2>
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Thylakoid Membrane</span>
                 </div>
                 <ThylakoidView 
                    onSynthesizeATP={handleSynthesizeATP}
                    onReduceNADP={handleReduceNADP}
                    canSynthesizeATP={adp > 0}
                    canReduceNADP={nadp > 0}
                    adpCount={adp}
                    nadpCount={nadp}
                 />
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-sm text-slate-600">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4 text-teal-600" />
                        Key Concepts
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong className="text-teal-700">Photolysis of Water:</strong> Light splits water, releasing electrons (e-) and Protons (H+).</li>
                        <li><strong className="text-teal-700">Chemiosmosis:</strong> H+ accumulation drives ATP Synthase to phosphorylate ADP to ATP.</li>
                        <li><strong className="text-teal-700">Photoactivation:</strong> Light excites electrons to higher energy levels.</li>
                    </ul>
                 </div>
               </div>
            )}

            {/* View B: Calvin Cycle */}
            {(view === 'calvin' || view === 'split') && (
               <div className="flex flex-col gap-2">
                 <div className="bg-white p-3 rounded-t-xl border-b-2 border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-amber-800">Light-Independent Reaction</h2>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Stroma</span>
                 </div>
                 <CalvinCycleView 
                    atp={atp}
                    nadph={nadph}
                    onConsume={handleConsume}
                 />
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-sm text-slate-600">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-600" />
                        Key Concepts
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong className="text-amber-700">Carbon Fixation:</strong> Catalyst Rubisco fixes CO2 to RuBP.</li>
                        <li><strong className="text-amber-700">Reduction:</strong> ATP and NADPH from Light Reaction reduce GP to TP.</li>
                        <li><strong className="text-amber-700">Regeneration:</strong> RuBP must be regenerated for the cycle to continue.</li>
                    </ul>
                    <div className="mt-3 bg-red-50 p-2 rounded text-xs text-red-800 border border-red-100">
                        <strong>Why it stops in the dark:</strong> Although it doesn't need light directly, it rapidly consumes ATP and NADPH. Without the Light Reaction refilling them, the Calvin Cycle halts immediately.
                    </div>
                 </div>
               </div>
            )}

        </div>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
         <p>HKDSE Biology Simulation - Photosynthesis</p>
         <p className="text-xs mt-1 opacity-50">Designed for educational purposes.</p>
      </footer></div></div>
  );
}



export default App;

const Footer = () => (
  <footer className="mt-12 text-center text-white/40 text-sm z-10 p-4">
      <p className="italic mb-1">But God made the earth by his power; he founded the world by his wisdom and stretched out the heavens by his understanding. Jeremiah 10:12</p>
      <p className="text-xs mb-1 mt-2">「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」 耶利米書 10:12</p>
      <p className="text-xs mt-2 pt-2 border-t border-white/10">@ 2025 Generated by Gemini 3.0 Prepared by SF Lau</p>
  </footer>
);

const VisitCounter = () => {
  const [visits, setVisits] = React.useState(0);
  React.useEffect(() => {
    const key = window.location.pathname.replace(/\//g, '_') || 'home';
    fetch(`https://api.countapi.xyz/hit/keithsflau-profile/${key}`)
      .then(res => res.json())
      .then(data => setVisits(data.value))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="fixed bottom-2 right-2 text-[10px] text-white/20 pointer-events-none z-50">
      Visits: {visits}
    
      <Footer />
      <VisitCounter />
    </div>
  );
};

export default App;
