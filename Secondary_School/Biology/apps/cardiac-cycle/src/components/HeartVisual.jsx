import React, { useEffect, useRef, useState } from 'react';

const HeartVisual = (props) => {
    const canvasRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const heartImageRef = useRef(null);
    
    const { data, isBicuspidOpen, isAorticOpen, soundVisual } = props;
    const isTricuspidOpen = isBicuspidOpen;
    const isPulmonaryOpen = isAorticOpen;

    // Load the heart anatomy image
    useEffect(() => {
        const img = new Image();
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='; // Will be replaced with actual diagram
        img.onload = () => {
            heartImageRef.current = img;
            setImageLoaded(true);
        };
    }, []);

    // Animation loop
    useEffect(() => {
        if (!imageLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        let animationId;
        let bloodParticles = initializeBloodParticles();

        function initializeBloodParticles() {
            const particles = [];
            
            // Oxygenated blood (red) - left side
            for (let i = 0; i < 25; i++) {
                particles.push({
                    x: width * 0.3,
                    y: height * 0.3,
                    phase: Math.random(),
                    color: '#ef4444',
                    side: 'left',
                    speed: 0.8 + Math.random() * 0.4
                });
            }
            
            // Deoxygenated blood (blue) - right side
            for (let i = 0; i < 25; i++) {
                particles.push({
                    x: width * 0.7,
                    y: height * 0.3,
                    phase: Math.random(),
                    color: '#3b82f6',
                    side: 'right',
                    speed: 0.8 + Math.random() * 0.4
                });
            }
            
            return particles;
        }

        function drawBloodFlow() {
            bloodParticles.forEach(particle => {
                if (particle.side === 'left') {
                    // Left heart circulation path
                    const paths = [
                        // Phase 0: Pulmonary vein to left atrium
                        { x: width * 0.2, y: height * 0.25 },
                        // Phase 1: Left atrium
                        { x: width * 0.25, y: height * 0.35 },
                        // Phase 2: Through mitral valve (if open)
                        { x: width * 0.29, y: height * 0.5 },
                        // Phase 3: Left ventricle
                        { x: width * 0.32, y: height * 0.65 },
                        // Phase 4: Through aortic valve (if open)
                        { x: width * 0.35, y: height * 0.4 },
                        // Phase 5: Aorta
                        { x: width * 0.4, y: height * 0.2 }
                    ];
                    
                    updateParticle(particle, paths, isBicuspidOpen, isAorticOpen);
                } else {
                    // Right heart circulation path
                    const paths = [
                        // Phase 0: Vena cava to right atrium
                        { x: width * 0.8, y: height * 0.2 },
                        // Phase 1: Right atrium
                        { x: width * 0.75, y: height * 0.35 },
                        // Phase 2: Through tricuspid valve (if open)
                        { x: width * 0.71, y: height * 0.5 },
                        // Phase 3: Right ventricle
                        { x: width * 0.68, y: height * 0.65 },
                        // Phase 4: Through pulmonary valve (if open)
                        { x: width * 0.65, y: height * 0.4 },
                        // Phase 5: Pulmonary artery
                        { x: width * 0.6, y: height * 0.2 }
                    ];
                    
                    updateParticle(particle, paths, isTricuspidOpen, isPulmonaryOpen);
                }
                
                // Draw particle with glow
                ctx.save();
                ctx.shadowBlur = 15;
                ctx.shadowColor = particle.color;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        function updateParticle(particle, paths, avValveOpen, slValveOpen) {
            particle.phase += particle.speed * 0.01;
            
            if (particle.phase > 6) particle.phase = 0;
            
            const currentIndex = Math.floor(particle.phase);
            const nextIndex = (currentIndex + 1) % paths.length;
            const progress = particle.phase - currentIndex;
            
            // Check valve states
            if (currentIndex === 2 && !avValveOpen) {
                particle.phase = 1.9; // Wait at AV valve
                return;
            }
            if (currentIndex === 4 && !slValveOpen) {
                particle.phase = 3.9; // Wait at semilunar valve
                return;
            }
            
            // Interpolate position
            const current = paths[currentIndex];
            const next = paths[nextIndex];
            particle.x = current.x + (next.x - current.x) * progress;
            particle.y = current.y + (next.y - current.y) * progress;
        }

        function drawValveIndicators() {
            const valves = [
                { name: 'Mitral', x: width * 0.29, y: height * 0.48, isOpen: isBicuspidOpen, side: 'left' },
                { name: 'Aortic', x: width * 0.36, y: height * 0.38, isOpen: isAorticOpen, side: 'left' },
                { name: 'Tricuspid', x: width * 0.71, y: height * 0.48, isOpen: isTricuspidOpen, side: 'right' },
                { name: 'Pulmonary', x: width * 0.64, y: height * 0.38, isOpen: isPulmonaryOpen, side: 'right' }
            ];

            valves.forEach(valve => {
                // Valve indicator
                ctx.save();
                
                // Outer glow
                if (valve.isOpen) {
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#4ade80';
                    ctx.strokeStyle = '#4ade80';
                    ctx.lineWidth = 4;
                } else {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#ef4444';
                    ctx.strokeStyle = '#ef4444';
                    ctx.lineWidth = 3;
                }
                
                // Draw valve ring
                ctx.beginPath();
                ctx.arc(valve.x, valve.y, 18, 0, Math.PI * 2);
                ctx.stroke();
                
                // Draw valve leaflets
                ctx.strokeStyle = valve.isOpen ? '#fbbf24' : '#78350f';
                ctx.lineWidth = 6;
                
                if (valve.isOpen) {
                    // Open valve - leaflets apart
                    ctx.beginPath();
                    ctx.moveTo(valve.x - 12, valve.y - 10);
                    ctx.lineTo(valve.x - 8, valve.y + 10);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.moveTo(valve.x + 12, valve.y - 10);
                    ctx.lineTo(valve.x + 8, valve.y + 10);
                    ctx.stroke();
                } else {
                    // Closed valve - leaflets together
                    ctx.beginPath();
                    ctx.moveTo(valve.x - 2, valve.y - 12);
                    ctx.lineTo(valve.x - 2, valve.y + 12);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.moveTo(valve.x + 2, valve.y - 12);
                    ctx.lineTo(valve.x + 2, valve.y + 12);
                    ctx.stroke();
                }
                
                ctx.restore();

                // Label with background
                ctx.save();
                ctx.font = 'bold 14px Inter, sans-serif';
                ctx.textAlign = valve.side === 'left' ? 'right' : 'left';
                
                const labelX = valve.side === 'left' ? valve.x - 35 : valve.x + 35;
                const labelY = valve.y + 5;
                
                // Background
                ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
                const textWidth = ctx.measureText(valve.name).width;
                const padding = 8;
                const bgX = valve.side === 'left' ? labelX - textWidth - padding : labelX - padding;
                ctx.fillRect(bgX, labelY - 16, textWidth + padding * 2, 26);
                
                // Border
                ctx.strokeStyle = valve.isOpen ? 'rgba(74, 222, 128, 0.5)' : 'rgba(239, 68, 68, 0.5)';
                ctx.lineWidth = 1;
                ctx.strokeRect(bgX, labelY - 16, textWidth + padding * 2, 26);
                
                // Text
                ctx.fillStyle = '#fff';
                ctx.fillText(valve.name, labelX, labelY);
                
                // Status
                ctx.font = 'bold 11px Inter, sans-serif';
                ctx.fillStyle = valve.isOpen ? '#4ade80' : '#ef4444';
                ctx.fillText(valve.isOpen ? '● OPEN' : '● CLOSED', labelX, labelY + 15);
                
                ctx.restore();
            });
        }

        function drawFlowArrows() {
            const arrows = [
                { x: width * 0.18, y: height * 0.25, angle: 0, label: 'From Lungs', color: '#ef4444' },
                { x: width * 0.42, y: height * 0.18, angle: Math.PI / 2, label: 'To Body', color: '#ef4444' },
                { x: width * 0.82, y: height * 0.18, angle: Math.PI, label: 'From Body', color: '#3b82f6' },
                { x: width * 0.58, y: height * 0.18, angle: -Math.PI / 2, label: 'To Lungs', color: '#3b82f6' }
            ];

            arrows.forEach(arrow => {
                ctx.save();
                ctx.translate(arrow.x, arrow.y);
                ctx.rotate(arrow.angle);
                
                // Arrow
                ctx.fillStyle = arrow.color;
                ctx.shadowBlur = 12;
                ctx.shadowColor = arrow.color;
                
                ctx.beginPath();
                ctx.moveTo(0, -8);
                ctx.lineTo(12, 0);
                ctx.lineTo(0, 8);
                ctx.closePath();
                ctx.fill();
                
                ctx.restore();
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#0f172a');
            gradient.addColorStop(1, '#1e293b');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Draw static heart diagram placeholder
            drawHeartDiagram(ctx, width, height);
            
            // Draw animations
            drawFlowArrows();
            drawBloodFlow();
            drawValveIndicators();
            
            // Sound effect indicator
            if (soundVisual) {
                ctx.save();
                ctx.font = 'bold 48px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fbbf24';
                ctx.shadowBlur = 30;
                ctx.shadowColor = '#fbbf24';
                ctx.fillText(soundVisual.split(' ')[0], width / 2, height / 2);
                ctx.restore();
            }
            
            animationId = requestAnimationFrame(animate);
        }

        function drawHeartDiagram(ctx, w, h) {
            // Basic anatomical heart shape (simplified)
            ctx.save();
            
            // Left atrium (red/pink)
            ctx.fillStyle = 'rgba(252, 165, 165, 0.3)';
            ctx.strokeStyle = '#fca5a5';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(w * 0.25, h * 0.35, w * 0.08, h * 0.1, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Right atrium (blue)
            ctx.fillStyle = 'rgba(147, 197, 253, 0.3)';
            ctx.strokeStyle = '#93c5fd';
            ctx.beginPath();
            ctx.ellipse(w * 0.75, h * 0.35, w * 0.08, h * 0.1, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Left ventricle (red)
            ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(w * 0.3, h * 0.6, w * 0.12, h * 0.18, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Right ventricle (blue)
            ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.ellipse(w * 0.7, h * 0.6, w * 0.1, h * 0.15, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Aorta
            ctx.strokeStyle = '#b91c1c';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.arc(w * 0.38, h * 0.25, w * 0.08, Math.PI, Math.PI * 1.5);
            ctx.stroke();
            
            // Pulmonary artery
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 7;
            ctx.beginPath();
            ctx.arc(w * 0.62, h * 0.25, w * 0.08, Math.PI * 1.5, Math.PI * 2);
            ctx.stroke();
            
            // Labels
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.fillStyle = '#fca5a5';
            ctx.textAlign = 'right';
            ctx.fillText('Left Atrium', w * 0.15, h * 0.35);
            
            ctx.fillStyle = '#93c5fd';
            ctx.textAlign = 'left';
            ctx.fillText('Right Atrium', w * 0.85, h * 0.35);
            
            ctx.fillStyle = '#ef4444';
            ctx.textAlign = 'right';
            ctx.fillText('Left Ventricle', w * 0.15, h * 0.65);
            
            ctx.fillStyle = '#60a5fa';
            ctx.textAlign = 'left';
            ctx.fillText('Right Ventricle', w * 0.85, h * 0.65);
            
            ctx.restore();
        }

        animate();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [imageLoaded, data, isBicuspidOpen, isAorticOpen, soundVisual]);

    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            <canvas 
                ref={canvasRef}
                width={1200}
                height={800}
                className="w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
            />

            {/* Phase indicator */}
            <div className="absolute top-6 right-6 pointer-events-none select-none">
                <div className="bg-slate-900/95 backdrop-blur-md px-6 py-3 rounded-xl border border-indigo-500/40 shadow-xl">
                    <div className="text-xs text-slate-400 font-medium mb-1">Cardiac Phase</div>
                    <div className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {data.phase}
                    </div>
                </div>
            </div>

            {/* Circulation pathways */}
            <div className="absolute top-6 left-6 pointer-events-none select-none">
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

            {/* Data display */}
            <div className="absolute bottom-6 right-6 pointer-events-none select-none">
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

            {/* Legend */}
            <div className="absolute bottom-6 left-6 pointer-events-none select-none">
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
