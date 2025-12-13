import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create realistic heart chamber shapes
const createHeartShape = () => {
    // Using combined spheres and custom geometry for organic heart shape
    const shape = new THREE.Shape();
    
    // Create a heart-like curve (simplified anatomical shape)
    const heartCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(0.8, 1.2, 0),
        new THREE.Vector3(1.2, 0.5, 0),
        new THREE.Vector3(1.0, -0.5, 0),
        new THREE.Vector3(0.5, -1.5, 0),
        new THREE.Vector3(0, -2.2, 0),
        new THREE.Vector3(-0.5, -1.5, 0),
        new THREE.Vector3(-1.0, -0.5, 0),
        new THREE.Vector3(-1.2, 0.5, 0),
        new THREE.Vector3(-0.8, 1.2, 0),
        new THREE.Vector3(0, 1.5, 0),
    ]);
    
    return heartCurve;
};

const CompleteHeart = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const atriumRef = useRef();
    const ventricleRef = useRef();
    const particlesRef = useRef();
    const aortaRef = useRef();
    
    // Blood particles
    const particleCount = 100;
    const particleData = useMemo(() => {
        return new Array(particleCount).fill(0).map((_, i) => ({
            phase: i % 3, // 0: pulmonary vein->atrium, 1: atrium->ventricle, 2: ventricle->aorta
            progress: Math.random(),
            speed: 0.008 + Math.random() * 0.012,
            offset: new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3
            ),
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 0.8,
        }));
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Atrium contraction (subtle)
        if (atriumRef.current) {
            const atrialContraction = data.phase === "Atrial Systole" ? 0.9 : 1.0;
            atriumRef.current.scale.lerp(
                new THREE.Vector3(atrialContraction, atrialContraction, atrialContraction),
                delta * 5
            );
        }
        
        // Ventricle contraction (dramatic)
        if (ventricleRef.current) {
            // Map volume 50-120 to scale
            const volumeNorm = (data.volume - 50) / 70; // 0 to 1
            const baseScale = 0.85 + volumeNorm * 0.25; // 0.85 to 1.1
            
            // Add heartbeat pulse
            const pulse = Math.sin(time * 8) * 0.02;
            
            ventricleRef.current.scale.lerp(
                new THREE.Vector3(baseScale, baseScale + pulse, baseScale),
                delta * 8
            );
            
            // Color based on pressure
            const pressureNorm = Math.min(data.pressureVentricle / 120, 1);
            const targetColor = new THREE.Color().lerpColors(
                new THREE.Color('#ef4444'),
                new THREE.Color('#7f1d1d'),
                pressureNorm
            );
            
            if (ventricleRef.current.material) {
                ventricleRef.current.material.color.lerp(targetColor, delta * 3);
            }
        }

        // Aorta pulse
        if (aortaRef.current) {
            const aortaPressureNorm = (data.pressureAorta - 70) / 50; // normalize 70-120
            const aortaScale = 1.0 + aortaPressureNorm * 0.1;
            aortaRef.current.scale.x = aortaScale;
            aortaRef.current.scale.z = aortaScale;
        }

        // Blood particle animation
        if (particlesRef.current) {
            const dummy = new THREE.Object3D();
            
            particleData.forEach((p, i) => {
                let pos = new THREE.Vector3();
                
                // Phase 0: Flowing into atrium from pulmonary vein
                if (p.phase === 0) {
                    const t = p.progress;
                    pos.set(
                        -2 + t * 2, // From left (pulmonary vein)
                        1.5 + Math.sin(t * Math.PI) * 0.3,
                        Math.sin(p.angle + time * 0.5) * 0.3
                    );
                    
                    p.progress += p.speed * 2;
                    
                    if (p.progress >= 1.0) {
                        // Enter atrium swirl phase
                        p.phase = 1;
                        p.progress = 0;
                    }
                }
                // Phase 1: Swirling in atrium, then dropping to ventricle
                else if (p.phase === 1) {
                    if (p.progress < 0.6) {
                        // Swirl in atrium
                        const angle = p.angle + p.progress * Math.PI * 4;
                        const r = p.radius * 0.6;
                        pos.set(
                            Math.cos(angle) * r,
                            1.2 + Math.sin(p.progress * Math.PI * 2) * 0.2,
                            Math.sin(angle) * r
                        );
                        
                        p.progress += p.speed;
                    } else {
                        // Drop through mitral valve (if open)
                        if (isBicuspidOpen) {
                            const dropProgress = (p.progress - 0.6) / 0.4;
                            pos.set(
                                Math.cos(p.angle) * 0.3,
                                1.2 - dropProgress * 1.5,
                                Math.sin(p.angle) * 0.3
                            );
                            
                            p.progress += p.speed * 3;
                            
                            if (p.progress >= 1.0) {
                                p.phase = 2;
                                p.progress = 0;
                            }
                        } else {
                            // Stuck, keep swirling
                            p.progress = 0.6;
                            const angle = p.angle + time;
                            const r = p.radius * 0.6;
                            pos.set(
                                Math.cos(angle) * r,
                                1.2,
                                Math.sin(angle) * r
                            );
                        }
                    }
                }
                // Phase 2: In ventricle, swirling, then ejection
                else if (p.phase === 2) {
                    if (p.progress < 0.7) {
                        // Swirl in ventricle
                        const angle = p.angle + p.progress * Math.PI * 6;
                        const r = p.radius * 0.9;
                        const yBase = -0.3 - p.progress * 0.8;
                        
                        pos.set(
                            Math.cos(angle) * r,
                            yBase + Math.sin(angle * 2) * 0.2,
                            Math.sin(angle) * r
                        );
                        
                        // During isovolumetric contraction, swirl faster
                        if (!isBicuspidOpen && !isAorticOpen) {
                            p.angle += delta * 2; // Extra spin
                        }
                        
                        p.progress += p.speed * 0.8;
                    } else {
                        // Ejection phase
                        if (isAorticOpen) {
                            const ejectProgress = (p.progress - 0.7) / 0.3;
                            const curve = Math.pow(ejectProgress, 0.7); // Ease out
                            
                            pos.set(
                                Math.cos(p.angle) * 0.4 * (1 - ejectProgress),
                                -0.3 + curve * 3.5, // Shoot upward
                                Math.sin(p.angle) * 0.4 * (1 - ejectProgress)
                            );
                            
                            p.progress += p.speed * 5; // Fast ejection
                            
                            if (p.progress >= 1.0) {
                                // Reset to beginning
                                p.phase = 0;
                                p.progress = 0;
                                p.angle = Math.random() * Math.PI * 2;
                            }
                        } else {
                            // Valve closed, keep swirling
                            p.progress = 0.7;
                        }
                    }
                }
                
                pos.add(p.offset);
                
                dummy.position.copy(pos);
                const scale = 0.08;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                particlesRef.current.setMatrixAt(i, dummy.matrix);
            });
            
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* LEFT ATRIUM (Top chambers) */}
            <group position={[0, 1.2, 0]}>
                <mesh ref={atriumRef}>
                    <sphereGeometry args={[0.9, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.35}
                        roughness={0.3}
                        metalness={0.1}
                        transmission={0.6}
                        thickness={0.5}
                        clearcoat={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                
                {/* Atrium label */}
                <Text position={[1.8, 0, 0]} fontSize={0.3} color="#fca5a5" anchorX="left">
                    Left Atrium
                </Text>
            </group>

            {/* LEFT VENTRICLE (Main pumping chamber) */}
            <group position={[0, -0.3, 0]}>
                <mesh ref={ventricleRef}>
                    {/* Elongated teardrop shape for ventricle */}
                    <sphereGeometry args={[1.3, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        metalness={0.15}
                        transmission={0.5}
                        thickness={0.8}
                        clearcoat={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                
                {/* Apex (pointed bottom) */}
                <mesh position={[0, -1.5, 0]}>
                    <coneGeometry args={[0.8, 1.0, 32]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        metalness={0.15}
                        transmission={0.5}
                        thickness={0.6}
                        clearcoat={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                
                {/* Ventricle label */}
                <Text position={[2.2, -0.5, 0]} fontSize={0.35} color="#ef4444" anchorX="left">
                    Left Ventricle
                </Text>
                <Text position={[2.2, -0.9, 0]} fontSize={0.2} color="#94a3b8" anchorX="left">
                    {Math.round(data.pressureVentricle)} mmHg
                </Text>
                <Text position={[2.2, -1.2, 0]} fontSize={0.2} color="#94a3b8" anchorX="left">
                    {Math.round(data.volume)} mL
                </Text>
            </group>

            {/* AORTA (Main artery) */}
            <group position={[0, 2.5, 0]}>
                <mesh ref={aortaRef} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.5}
                        roughness={0.2}
                        metalness={0.2}
                        transmission={0.4}
                        thickness={0.3}
                        clearcoat={0.7}
                    />
                </mesh>
                
                {/* Aortic arch */}
                <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <torusGeometry args={[0.8, 0.4, 16, 32, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.5}
                        roughness={0.2}
                        metalness={0.2}
                        transmission={0.4}
                        thickness={0.3}
                        clearcoat={0.7}
                    />
                </mesh>
                
                <Text position={[1.5, 0.5, 0]} fontSize={0.3} color="#b91c1c" anchorX="left">
                    Aorta
                </Text>
            </group>

            {/* PULMONARY VEINS */}
            <group position={[-1.5, 1.5, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.25, 0.25, 1.5, 16]} />
                    <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} />
                </mesh>
                <Text position={[-0.8, 0.5, 0]} fontSize={0.25} color="#93c5fd" anchorX="right">
                    Pulmonary Veins
                </Text>
            </group>

            {/* VALVE INDICATORS (Glowing rings when open) */}
            {/* Mitral Valve */}
            <group position={[0, 0.5, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.6, 0.7, 32]} />
                    <meshStandardMaterial
                        color={isBicuspidOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isBicuspidOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isBicuspidOpen ? 0.8 : 0.3}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                <Text position={[-2, 0, 0]} fontSize={0.25} color="white" anchorX="right">
                    Mitral Valve
                </Text>
                <Text 
                    position={[-2, -0.3, 0]} 
                    fontSize={0.2} 
                    color={isBicuspidOpen ? "#4ade80" : "#f87171"}
                    anchorX="right"
                >
                    {isBicuspidOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* Aortic Valve */}
            <group position={[0, 1.8, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.4, 0.5, 32]} />
                    <meshStandardMaterial
                        color={isAorticOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isAorticOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isAorticOpen ? 0.8 : 0.3}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                <Text position={[1.8, 0, 0]} fontSize={0.25} color="white" anchorX="left">
                    Aortic Valve
                </Text>
                <Text 
                    position={[1.8, -0.3, 0]} 
                    fontSize={0.2} 
                    color={isAorticOpen ? "#4ade80" : "#f87171"}
                    anchorX="left"
                >
                    {isAorticOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* BLOOD PARTICLES */}
            <instancedMesh ref={particlesRef} args={[null, null, particleCount]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    color="#ff0000"
                    emissive="#cc0000"
                    emissiveIntensity={0.8}
                    metalness={0.3}
                    roughness={0.2}
                />
            </instancedMesh>

            {/* HEART SOUND EFFECT */}
            {soundVisual && (
                <group>
                    <Text
                        position={[0, 0, 3]}
                        fontSize={1.5}
                        color="#fbbf24"
                        outlineWidth={0.1}
                        outlineColor="#78350f"
                    >
                        {soundVisual.split(" ")[0]}
                    </Text>
                    
                    {/* Expanding ring effect */}
                    <mesh rotation={[0, 0, 0]}>
                        <ringGeometry args={[2, 2.3, 32]} />
                        <meshBasicMaterial
                            color="#fbbf24"
                            transparent
                            opacity={0.5}
                        />
                    </mesh>
                </group>
            )}

            {/* DIRECTIONAL ARROWS */}
            {isBicuspidOpen && (
                <mesh position={[0, 0.5, 1]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.2, 0.5, 8]} />
                    <meshStandardMaterial
                        color="#4ade80"
                        emissive="#22c55e"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            )}

            {isAorticOpen && (
                <mesh position={[0, 2.2, 1]}>
                    <coneGeometry args={[0.2, 0.5, 8]} />
                    <meshStandardMaterial
                        color="#4ade80"
                        emissive="#22c55e"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            )}
        </group>
    );
};

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden relative shadow-2xl">
            <Canvas 
                camera={{ position: [4, 1, 6], fov: 45 }} 
                shadows 
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
            >
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 5, 20]} />
                
                {/* Sophisticated Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
                <pointLight position={[0, 0, 5]} intensity={0.8} color="#60a5fa" />
                <pointLight position={[-5, -3, -3]} intensity={0.6} color="#ef4444" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                
                <Environment preset="city" />

                <CompleteHeart {...props} />

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={3}
                    maxDistance={12}
                    autoRotate={false}
                    autoRotateSpeed={0.5}
                    rotateSpeed={0.5}
                    target={[0, 0.5, 0]}
                />
            </Canvas>

            {/* UI Overlays */}
            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="text-white/90 font-bold text-xl tracking-wide drop-shadow-lg">
                    3D Heart Model
                </div>
                <div className="text-slate-300 text-sm font-medium mt-1">
                    Blood Flow Visualization
                </div>
            </div>

            {/* Phase Indicator */}
            <div className="absolute top-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700 shadow-lg">
                    <div className="text-xs text-slate-400 mb-1">Current Phase</div>
                    <div className="text-sm font-bold text-indigo-300">{props.data.phase}</div>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="absolute bottom-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700 shadow-lg space-y-2">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-400">Aorta</span>
                        <span className="text-sm font-mono text-red-400">{Math.round(props.data.pressureAorta)} mmHg</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-400">Ventricle</span>
                        <span className="text-sm font-mono text-orange-400">{Math.round(props.data.pressureVentricle)} mmHg</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-400">Atrium</span>
                        <span className="text-sm font-mono text-blue-400">{Math.round(props.data.pressureAtrium)} mmHg</span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700 shadow-lg space-y-1.5">
                    <div className="text-xs font-bold text-slate-300 mb-1">Legend</div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                        Blood Flow
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        Valve Open
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        Valve Closed
                    </div>
                </div>
            </div>

            {/* Interaction Hint */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-50">
                <div className="text-slate-500 text-sm text-center">
                    Drag to rotate • Scroll to zoom
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
