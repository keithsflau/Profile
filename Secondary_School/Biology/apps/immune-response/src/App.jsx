import React from 'react';
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Battlefield from './components/Battlefield'
import AntibodyChart from './components/AntibodyChart'
import ControlPanel from './components/ControlPanel'
import EducationalOverlay from './components/EducationalOverlay'
import { Shield, Brain, Zap } from 'lucide-react'

// Simulation states
const STATES = {
  IDLE: 'idle',
  PRIMARY_INFECTION: 'primary_infection',
  PRIMARY_RESPONSE: 'primary_response',
  PRIMARY_CLEAR: 'primary_clear',
  SECONDARY_IDLE: 'secondary_idle',
  SECONDARY_INFECTION: 'secondary_infection',
  SECONDARY_RESPONSE: 'secondary_response',
  SECONDARY_CLEAR: 'secondary_clear',
  COMPLETE: 'complete'
}

function App() {
  const [currentState, setCurrentState] = useState(STATES.IDLE)
  const [antibodyData, setAntibodyData] = useState([{ day: 0, level: 0 }])
  const [currentDay, setCurrentDay] = useState(0)
  const [selectedAntigen, setSelectedAntigen] = useState('triangle') // The pathogen's antigen
  const [activeBCellType, setActiveBCellType] = useState(null)
  const [hasMemoryCells, setHasMemoryCells] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState(null)

  // State machine logic
  const handleInfect = () => {
    if (currentState === STATES.IDLE) {
      setCurrentState(STATES.PRIMARY_INFECTION)
      setTooltipMessage("🦠 Primary Infection Initiated: Pathogens entering the body...")
      
      setTimeout(() => {
        setCurrentState(STATES.PRIMARY_RESPONSE)
        setActiveBCellType(selectedAntigen)
        setTooltipMessage("🔬 Clonal Selection: The B-cell with matching receptor is activated!")
      }, 3000)
      
      setTimeout(() => {
        simulatePrimaryResponse()
      }, 5000)
    }
  }

  const handleReinfect = () => {
    if (currentState === STATES.SECONDARY_IDLE && hasMemoryCells) {
      setCurrentState(STATES.SECONDARY_INFECTION)
      setTooltipMessage("🦠 Secondary Infection: Same pathogen detected!")
      
      setTimeout(() => {
        setCurrentState(STATES.SECONDARY_RESPONSE)
        setTooltipMessage("⚡ Memory Response: Memory cells rapidly activate!")
        simulateSecondaryResponse()
      }, 1500) // Much faster recognition
    }
  }

  const handleReset = () => {
    setCurrentState(STATES.IDLE)
    setAntibodyData([{ day: 0, level: 0 }])
    setCurrentDay(0)
    setActiveBCellType(null)
    setHasMemoryCells(false)
    setTooltipMessage(null)
  }

  // Simulate primary immune response (slow)
  const simulatePrimaryResponse = () => {
    let day = currentDay
    const interval = setInterval(() => {
      day += 1
      setCurrentDay(day)
      
      // Slow rise in antibody levels
      const level = Math.min(50, Math.max(0, -5 + day * 8 - day * day * 0.3))
      
      setAntibodyData(prev => [...prev, { day, level: Math.round(level) }])
      
      if (day >= 14) {
        clearInterval(interval)
        setCurrentState(STATES.PRIMARY_CLEAR)
        setHasMemoryCells(true)
        setTooltipMessage("✅ Primary Infection Cleared: Memory cells formed!")
        
        setTimeout(() => {
          setCurrentState(STATES.SECONDARY_IDLE)
          setTooltipMessage("💡 Memory cells are dormant, ready for re-exposure...")
        }, 2000)
      }
    }, 400) // Slower animation
  }

  // Simulate secondary immune response (fast and strong)
  const simulateSecondaryResponse = () => {
    let day = currentDay
    const interval = setInterval(() => {
      day += 1
      setCurrentDay(day)
      
      // Rapid, high spike in antibody levels
      const level = Math.min(100, Math.max(0, (day - 14) * 25 - (day - 14) * (day - 14) * 1.5))
      
      setAntibodyData(prev => [...prev, { day, level: Math.round(level) }])
      
      if (day >= 21) {
        clearInterval(interval)
        setCurrentState(STATES.COMPLETE)
        setTooltipMessage("✅ Secondary Response Complete: Faster and stronger immunity!")
      }
    }, 200) // Much faster animation
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Immune Response Simulator
            </h1>
            <Brain className="w-12 h-12 text-cyan-400" />
          </div>
          <p className="text-blue-200 text-lg">
            HKDSE Biology: Specific Immune Response & Vaccination Principles
          </p>
        </motion.div>

        {/* Educational Info Bar */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-300 mb-1">Key Concept: Specificity</h3>
              <p className="text-sm text-blue-100">
                Only B-cells with receptors matching the pathogen's antigen will be activated (Lock and Key model). 
                Memory cells enable faster, stronger secondary responses - the principle behind vaccination.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Battlefield */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm medical-blue-glow">
            <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              The Battlefield
            </h2>
            <Battlefield 
              currentState={currentState}
              selectedAntigen={selectedAntigen}
              activeBCellType={activeBCellType}
              hasMemoryCells={hasMemoryCells}
              setTooltipMessage={setTooltipMessage}
            />
          </div>

          {/* Antibody Chart */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm medical-blue-glow">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Antibody Concentration</h2>
            <AntibodyChart data={antibodyData} currentDay={currentDay} />
          </div>
        </div>

        {/* Control Panel */}
        <ControlPanel 
          currentState={currentState}
          onInfect={handleInfect}
          onReinfect={handleReinfect}
          onReset={handleReset}
          hasMemoryCells={hasMemoryCells}
        />

        {/* Tooltip Overlay */}
        <AnimatePresence>
          {tooltipMessage && (
            <EducationalOverlay 
              message={tooltipMessage}
              onClose={() => setTooltipMessage(null)}
            />
          )}
        </AnimatePresence>
      </div></div></div>
  )
}



export default App

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

export default App
