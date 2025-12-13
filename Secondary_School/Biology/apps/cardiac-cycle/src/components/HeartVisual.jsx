import React, { useEffect, useState } from 'react';

const HeartVisual = (props) => {
    const { data, isBicuspidOpen, isAorticOpen, soundVisual } = props;
    const isTricuspidOpen = isBicuspidOpen;
    const isPulmonaryOpen = isAorticOpen;
    
    const [bloodParticles, setBloodParticles] = useState([]);

    // Initialize blood particles
    useEffect(() => {
        const particles = [];
        
        // Oxygenated blood (left side - red)
        for (let i = 0; i < 20; i++) {
            particles.push({
                id: `oxy-${i}`,
                phase: Math.random() * 4,
                speed: 0.01 + Math.random() * 0.005,
                color: '#ef4444',
                side: 'left'
            });
        }
        
        // Deoxygenated blood (right side - blue)
        for (let i = 0; i < 20; i++) {
            particles.push({
                id: `deoxy-${i}`,
                phase: Math.random() * 4,
                speed: 0.01 + Math.random() * 0.005,
                color: '#3b82f6',
                side: 'right'
            });
        }
        
        setBloodParticles(particles);
    }, []);

    // Update particle positions
    useEffect(() => {
        const interval = setInterval(() => {
            setBloodParticles(prev => prev.map(particle => {
                let newPhase = particle.phase + particle.speed;
                
                if (particle.side === 'left') {
                    // Check mitral valve
                    if (newPhase > 1 && newPhase < 2 && !isBicuspidOpen) {
                        newPhase = 1.95;
                    }
                    // Check aortic valve
                    if (newPhase > 3 && newPhase < 4 && !isAorticOpen) {
                        newPhase = 3.95;
                    }
                } else {
                    // Check tricuspid valve
                    if (newPhase > 1 && newPhase < 2 && !isTricuspidOpen) {
                        newPhase = 1.95;
                    }
                    // Check pulmonary valve
                    if (newPhase > 3 && newPhase < 4 && !isPulmonaryOpen) {
                        newPhase = 3.95;
                    }
                }
                
                if (newPhase >= 4) newPhase = 0;
                
                return { ...particle, phase: newPhase };
            }));
        }, 50);
        
        return () => clearInterval(interval);
    }, [isBicuspidOpen, isAorticOpen, isTricuspidOpen, isPulmonaryOpen]);

    // Calculate particle position based on phase
    const getParticlePosition = (particle) => {
        const phase = particle.phase;
        
        if (particle.side === 'left') {
            // Left heart circulation path (percentages of container)
            if (phase < 1) {
                // Pulmonary vein to left atrium
                return { left: `${15 + phase * 5}%`, top: `${25 - phase * 5}%` };
            } else if (phase < 2) {
                // Left atrium to left ventricle (through mitral)
                const p = phase - 1;
                return { left: `${20 + p * 5}%`, top: `${20 + p * 30}%` };
            } else if (phase < 3) {
                // Left ventricle
                const p = phase - 2;
                return { left: `${25 + p * 5}%`, top: `${50 + p * 10}%` };
            } else {
                // Left ventricle to aorta (through aortic valve)
                const p = phase - 3;
                return { left: `${30 + p * 5}%`, top: `${60 - p * 40}%` };
            }
        } else {
            // Right heart circulation path
            if (phase < 1) {
                // Vena cava to right atrium
                return { left: `${80 - phase * 5}%`, top: `${15 + phase * 5}%` };
            } else if (phase < 2) {
                // Right atrium to right ventricle (through tricuspid)
                const p = phase - 1;
                return { left: `${75 - p * 5}%`, top: `${20 + p * 30}%` };
            } else if (phase < 3) {
                // Right ventricle
                const p = phase - 2;
                return { left: `${70 - p * 5}%`, top: `${50 + p * 10}%` };
            } else {
                // Right ventricle to pulmonary artery (through pulmonary valve)
                const p = phase - 3;
                return { left: `${65 - p * 5}%`, top: `${60 - p * 40}%` };
            }
        }
    };

    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            {/* Heart anatomy background image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img 
                    src="/heart_anatomy.png"
                    alt="Heart Anatomy" 
                    className="w-full h-full object-contain opacity-90"
                    onError={(e) => {
                        console.error('Heart image failed to load');
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            {/* Blood flow particles */}
            <div className="absolute inset-0">
                {bloodParticles.map(particle => {
                    const pos = getParticlePosition(particle);
                    return (
                        <div
                            key={particle.id}
                            className="absolute w-3 h-3 rounded-full transition-all duration-100 ease-linear"
                            style={{
                                left: pos.left,
                                top: pos.top,
                                backgroundColor: particle.color,
                                boxShadow: `0 0 15px ${particle.color}, 0 0 25px ${particle.color}`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    );
                })}
            </div>

            {/* Valve indicators */}
            <div className="absolute inset-0">
                {/* Mitral Valve */}
                <div className="absolute" style={{ left: '25%', top: '45%', transform: 'translate(-50%, -50%)' }}>
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isBicuspidOpen 
                            ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]' 
                            : 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    }`}>
                        <svg width="40" height="40" viewBox="0 0 40 40" className="transition-transform duration-300">
                            <line 
                                x1={isBicuspidOpen ? "10" : "19"} 
                                y1="10" 
                                x2={isBicuspidOpen ? "15" : "19"} 
                                y2="30" 
                                stroke="#fbbf24" 
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <line 
                                x1={isBicuspidOpen ? "30" : "21"} 
                                y1="10" 
                                x2={isBicuspidOpen ? "25" : "21"} 
                                y2="30" 
                                stroke="#fbbf24" 
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className="absolute -left-28 top-1/2 -translate-y-1/2 bg-slate-900/95 px-3 py-2 rounded-lg border border-slate-700 backdrop-blur">
                        <div className="text-sm font-semibold text-white mb-1">Mitral</div>
                        <div className={`text-xs font-bold ${isBicuspidOpen ? 'text-green-400' : 'text-red-400'}`}>
                            {isBicuspidOpen ? '● OPEN' : '● CLOSED'}
                        </div>
                    </div>
                </div>

                {/* Aortic Valve */}
                <div className="absolute" style={{ left: '35%', top: '25%', transform: 'translate(-50%, -50%)' }}>
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isAorticOpen 
                            ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]' 
                            : 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    }`}>
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            {[0, 120, 240].map((angle, i) => (
                                <path
                                    key={i}
                                    d={isAorticOpen ? "M20,20 L30,10 L35,20 Z" : "M20,20 L20,10 L22,20 Z"}
                                    fill="#fbbf24"
                                    opacity="0.9"
                                    transform={`rotate(${angle} 20 20)`}
                                />
                            ))}
                        </svg>
                    </div>
                    <div className="absolute -left-28 top-1/2 -translate-y-1/2 bg-slate-900/95 px-3 py-2 rounded-lg border border-slate-700 backdrop-blur">
                        <div className="text-sm font-semibold text-white mb-1">Aortic</div>
                        <div className={`text-xs font-bold ${isAorticOpen ? 'text-green-400' : 'text-red-400'}`}>
                            {isAorticOpen ? '● OPEN' : '● CLOSED'}
                        </div>
                    </div>
                </div>

                {/* Tricuspid Valve */}
                <div className="absolute" style={{ left: '75%', top: '45%', transform: 'translate(-50%, -50%)' }}>
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isTricuspidOpen 
                            ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]' 
                            : 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    }`}>
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            <line 
                                x1={isTricuspidOpen ? "10" : "19"} 
                                y1="10" 
                                x2={isTricuspidOpen ? "15" : "19"} 
                                y2="30" 
                                stroke="#fbbf24" 
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <line 
                                x1={isTricuspidOpen ? "30" : "21"} 
                                y1="10" 
                                x2={isTricuspidOpen ? "25" : "21"} 
                                y2="30" 
                                stroke="#fbbf24" 
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className="absolute -right-28 top-1/2 -translate-y-1/2 bg-slate-900/95 px-3 py-2 rounded-lg border border-slate-700 backdrop-blur">
                        <div className="text-sm font-semibold text-white mb-1">Tricuspid</div>
                        <div className={`text-xs font-bold ${isTricuspidOpen ? 'text-green-400' : 'text-red-400'}`}>
                            {isTricuspidOpen ? '● OPEN' : '● CLOSED'}
                        </div>
                    </div>
                </div>

                {/* Pulmonary Valve */}
                <div className="absolute" style={{ left: '65%', top: '25%', transform: 'translate(-50%, -50%)' }}>
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isPulmonaryOpen 
                            ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]' 
                            : 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    }`}>
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            {[0, 120, 240].map((angle, i) => (
                                <path
                                    key={i}
                                    d={isPulmonaryOpen ? "M20,20 L30,10 L35,20 Z" : "M20,20 L20,10 L22,20 Z"}
                                    fill="#fbbf24"
                                    opacity="0.9"
                                    transform={`rotate(${angle} 20 20)`}
                                />
                            ))}
                        </svg>
                    </div>
                    <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-slate-900/95 px-3 py-2 rounded-lg border border-slate-700 backdrop-blur">
                        <div className="text-sm font-semibold text-white mb-1">Pulmonary</div>
                        <div className={`text-xs font-bold ${isPulmonaryOpen ? 'text-green-400' : 'text-red-400'}`}>
                            {isPulmonaryOpen ? '● OPEN' : '● CLOSED'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Flow direction arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* From Lungs */}
                <defs>
                    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                    </marker>
                </defs>
                
                {/* Red arrows (oxygenated) */}
                <line x1="10" y1="15" x2="15" y2="20" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrowRed)" />
                <line x1="40" y1="15" x2="45" y2="10" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrowRed)" />
                
                {/* Blue arrows (deoxygenated) */}
                <line x1="85" y1="10" x2="80" y2="15" stroke="#3b82f6" strokeWidth="0.5" markerEnd="url(#arrowBlue)" />
                <line x1="60" y1="15" x2="55" y2="10" stroke="#3b82f6" strokeWidth="0.5" markerEnd="url(#arrowBlue)" />
            </svg>

            {/* Sound effect */}
            {soundVisual && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-6xl font-black text-yellow-400 animate-pulse" style={{
                        textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4)'
                    }}>
                        {soundVisual.split(' ')[0]}
                    </div>
                </div>
            )}

            {/* Phase indicator - top right */}
            <div className="absolute top-6 right-6 pointer-events-none select-none z-10">
                <div className="bg-slate-900/95 backdrop-blur-md px-6 py-3 rounded-xl border border-indigo-500/40 shadow-xl">
                    <div className="text-xs text-slate-400 font-medium mb-1">Cardiac Phase</div>
                    <div className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {data.phase}
                    </div>
                </div>
            </div>

            {/* Circulation pathways - top left */}
            <div className="absolute top-6 left-6 pointer-events-none select-none z-10">
                <div className="bg-slate-900/95 backdrop-blur-md px-5 py-4 rounded-xl border border-slate-700 shadow-xl space-y-3 max-w-sm">
                    <div className="text-sm font-bold text-red-400 border-b border-red-900/30 pb-2">
                        🔴 Systemic Circulation
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                        Lungs → Pulm. Veins → LA → Mitral → LV → Aortic → Aorta → Body
                    </div>
                    
                    <div className="text-sm font-bold text-blue-400 border-b border-blue-900/30 pb-2 pt-2">
                        🔵 Pulmonary Circulation
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                        Body → Vena Cava → RA → Tricuspid → RV → Pulm. → Pulm. A. → Lungs
                    </div>
                </div>
            </div>

            {/* Hemodynamics - bottom right */}
            <div className="absolute bottom-6 right-6 pointer-events-none select-none z-10">
                <div className="bg-slate-900/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700 shadow-xl space-y-2 text-xs">
                    <div className="font-bold text-slate-300 mb-2">Hemodynamics</div>
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Aorta</span>
                        <span className="font-mono font-bold text-red-400">{Math.round(data.pressureAorta)} mmHg</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400">LV</span>
                        <span className="font-mono font-bold text-orange-400">{Math.round(data.pressureVentricle)} mmHg</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Volume</span>
                        <span className="font-mono font-bold text-emerald-400">{Math.round(data.volume)} mL</span>
                    </div>
                </div>
            </div>

            {/* Legend - bottom left */}
            <div className="absolute bottom-6 left-6 pointer-events-none select-none z-10">
                <div className="bg-slate-900/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700 shadow-xl space-y-2.5">
                    <div className="text-xs font-bold text-slate-300 mb-2">Blood Flow</div>
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"></span>
                        <span className="text-xs text-slate-300 font-medium">Oxygenated</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
                        <span className="text-xs text-slate-300 font-medium">Deoxygenated</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
