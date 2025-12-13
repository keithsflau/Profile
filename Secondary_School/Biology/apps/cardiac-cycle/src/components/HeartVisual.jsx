import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Anatomically-inspired heart shape using merged geometry
const AnatomicalHeart = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const heartGroupRef = useRef();
    const particlesRef = useRef();
    const leftVentricleRef = useRef();
    const rightVentricleRef = useRef();
    const leftAtriumRef = useRef();
    
    // Blood particles with more sophisticated flow
    const particleCount = 120;
    const particleData = useMemo(() => {
        return new Array(particleCount).fill(0).map((_, i) => ({
            // 0: pulmonary vein -> left atrium
            // 1: left atrium -> left ventricle (through mitral)
            // 2: left ventricle -> aorta (through aortic)
            phase: Math.floor(i / 40), // Distribute evenly
            progress: (i % 40) / 40, // Stagger within phase
            speed: 0.006 + Math.random() * 0.004,
            angle: Math.random() * Math.PI * 2,
            radius: 0.3 + Math.random() * 0.6,
            offset: new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2
            ),
        }));
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Whole heart subtle rotation
        if (heartGroupRef.current) {
            heartGroupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        }
        
        // Left Ventricle contraction
        if (leftVentricleRef.current) {
            const volumeNorm = (data.volume - 50) / 70;
            const scale = 0.9 + volumeNorm * 0.15;
            leftVentricleRef.current.scale.lerp(
                new THREE.Vector3(scale, scale, scale),
                delta * 6
            );
        }
        
        // Right ventricle subtle pulse (visual only)
        if (rightVentricleRef.current) {
            const pulse = 1.0 + Math.sin(time * 2) * 0.03;
            rightVentricleRef.current.scale.set(pulse, pulse, pulse);
        }
        
        // Left atrium
        if (leftAtriumRef.current) {
            const atrialScale = data.phase === "Atrial Systole" ? 0.95 : 1.0;
            leftAtriumRef.current.scale.lerp(
                new THREE.Vector3(atrialScale, atrialScale, atrialScale),
                delta * 4
            );
        }

        // Blood particle flow
        if (particlesRef.current) {
            const dummy = new THREE.Object3D();
            
            particleData.forEach((p, i) => {
                let pos = new THREE.Vector3();
                
                // Phase 0: Pulmonary veins -> Left Atrium
                if (p.phase === 0) {
                    const t = p.progress;
                    // Enter from back-left
                    pos.set(
                        -1.5 + t * 1.2,
                        0.8 + Math.sin(t * Math.PI) * 0.3,
                        -0.5 + t * 0.5
                    );
                    p.progress += p.speed * 2;
                    if (p.progress >= 1) {
                        p.phase = 1;
                        p.progress = 0;
                    }
                }
                // Phase 1: Left Atrium -> Left Ventricle
                else if (p.phase === 1) {
                    if (p.progress < 0.5) {
                        // Swirl in atrium
                        const angle = p.angle + p.progress * Math.PI * 3;
                        const r = 0.4 * (1 - p.progress * 0.5);
                        pos.set(
                            Math.cos(angle) * r - 0.3,
                            0.8 - p.progress * 0.3,
                            Math.sin(angle) * r
                        );
                        p.progress += p.speed * 1.5;
                    } else {
                        // Drop to ventricle (if mitral open)
                        if (isBicuspidOpen) {
                            const dropT = (p.progress - 0.5) / 0.5;
                            pos.set(
                                -0.3 + dropT * 0.1,
                                0.5 - dropT * 1.0,
                                Math.sin(p.angle) * 0.2
                            );
                            p.progress += p.speed * 3;
                            if (p.progress >= 1) {
                                p.phase = 2;
                                p.progress = 0;
                            }
                        } else {
                            p.progress = 0.5; // Wait
                        }
                    }
                }
                // Phase 2: Left Ventricle -> Aorta
                else if (p.phase === 2) {
                    if (p.progress < 0.6) {
                        // Swirl in ventricle
                        const angle = p.angle + p.progress * Math.PI * 4;
                        const r = 0.5 + p.radius * 0.3;
                        const y = -0.5 - p.progress * 0.5;
                        pos.set(
                            Math.cos(angle) * r - 0.2,
                            y + Math.sin(angle * 2) * 0.15,
                            Math.sin(angle) * r * 0.7
                        );
                        
                        // Trapped during isovolumetric
                        if (!isBicuspidOpen && !isAorticOpen) {
                            p.angle += delta * 1.5;
                        }
                        
                        p.progress += p.speed;
                    } else {
                        // Ejection (if aortic open)
                        if (isAorticOpen) {
                            const ejectT = (p.progress - 0.6) / 0.4;
                            const curve = Math.pow(ejectT, 0.6);
                            pos.set(
                                -0.2,
                                -0.5 + curve * 3,
                                0
                            );
                            p.progress += p.speed * 6;
                            if (p.progress >= 1) {
                                p.phase = 0;
                                p.progress = 0;
                                p.angle = Math.random() * Math.PI * 2;
                            }
                        } else {
                            p.progress = 0.6;
                        }
                    }
                }
                
                pos.add(p.offset);
                dummy.position.copy(pos);
                const scale = 0.06;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                particlesRef.current.setMatrixAt(i, dummy.matrix);
            });
            
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group ref={heartGroupRef} rotation={[0.1, -0.3, 0]}>
            {/* LEFT ATRIUM - rounded upper chamber */}
            <group position={[-0.3, 0.8, 0]} ref={leftAtriumRef}>
                <mesh>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.4}
                        roughness={0.3}
                        metalness={0.1}
                        transmission={0.5}
                        thickness={0.4}
                        clearcoat={0.5}
                    />
                </mesh>
                {/* Left Atrial Appendage (ear) */}
                <mesh position={[-0.5, 0.2, 0.3]} rotation={[0, 0.5, 0.3]}>
                    <capsuleGeometry args={[0.2, 0.4, 8, 16]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.4}
                        roughness={0.3}
                        metalness={0.1}
                        transmission={0.5}
                        thickness={0.3}
                        clearcoat={0.5}
                    />
                </mesh>
            </group>

            {/* RIGHT ATRIUM (lighter, for context) */}
            <group position={[0.6, 0.8, 0]} ref={rightVentricleRef}>
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#fcd34d"
                        transparent
                        opacity={0.2}
                        roughness={0.4}
                        transmission={0.7}
                        thickness={0.3}
                    />
                </mesh>
            </group>

            {/* LEFT VENTRICLE - main pumping chamber, elongated cone shape */}
            <group position={[-0.2, -0.3, 0]} ref={leftVentricleRef}>
                {/* Main body */}
                <mesh>
                    <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
                    <MeshDistortMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.45}
                        roughness={0.4}
                        metalness={0.15}
                        distort={0.15}
                        speed={2}
                        clearcoat={0.6}
                    />
                </mesh>
                
                {/* Apex (pointed tip) */}
                <mesh position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.7, 1.2, 32]} />
                    <MeshDistortMaterial
                        color="#dc2626"
                        transparent
                        opacity={0.45}
                        roughness={0.4}
                        metalness={0.15}
                        distort={0.2}
                        speed={2}
                        clearcoat={0.6}
                    />
                </mesh>
                
                {/* Interventricular septum (wall between ventricles) */}
                <mesh position={[0.5, -0.5, 0]} rotation={[0, 0, 0.3]}>
                    <boxGeometry args={[0.15, 1.5, 0.8]} />
                    <meshPhysicalMaterial
                        color="#991b1b"
                        transparent
                        opacity={0.3}
                        roughness={0.6}
                    />
                </mesh>
            </group>

            {/* RIGHT VENTRICLE (partial, for realism) */}
            <group position={[0.5, -0.3, 0.3]}>
                <mesh rotation={[0, 0.4, 0]}>
                    <sphereGeometry args={[0.7, 32, 32, 0, Math.PI, 0, Math.PI * 0.6]} />
                    <meshPhysicalMaterial
                        color="#fbbf24"
                        transparent
                        opacity={0.25}
                        roughness={0.4}
                        transmission={0.6}
                    />
                </mesh>
            </group>

            {/* AORTA - ascending and arch */}
            <group position={[-0.2, 1.5, 0]}>
                {/* Ascending aorta */}
                <mesh>
                    <cylinderGeometry args={[0.35, 0.4, 1.5, 24]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.5}
                        roughness={0.2}
                        metalness={0.2}
                        transmission={0.4}
                        thickness={0.2}
                        clearcoat={0.7}
                    />
                </mesh>
                
                {/* Aortic arch */}
                <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.6, 0.3, 16, 32, Math.PI]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.5}
                        roughness={0.2}
                        metalness={0.2}
                        transmission={0.4}
                        thickness={0.2}
                        clearcoat={0.7}
                    />
                </mesh>
                
                {/* Coronary arteries (detail) */}
                <mesh position={[0.3, -0.4, 0.3]} rotation={[0.3, 0, 0.5]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.8, 12]} />
                    <meshStandardMaterial color="#dc2626" transparent opacity={0.6} />
                </mesh>
            </group>

            {/* PULMONARY VEINS (4 vessels entering left atrium) */}
            <group position={[-0.8, 0.8, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.6, 12]} />
                    <meshStandardMaterial color="#60a5fa" transparent opacity={0.5} />
                </mesh>
            </group>
            <group position={[-0.6, 1.0, -0.4]}>
                <mesh rotation={[0.3, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.5, 12]} />
                    <meshStandardMaterial color="#60a5fa" transparent opacity={0.5} />
                </mesh>
            </group>

            {/* VALVE RINGS (glowing indicators) */}
            {/* Mitral Valve */}
            <group position={[-0.3, 0.3, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.45, 0.04, 16, 32]} />
                    <meshStandardMaterial
                        color={isBicuspidOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isBicuspidOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isBicuspidOpen ? 1.2 : 0.4}
                    />
                </mesh>
                
                <Text position={[-1.5, 0, 0]} fontSize={0.25} color="white" anchorX="right">
                    Mitral Valve
                </Text>
                <Text 
                    position={[-1.5, -0.25, 0]} 
                    fontSize={0.18} 
                    color={isBicuspidOpen ? "#4ade80" : "#f87171"}
                    anchorX="right"
                >
                    {isBicuspidOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* Aortic Valve */}
            <group position={[-0.2, 1.2, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.32, 0.04, 16, 32]} />
                    <meshStandardMaterial
                        color={isAorticOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isAorticOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isAorticOpen ? 1.2 : 0.4}
                    />
                </mesh>
                
                <Text position={[1.2, 0, 0]} fontSize={0.25} color="white" anchorX="left">
                    Aortic Valve
                </Text>
                <Text 
                    position={[1.2, -0.25, 0]} 
                    fontSize={0.18} 
                    color={isAorticOpen ? "#4ade80" : "#f87171"}
                    anchorX="left"
                >
                    {isAorticOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* LABELS */}
            <Text position={[-0.8, 1.2, 0]} fontSize={0.3} color="#fca5a5" anchorX="right">
                Left Atrium
            </Text>
            <Text position={[-1.2, -0.5, 0]} fontSize={0.35} color="#ef4444" anchorX="right">
                Left Ventricle
            </Text>
            <Text position={[-1.2, -0.85, 0]} fontSize={0.2} color="#94a3b8" anchorX="right">
                {Math.round(data.pressureVentricle)} mmHg
            </Text>
            <Text position={[0.3, 2.0, 0]} fontSize={0.3} color="#b91c1c" anchorX="left">
                Aorta
            </Text>

            {/* BLOOD PARTICLES */}
            <instancedMesh ref={particlesRef} args={[null, null, particleCount]}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial
                    color="#ff0000"
                    emissive="#cc0000"
                    emissiveIntensity={0.9}
                    metalness={0.4}
                    roughness={0.1}
                />
            </instancedMesh>

            {/* FLOW DIRECTION ARROWS */}
            {isBicuspidOpen && (
                <mesh position={[-0.3, 0.3, 0.8]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.15, 0.4, 8]} />
                    <meshStandardMaterial color="#4ade80" emissive="#22c55e" />
                </mesh>
            )}
            {isAorticOpen && (
                <mesh position={[-0.2, 1.5, 0.8]}>
                    <coneGeometry args={[0.15, 0.4, 8]} />
                    <meshStandardMaterial color="#4ade80" emissive="#22c55e" />
                </mesh>
            )}

            {/* SOUND EFFECT */}
            {soundVisual && (
                <Text
                    position={[0, 0, 2.5]}
                    fontSize={1.2}
                    color="#fbbf24"
                    outlineWidth={0.08}
                    outlineColor="#78350f"
                >
                    {soundVisual.split(" ")[0]}
                </Text>
            )}
        </group>
    );
};

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            <Canvas 
                camera={{ position: [3, 0.5, 4], fov: 50 }} 
                shadows 
                dpr={[1, 2]}
            >
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 3, 15]} />
                
                {/* Premium Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight 
                    position={[5, 5, 5]} 
                    intensity={1.5} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[-3, 2, 3]} intensity={1} color="#fca5a5" />
                <pointLight position={[3, -2, -2]} intensity={0.8} color="#60a5fa" />
                <spotLight
                    position={[0, 8, 0]}
                    angle={0.4}
                    penumbra={1}
                    intensity={1.2}
                    castShadow
                    color="#ffffff"
                />
                
                <Environment preset="city" />

                <AnatomicalHeart {...props} />

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={2}
                    maxDistance={10}
                    autoRotate={false}
                    rotateSpeed={0.4}
                    target={[0, 0, 0]}
                />
            </Canvas>

            {/* UI Overlays */}
            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="text-white/95 font-bold text-xl tracking-wide drop-shadow-lg">
                    Anatomical Heart Model
                </div>
                <div className="text-slate-300 text-sm font-medium mt-1">
                    3D Blood Flow Visualization
                </div>
            </div>

            {/* Phase Indicator */}
            <div className="absolute top-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/20">
                    <div className="text-xs text-slate-400 mb-1">Cardiac Phase</div>
                    <div className="text-sm font-bold text-indigo-300">{props.data.phase}</div>
                </div>
            </div>

            {/* Hemodynamic Data */}
            <div className="absolute bottom-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700 shadow-lg space-y-2.5">
                    <div className="text-xs font-bold text-slate-300 mb-2">Hemodynamics</div>
                    <div className="flex items-center justify-between gap-6">
                        <span className="text-xs text-slate-400">Aorta</span>
                        <span className="text-sm font-mono font-bold text-red-400">
                            {Math.round(props.data.pressureAorta)} <span className="text-xs text-slate-500">mmHg</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <span className="text-xs text-slate-400">LV</span>
                        <span className="text-sm font-mono font-bold text-orange-400">
                            {Math.round(props.data.pressureVentricle)} <span className="text-xs text-slate-500">mmHg</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <span className="text-xs text-slate-400">LA</span>
                        <span className="text-sm font-mono font-bold text-blue-400">
                            {Math.round(props.data.pressureAtrium)} <span className="text-xs text-slate-500">mmHg</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-6 pt-2 border-t border-slate-700">
                        <span className="text-xs text-slate-400">Volume</span>
                        <span className="text-sm font-mono font-bold text-emerald-400">
                            {Math.round(props.data.volume)} <span className="text-xs text-slate-500">mL</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-2.5 rounded-lg border border-slate-700 shadow-lg space-y-1.5">
                    <div className="text-xs font-bold text-slate-300 mb-1.5">Legend</div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"></span>
                        Oxygenated Blood
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]"></span>
                        Valve Open
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        Valve Closed
                    </div>
                </div>
            </div>

            {/* Interaction Hint */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-40">
                <div className="text-slate-500 text-sm text-center font-medium">
                    Drag to Rotate • Scroll to Zoom
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
