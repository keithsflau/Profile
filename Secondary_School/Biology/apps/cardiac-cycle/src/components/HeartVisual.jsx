import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Cross-sectional Heart Model (Cutaway View)
const HeartCrossSection = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const atriumWallRef = useRef();
    const ventricleWallRef = useRef();
    const bloodAtriumRef = useRef();
    const bloodVentricleRef = useRef();
    
    // Blood Particles
    const particleCount = 80;
    const particlesRef = useRef();
    
    const particleData = useMemo(() => {
        return new Array(particleCount).fill(0).map((_, i) => ({
            // Distribute particles between atrium (0) and ventricle (1)
            chamber: i < 30 ? 0 : 1, // 0=atrium, 1=ventricle
            angle: Math.random() * Math.PI * 2,
            radius: Math.random(),
            height: Math.random(),
            speed: 0.01 + Math.random() * 0.02,
            phase: Math.random() * Math.PI * 2,
        }));
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Animate chamber walls based on pressure/volume
        // Atrium: subtle pulse
        if (atriumWallRef.current) {
            const atriumPulse = 1.0 + Math.sin(time * 3) * 0.03;
            atriumWallRef.current.scale.set(atriumPulse, atriumPulse, 1);
        }
        
        // Ventricle: strong contraction based on volume
        if (ventricleWallRef.current) {
            // Volume: 50 (contracted) to 120 (relaxed)
            const volumeNorm = (data.volume - 50) / 70; // 0 to 1
            const scale = 0.75 + volumeNorm * 0.25; // 0.75 to 1.0
            ventricleWallRef.current.scale.lerp(
                new THREE.Vector3(scale, scale, 1), 
                delta * 5
            );
            
            // Color intensity based on pressure
            const pressureIntensity = Math.min(data.pressureVentricle / 120, 1);
            const color = new THREE.Color().lerpColors(
                new THREE.Color('#ef4444'),
                new THREE.Color('#7f1d1d'),
                pressureIntensity
            );
            ventricleWallRef.current.material.color.copy(color);
        }

        // Blood fill level visualization
        if (bloodAtriumRef.current) {
            bloodAtriumRef.current.material.opacity = 0.6;
        }
        
        if (bloodVentricleRef.current) {
            // Volume affects the blood "fill height"
            const fillLevel = (data.volume - 50) / 70; // 0 to 1
            bloodVentricleRef.current.scale.y = 0.3 + fillLevel * 0.7;
            bloodVentricleRef.current.material.opacity = 0.5 + fillLevel * 0.2;
        }

        // Animate blood particles
        if (particlesRef.current) {
            const dummy = new THREE.Object3D();
            
            particleData.forEach((p, i) => {
                // Position logic
                let x, y, z;
                
                if (p.chamber === 0) {
                    // Atrium particles
                    const r = p.radius * 1.8;
                    x = Math.cos(p.angle + time * p.speed) * r;
                    y = 2.5 + Math.sin(p.angle * 2 + time * p.speed * 2) * 0.3;
                    z = Math.sin(p.angle + time * p.speed) * r * 0.5;
                    
                    // Migration to ventricle when bicuspid opens
                    if (isBicuspidOpen && p.radius > 0.6) {
                        // Move towards valve
                        y -= delta * 2;
                        if (y < 1.5) {
                            // Transfer to ventricle
                            p.chamber = 1;
                            p.radius = 0.2;
                            p.angle = Math.random() * Math.PI * 2;
                        }
                    }
                } else {
                    // Ventricle particles
                    const r = p.radius * 2.2;
                    x = Math.cos(p.angle + time * p.speed * 1.5) * r;
                    y = -0.5 + Math.sin(p.phase + time * p.speed) * 1.2;
                    z = Math.sin(p.angle + time * p.speed * 1.5) * r * 0.5;
                    
                    // Swirl during contraction
                    if (!isBicuspidOpen && !isAorticOpen) {
                        p.angle += delta * 3; // Isovolumetric swirl
                    }
                    
                    // Ejection when aortic opens
                    if (isAorticOpen && p.radius < 0.5 && y > 0.5) {
                        y += delta * 5; // Rapid ejection upward
                        if (y > 3.5) {
                            // Recycle to atrium
                            p.chamber = 0;
                            p.radius = Math.random();
                            p.angle = Math.random() * Math.PI * 2;
                        }
                    }
                }
                
                dummy.position.set(x, y, z);
                const scale = 0.12;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                particlesRef.current.setMatrixAt(i, dummy.matrix);
            });
            
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Background Tissue */}
            <mesh position={[0, 1, -2]}>
                <planeGeometry args={[12, 10]} />
                <meshStandardMaterial color="#1a1a2e" />
            </mesh>

            {/* LEFT ATRIUM */}
            <group position={[0, 2.5, 0]}>
                {/* Atrium Wall (Ring) */}
                <mesh ref={atriumWallRef}>
                    <ringGeometry args={[1.8, 2.3, 64]} />
                    <meshStandardMaterial 
                        color="#fca5a5" 
                        side={THREE.DoubleSide}
                        roughness={0.6}
                    />
                </mesh>
                
                {/* Blood Pool */}
                <mesh ref={bloodAtriumRef} position={[0, 0, -0.1]}>
                    <circleGeometry args={[1.8, 64]} />
                    <meshStandardMaterial 
                        color="#dc2626" 
                        transparent 
                        opacity={0.6}
                        emissive="#7f1d1d"
                        emissiveIntensity={0.3}
                    />
                </mesh>
                
                {/* Label */}
                <Text position={[3, 0, 0]} fontSize={0.4} color="#fca5a5" anchorX="left">
                    Left Atrium
                </Text>
                <Text position={[3, -0.5, 0]} fontSize={0.2} color="#94a3b8" anchorX="left">
                    P: {Math.round(data.pressureAtrium)} mmHg
                </Text>
            </group>

            {/* BICUSPID (MITRAL) VALVE */}
            <group position={[0, 1.2, 0]}>
                {/* Valve Leaflets */}
                <group rotation={[0, 0, isBicuspidOpen ? 0.8 : 0]}>
                    <mesh position={[-0.5, 0, 0]}>
                        <boxGeometry args={[1.2, 0.15, 0.3]} />
                        <meshStandardMaterial color="#fbbf24" roughness={0.4} />
                    </mesh>
                </group>
                <group rotation={[0, 0, isBicuspidOpen ? -0.8 : 0]}>
                    <mesh position={[0.5, 0, 0]}>
                        <boxGeometry args={[1.2, 0.15, 0.3]} />
                        <meshStandardMaterial color="#fbbf24" roughness={0.4} />
                    </mesh>
                </group>
                
                {/* Annulus (Ring) */}
                <mesh rotation={[0, 0, 0]}>
                    <ringGeometry args={[2.0, 2.15, 64]} />
                    <meshStandardMaterial color="#b45309" side={THREE.DoubleSide} />
                </mesh>
                
                {/* Label */}
                <Text position={[-3.5, 0, 0]} fontSize={0.35} color="white" anchorX="right">
                    Bicuspid (Mitral)
                </Text>
                <Text 
                    position={[-3.5, -0.4, 0]} 
                    fontSize={0.25} 
                    color={isBicuspidOpen ? "#4ade80" : "#f87171"}
                    anchorX="right"
                >
                    {isBicuspidOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* LEFT VENTRICLE */}
            <group position={[0, -0.5, 0]}>
                {/* Ventricle Wall (Thick Ring) */}
                <mesh ref={ventricleWallRef}>
                    <ringGeometry args={[2.2, 3.0, 64]} />
                    <meshStandardMaterial 
                        color="#ef4444" 
                        side={THREE.DoubleSide}
                        roughness={0.5}
                    />
                </mesh>
                
                {/* Blood Pool */}
                <mesh ref={bloodVentricleRef} position={[0, 0, -0.1]}>
                    <circleGeometry args={[2.2, 64]} />
                    <meshStandardMaterial 
                        color="#b91c1c" 
                        transparent 
                        opacity={0.7}
                        emissive="#450a0a"
                        emissiveIntensity={0.4}
                    />
                </mesh>
                
                {/* Papillary Muscles (Visual Detail) */}
                <mesh position={[-1.2, -0.8, 0]}>
                    <cylinderGeometry args={[0.2, 0.15, 1, 16]} />
                    <meshStandardMaterial color="#991b1b" />
                </mesh>
                <mesh position={[1.2, -0.8, 0]}>
                    <cylinderGeometry args={[0.2, 0.15, 1, 16]} />
                    <meshStandardMaterial color="#991b1b" />
                </mesh>
                
                {/* Label */}
                <Text position={[3.5, 0, 0]} fontSize={0.4} color="#ef4444" anchorX="left">
                    Left Ventricle
                </Text>
                <Text position={[3.5, -0.5, 0]} fontSize={0.2} color="#94a3b8" anchorX="left">
                    P: {Math.round(data.pressureVentricle)} mmHg
                </Text>
                <Text position={[3.5, -0.8, 0]} fontSize={0.2} color="#94a3b8" anchorX="left">
                    Vol: {Math.round(data.volume)} mL
                </Text>
            </group>

            {/* AORTIC VALVE */}
            <group position={[0, 2.0, 0]}>
                {/* Semilunar Leaflets (3-part) */}
                <group rotation={[0, 0, 0]}>
                    <mesh 
                        position={[0.6, 0, 0]} 
                        rotation={[0, 0, isAorticOpen ? 1.2 : 0.1]}
                    >
                        <coneGeometry args={[0.15, 1.0, 3]} />
                        <meshStandardMaterial color="#fbbf24" />
                    </mesh>
                </group>
                <group rotation={[0, 0, 2.1]}>
                    <mesh 
                        position={[0.6, 0, 0]} 
                        rotation={[0, 0, isAorticOpen ? 1.2 : 0.1]}
                    >
                        <coneGeometry args={[0.15, 1.0, 3]} />
                        <meshStandardMaterial color="#fbbf24" />
                    </mesh>
                </group>
                <group rotation={[0, 0, -2.1]}>
                    <mesh 
                        position={[0.6, 0, 0]} 
                        rotation={[0, 0, isAorticOpen ? 1.2 : 0.1]}
                    >
                        <coneGeometry args={[0.15, 1.0, 3]} />
                        <meshStandardMaterial color="#fbbf24" />
                    </mesh>
                </group>
                
                {/* Annulus */}
                <mesh>
                    <ringGeometry args={[0.7, 0.85, 64]} />
                    <meshStandardMaterial color="#b45309" side={THREE.DoubleSide} />
                </mesh>
                
                {/* Label */}
                <Text position={[2.5, 0.3, 0]} fontSize={0.35} color="white" anchorX="left">
                    Aortic Valve
                </Text>
                <Text 
                    position={[2.5, -0.1, 0]} 
                    fontSize={0.25} 
                    color={isAorticOpen ? "#4ade80" : "#f87171"}
                    anchorX="left"
                >
                    {isAorticOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* AORTA (Ascending) */}
            <group position={[0, 3.5, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.7, 0.7, 2, 32]} />
                    <meshStandardMaterial 
                        color="#b91c1c" 
                        transparent 
                        opacity={0.8}
                        roughness={0.3}
                    />
                </mesh>
                <Text position={[2, 0, 0]} fontSize={0.35} color="#b91c1c" anchorX="left">
                    Aorta
                </Text>
                <Text position={[2, -0.4, 0]} fontSize={0.2} color="#94a3b8" anchorX="left">
                    P: {Math.round(data.pressureAorta)} mmHg
                </Text>
            </group>

            {/* BLOOD PARTICLES */}
            <instancedMesh ref={particlesRef} args={[null, null, particleCount]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial 
                    color="#ff0000" 
                    emissive="#990000" 
                    emissiveIntensity={0.6}
                    roughness={0.2}
                    metalness={0.1}
                />
            </instancedMesh>

            {/* SOUND EFFECT */}
            {soundVisual && (
                <Text
                    position={[0, 5, 1]}
                    fontSize={1.2}
                    color="#fbbf24"
                    outlineWidth={0.08}
                    outlineColor="#78350f"
                >
                    {soundVisual.split(" ")[0]}
                </Text>
            )}

            {/* Flow Direction Arrows (When Valves Open) */}
            {isBicuspidOpen && (
                <mesh position={[0, 1.5, 0.5]} rotation={[0, 0, Math.PI]}>
                    <coneGeometry args={[0.3, 0.6, 3]} />
                    <meshStandardMaterial color="#4ade80" emissive="#22c55e" />
                </mesh>
            )}
            
            {isAorticOpen && (
                <mesh position={[0, 2.5, 0.5]}>
                    <coneGeometry args={[0.3, 0.6, 3]} />
                    <meshStandardMaterial color="#4ade80" emissive="#22c55e" />
                </mesh>
            )}
        </group>
    );
};

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden relative shadow-inner shadow-black">
            <Canvas camera={{ position: [0, 1, 10], fov: 35 }} dpr={[1, 2]}>
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 8, 20]} />
                
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <pointLight position={[-5, -5, 5]} intensity={0.8} color="#3b82f6" />
                <Environment preset="night" />

                <HeartCrossSection {...props} />

                <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI}
                    rotateSpeed={0.3}
                    target={[0, 1, 0]}
                />
            </Canvas>

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="text-white/90 font-bold text-lg tracking-wide drop-shadow-md">
                    Cross-Sectional View
                </div>
                <div className="text-slate-400 text-xs font-mono">Left Heart • Blood Flow Visualization</div>
            </div>
            
            {/* Phase Indicator */}
            <div className="absolute top-4 right-4 pointer-events-none select-none bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700">
                <div className="text-sm font-bold text-indigo-300">Phase: {props.data.phase}</div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 pointer-events-none select-none bg-slate-900/80 p-3 rounded-lg border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-300 mb-1">Legend:</div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                    Oxygenated Blood
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-3 h-3 rounded-sm bg-yellow-500"></span>
                    Valve Leaflets
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Flow Direction
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
