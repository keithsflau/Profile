import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Complete 4-chamber heart with systemic + pulmonary circulation
const CompleteHeartModel = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const heartGroupRef = useRef();
    const leftAtriumRef = useRef();
    const leftVentricleRef = useRef();
    const rightAtriumRef = useRef();
    const rightVentricleRef = useRef();
    
    // Two particle systems: oxygenated (red) and deoxygenated (blue)
    const oxyParticlesRef = useRef();
    const deoxyParticlesRef = useRef();
    
    // Simulate right heart valve states (synchronized with left heart)
    const isTricuspidOpen = isBicuspidOpen; // AV valves open together
    const isPulmonaryOpen = isAorticOpen;   // Semilunar valves open together
    
    const oxyParticleCount = 80; // Systemic circulation (left heart)
    const deoxyParticleCount = 80; // Pulmonary circulation (right heart)
    
    // Oxygenated blood flow (LEFT heart pathway)
    const oxyParticleData = useMemo(() => {
        return new Array(oxyParticleCount).fill(0).map((_, i) => ({
            // 0: pulmonary vein -> left atrium
            // 1: left atrium -> left ventricle (mitral)
            // 2: left ventricle -> aorta (aortic)
            // 3: aorta -> body -> vena cava (invisible transition)
            phase: i % 4,
            progress: (i % 20) / 20,
            speed: 0.006 + Math.random() * 0.004,
            angle: Math.random() * Math.PI * 2,
            radius: 0.3 + Math.random() * 0.5,
            offset: new THREE.Vector3(
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.15
            ),
        }));
    }, []);
    
    // Deoxygenated blood flow (RIGHT heart pathway)
    const deoxyParticleData = useMemo(() => {
        return new Array(deoxyParticleCount).fill(0).map((_, i) => ({
            // 0: vena cava -> right atrium
            // 1: right atrium -> right ventricle (tricuspid)
            // 2: right ventricle -> pulmonary artery (pulmonary valve)
            // 3: pulmonary artery -> lungs -> pulmonary vein (invisible transition)
            phase: i % 4,
            progress: (i % 20) / 20,
            speed: 0.005 + Math.random() * 0.004,
            angle: Math.random() * Math.PI * 2,
            radius: 0.3 + Math.random() * 0.5,
            offset: new THREE.Vector3(
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.15
            ),
        }));
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Gentle whole-heart rotation
        if (heartGroupRef.current) {
            heartGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.08;
        }
        
        // Atrial contractions (synchronized)
        const atrialContraction = data.phase === "Atrial Systole" ? 0.92 : 1.0;
        if (leftAtriumRef.current) {
            leftAtriumRef.current.scale.lerp(
                new THREE.Vector3(atrialContraction, atrialContraction, atrialContraction),
                delta * 5
            );
        }
        if (rightAtriumRef.current) {
            rightAtriumRef.current.scale.lerp(
                new THREE.Vector3(atrialContraction, atrialContraction, atrialContraction),
                delta * 5
            );
        }
        
        // Ventricular contractions (synchronized)
        const volumeNorm = (data.volume - 50) / 70;
        const ventricleScale = 0.88 + volumeNorm * 0.18;
        
        if (leftVentricleRef.current) {
            leftVentricleRef.current.scale.lerp(
                new THREE.Vector3(ventricleScale, ventricleScale, ventricleScale),
                delta * 7
            );
        }
        if (rightVentricleRef.current) {
            // Right ventricle has lower pressure, slightly less dramatic
            const rvScale = 0.92 + volumeNorm * 0.12;
            rightVentricleRef.current.scale.lerp(
                new THREE.Vector3(rvScale, rvScale, rvScale),
                delta * 6
            );
        }

        // OXYGENATED blood particles (RED - left heart)
        if (oxyParticlesRef.current) {
            const dummy = new THREE.Object3D();
            
            oxyParticleData.forEach((p, i) => {
                let pos = new THREE.Vector3();
                
                // Phase 0: Pulmonary veins -> Left Atrium
                if (p.phase === 0) {
                    const t = p.progress;
                    pos.set(
                        -1.8 + t * 1.4, // Enter from back left
                        0.9 + Math.sin(t * Math.PI) * 0.2,
                        -0.6 + t * 0.6
                    );
                    p.progress += p.speed * 2;
                    if (p.progress >= 1) { p.phase = 1; p.progress = 0; }
                }
                // Phase 1: Left Atrium -> Left Ventricle (through Mitral)
                else if (p.phase === 1) {
                    if (p.progress < 0.5) {
                        const angle = p.angle + p.progress * Math.PI * 2;
                        const r = 0.35 * (1 - p.progress * 0.4);
                        pos.set(
                            Math.cos(angle) * r - 0.4,
                            0.8 - p.progress * 0.2,
                            Math.sin(angle) * r
                        );
                        p.progress += p.speed * 1.2;
                    } else {
                        if (isBicuspidOpen) {
                            const dropT = (p.progress - 0.5) / 0.5;
                            pos.set(
                                -0.35,
                                0.6 - dropT * 1.1,
                                0
                            );
                            p.progress += p.speed * 3;
                            if (p.progress >= 1) { p.phase = 2; p.progress = 0; }
                        } else {
                            p.progress = 0.5; // Wait
                        }
                    }
                }
                // Phase 2: Left Ventricle -> Aorta
                else if (p.phase === 2) {
                    if (p.progress < 0.6) {
                        const angle = p.angle + p.progress * Math.PI * 3;
                        const r = 0.4 + p.radius * 0.25;
                        pos.set(
                            Math.cos(angle) * r - 0.3,
                            -0.5 - p.progress * 0.4,
                            Math.sin(angle) * r * 0.6
                        );
                        if (!isBicuspidOpen && !isAorticOpen) p.angle += delta * 1.2;
                        p.progress += p.speed * 0.8;
                    } else {
                        if (isAorticOpen) {
                            const ejectT = (p.progress - 0.6) / 0.4;
                            pos.set(-0.3, -0.4 + Math.pow(ejectT, 0.7) * 2.8, 0);
                            p.progress += p.speed * 5;
                            if (p.progress >= 1) { p.phase = 3; p.progress = 0; }
                        } else {
                            p.progress = 0.6;
                        }
                    }
                }
                // Phase 3: Aorta -> Body (exit and recycle as deoxygenated conceptually)
                else if (p.phase === 3) {
                    const t = p.progress;
                    pos.set(-0.3, 2.2 + t * 1.5, 0); // Upward into aorta
                    p.progress += p.speed * 3;
                    if (p.progress >= 1) { p.phase = 0; p.progress = 0; p.angle = Math.random() * Math.PI * 2; }
                }
                
                pos.add(p.offset);
                dummy.position.copy(pos);
                const scale = 0.055;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                oxyParticlesRef.current.setMatrixAt(i, dummy.matrix);
            });
            
            oxyParticlesRef.current.instanceMatrix.needsUpdate = true;
        }

        // DEOXYGENATED blood particles (BLUE - right heart)
        if (deoxyParticlesRef.current) {
            const dummy = new THREE.Object3D();
            
            deoxyParticleData.forEach((p, i) => {
                let pos = new THREE.Vector3();
                
                // Phase 0: Vena Cava -> Right Atrium
                if (p.phase === 0) {
                    const t = p.progress;
                    pos.set(
                        1.8 - t * 1.4, // Enter from front right
                        0.9 + Math.sin(t * Math.PI) * 0.2,
                        0.6 - t * 0.6
                    );
                    p.progress += p.speed * 2;
                    if (p.progress >= 1) { p.phase = 1; p.progress = 0; }
                }
                // Phase 1: Right Atrium -> Right Ventricle (through Tricuspid)
                else if (p.phase === 1) {
                    if (p.progress < 0.5) {
                        const angle = p.angle + p.progress * Math.PI * 2;
                        const r = 0.3 * (1 - p.progress * 0.4);
                        pos.set(
                            Math.cos(angle) * r + 0.6,
                            0.8 - p.progress * 0.2,
                            Math.sin(angle) * r
                        );
                        p.progress += p.speed * 1.2;
                    } else {
                        if (isTricuspidOpen) {
                            const dropT = (p.progress - 0.5) / 0.5;
                            pos.set(
                                0.5,
                                0.6 - dropT * 1.0,
                                0.2
                            );
                            p.progress += p.speed * 3;
                            if (p.progress >= 1) { p.phase = 2; p.progress = 0; }
                        } else {
                            p.progress = 0.5;
                        }
                    }
                }
                // Phase 2: Right Ventricle -> Pulmonary Artery
                else if (p.phase === 2) {
                    if (p.progress < 0.6) {
                        const angle = p.angle + p.progress * Math.PI * 3;
                        const r = 0.35 + p.radius * 0.2;
                        pos.set(
                            Math.cos(angle) * r + 0.5,
                            -0.4 - p.progress * 0.35,
                            Math.sin(angle) * r * 0.6 + 0.2
                        );
                        if (!isTricuspidOpen && !isPulmonaryOpen) p.angle += delta * 1.2;
                        p.progress += p.speed * 0.8;
                    } else {
                        if (isPulmonaryOpen) {
                            const ejectT = (p.progress - 0.6) / 0.4;
                            pos.set(0.5, -0.3 + Math.pow(ejectT, 0.7) * 2.5, 0.3);
                            p.progress += p.speed * 5;
                            if (p.progress >= 1) { p.phase = 3; p.progress = 0; }
                        } else {
                            p.progress = 0.6;
                        }
                    }
                }
                // Phase 3: Pulmonary Artery -> Lungs (exit and recycle)
                else if (p.phase === 3) {
                    const t = p.progress;
                    pos.set(0.5, 2.0 + t * 1.5, 0.3);
                    p.progress += p.speed * 3;
                    if (p.progress >= 1) { p.phase = 0; p.progress = 0; p.angle = Math.random() * Math.PI * 2; }
                }
                
                pos.add(p.offset);
                dummy.position.copy(pos);
                const scale = 0.055;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                deoxyParticlesRef.current.setMatrixAt(i, dummy.matrix);
            });
            
            deoxyParticlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group ref={heartGroupRef} rotation={[0.1, -0.2, 0]}>
            {/* ===== LEFT HEART (Oxygenated Blood) ===== */}
            
            {/* Left Atrium */}
            <group position={[-0.4, 0.9, 0]} ref={leftAtriumRef}>
                <mesh>
                    <sphereGeometry args={[0.55, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.38}
                        roughness={0.3}
                        transmission={0.55}
                        thickness={0.4}
                        clearcoat={0.5}
                    />
                </mesh>
                <Text position={[-1.2, 0, 0]} fontSize={0.22} color="#fca5a5" anchorX="right">
                    Left Atrium
                </Text>
            </group>

            {/* Left Ventricle */}
            <group position={[-0.3, -0.4, 0]} ref={leftVentricleRef}>
                <mesh>
                    <sphereGeometry args={[0.85, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
                    <MeshDistortMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.42}
                        roughness={0.4}
                        distort={0.12}
                        speed={2.5}
                        clearcoat={0.6}
                    />
                </mesh>
                <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.65, 1.1, 32]} />
                    <MeshDistortMaterial
                        color="#dc2626"
                        transparent
                        opacity={0.42}
                        roughness={0.4}
                        distort={0.15}
                        speed={2.5}
                        clearcoat={0.6}
                    />
                </mesh>
                <Text position={[-1.5, -0.3, 0]} fontSize={0.26} color="#ef4444" anchorX="right">
                    Left Ventricle
                </Text>
            </group>

            {/* ===== RIGHT HEART (Deoxygenated Blood) ===== */}
            
            {/* Right Atrium */}
            <group position={[0.6, 0.9, 0]} ref={rightAtriumRef}>
                <mesh>
                    <sphereGeometry args={[0.48, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#93c5fd"
                        transparent
                        opacity={0.35}
                        roughness={0.3}
                        transmission={0.6}
                        thickness={0.3}
                        clearcoat={0.5}
                    />
                </mesh>
                <Text position={[1.1, 0, 0]} fontSize={0.22} color="#93c5fd" anchorX="left">
                    Right Atrium
                </Text>
            </group>

            {/* Right Ventricle */}
            <group position={[0.5, -0.4, 0.25]} ref={rightVentricleRef}>
                <mesh rotation={[0, 0.3, 0]}>
                    <sphereGeometry args={[0.68, 32, 32, 0, Math.PI * 1.2, 0, Math.PI * 0.65]} />
                    <MeshDistortMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.38}
                        roughness={0.4}
                        distort={0.1}
                        speed={2}
                        clearcoat={0.5}
                    />
                </mesh>
                <mesh position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.5, 0.9, 32]} />
                    <MeshDistortMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.38}
                        roughness={0.4}
                        distort={0.12}
                        speed={2}
                        clearcoat={0.5}
                    />
                </mesh>
                <Text position={[1.3, -0.3, 0]} fontSize={0.26} color="#60a5fa" anchorX="left">
                    Right Ventricle
                </Text>
            </group>

            {/* Interventricular Septum (wall) */}
            <mesh position={[0.1, -0.7, 0]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.12, 1.6, 0.9]} />
                <meshPhysicalMaterial color="#991b1b" transparent opacity={0.25} roughness={0.6} />
            </mesh>

            {/* ===== GREAT VESSELS ===== */}
            
            {/* Aorta (from left ventricle) */}
            <group position={[-0.3, 1.6, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.32, 0.36, 1.4, 24]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.48}
                        roughness={0.25}
                        transmission={0.4}
                        clearcoat={0.7}
                    />
                </mesh>
                <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.55, 0.28, 16, 32, Math.PI]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.48}
                        roughness={0.25}
                        transmission={0.4}
                        clearcoat={0.7}
                    />
                </mesh>
                <Text position={[0.8, 0.3, 0]} fontSize={0.26} color="#b91c1c" anchorX="left">
                    Aorta
                </Text>
            </group>

            {/* Pulmonary Artery (from right ventricle) */}
            <group position={[0.5, 1.5, 0.3]}>
                <mesh>
                    <cylinderGeometry args={[0.28, 0.32, 1.2, 24]} />
                    <meshPhysicalMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.45}
                        roughness={0.25}
                        transmission={0.45}
                        clearcoat={0.6}
                    />
                </mesh>
                <Text position={[0.9, 0.2, 0]} fontSize={0.22} color="#3b82f6" anchorX="left">
                    Pulmonary Artery
                </Text>
            </group>

            {/* Pulmonary Veins (to left atrium) */}
            <group position={[-1.2, 0.9, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.14, 0.14, 0.7, 16]} />
                    <meshStandardMaterial color="#ef4444" transparent opacity={0.5} />
                </mesh>
                <Text position={[-0.6, 0.4, 0]} fontSize={0.18} color="#fca5a5" anchorX="right">
                    Pulmonary Veins
                </Text>
            </group>

            {/* Superior Vena Cava (to right atrium) */}
            <group position={[1.0, 1.3, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.18, 0.18, 0.8, 16]} />
                    <meshStandardMaterial color="#1e40af" transparent opacity={0.5} />
                </mesh>
                <Text position={[0.6, 0.3, 0]} fontSize={0.18} color="#93c5fd" anchorX="left">
                    Vena Cava
                </Text>
            </group>

            {/* ===== VALVE INDICATORS ===== */}
            
            {/* Mitral Valve (Left AV) */}
            <group position={[-0.4, 0.4, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.42, 0.035, 16, 32]} />
                    <meshStandardMaterial
                        color={isBicuspidOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isBicuspidOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isBicuspidOpen ? 1.0 : 0.4}
                    />
                </mesh>
                <Text position={[-1.0, 0, 0]} fontSize={0.2} color="white" anchorX="right">Mitral</Text>
                <Text position={[-1.0, -0.2, 0]} fontSize={0.15} color={isBicuspidOpen ? "#4ade80" : "#f87171"} anchorX="right">
                    {isBicuspidOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* Aortic Valve (Left Semilunar) */}
            <group position={[-0.3, 1.2, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.035, 16, 32]} />
                    <meshStandardMaterial
                        color={isAorticOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isAorticOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isAorticOpen ? 1.0 : 0.4}
                    />
                </mesh>
                <Text position={[0.8, 0, 0]} fontSize={0.2} color="white" anchorX="left">Aortic</Text>
            </group>

            {/* Tricuspid Valve (Right AV) */}
            <group position={[0.6, 0.4, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.36, 0.035, 16, 32]} />
                    <meshStandardMaterial
                        color={isTricuspidOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isTricuspidOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isTricuspidOpen ? 1.0 : 0.4}
                    />
                </mesh>
                <Text position={[0.9, 0, 0]} fontSize={0.2} color="white" anchorX="left">Tricuspid</Text>
            </group>

            {/* Pulmonary Valve (Right Semilunar) */}
            <group position={[0.5, 1.1, 0.3]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.26, 0.035, 16, 32]} />
                    <meshStandardMaterial
                        color={isPulmonaryOpen ? "#4ade80" : "#fbbf24"}
                        emissive={isPulmonaryOpen ? "#22c55e" : "#f59e0b"}
                        emissiveIntensity={isPulmonaryOpen ? 1.0 : 0.4}
                    />
                </mesh>
                <Text position={[0.7, 0, 0]} fontSize={0.18} color="white" anchorX="left">Pulmonary</Text>
            </group>

            {/* ===== BLOOD PARTICLES ===== */}
            
            {/* Oxygenated Blood (RED) */}
            <instancedMesh ref={oxyParticlesRef} args={[null, null, oxyParticleCount]}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial
                    color="#ff0000"
                    emissive="#cc0000"
                    emissiveIntensity={0.85}
                    metalness={0.35}
                    roughness={0.15}
                />
            </instancedMesh>

            {/* Deoxygenated Blood (BLUE) */}
            <instancedMesh ref={deoxyParticlesRef} args={[null, null, deoxyParticleCount]}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial
                    color="#4444ff"
                    emissive="#0000cc"
                    emissiveIntensity={0.85}
                    metalness={0.35}
                    roughness={0.15}
                />
            </instancedMesh>

            {/* SOUND EFFECT */}
            {soundVisual && (
                <Text
                    position={[0, 0, 2.8]}
                    fontSize={1.3}
                    color="#fbbf24"
                    outlineWidth={0.1}
                    outlineColor="#78350f"
                >
                    {soundVisual.split(" ")[0]}
                </Text>
            )}

            {/* Flow Arrows */}
            {isBicuspidOpen && (
                <>
                    <mesh position={[-0.4, 0.4, 0.9]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.12, 0.35, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.5} />
                    </mesh>
                    <mesh position={[0.6, 0.4, 0.9]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.12, 0.35, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.5} />
                    </mesh>
                </>
            )}
            {isAorticOpen && (
                <>
                    <mesh position={[-0.3, 1.6, 0.9]}>
                        <coneGeometry args={[0.12, 0.35, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.5} />
                    </mesh>
                    <mesh position={[0.5, 1.5, 1.1]}>
                        <coneGeometry args={[0.12, 0.35, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.5} />
                    </mesh>
                </>
            )}
        </group>
    );
};

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            <Canvas 
                camera={{ position: [3.5, 0.3, 5], fov: 48 }} 
                shadows 
                dpr={[1, 2]}
            >
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 4, 16]} />
                
                {/* Dramatic Lighting */}
                <ambientLight intensity={0.35} />
                <directionalLight position={[6, 6, 6]} intensity={1.6} castShadow />
                <pointLight position={[-4, 2, 4]} intensity={1.1} color="#fca5a5" />
                <pointLight position={[4, 2, 4]} intensity={1.1} color="#60a5fa" />
                <pointLight position={[0, -3, -2]} intensity={0.6} color="#a855f7" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={1.3} castShadow />
                
                <Environment preset="city" />

                <CompleteHeartModel {...props} />

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={2.5}
                    maxDistance={12}
                    autoRotate={false}
                    rotateSpeed={0.4}
                    target={[0, 0.2, 0]}
                />
            </Canvas>

            {/* UI */}
            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="text-white/95 font-bold text-xl tracking-wide drop-shadow-lg">
                    Complete Heart Circulation
                </div>
                <div className="text-slate-300 text-sm font-medium mt-1">
                    4-Chamber • Systemic + Pulmonary Flow
                </div>
            </div>

            <div className="absolute top-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-indigo-500/30 shadow-lg">
                    <div className="text-xs text-slate-400 mb-1">Cardiac Phase</div>
                    <div className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {props.data.phase}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700 shadow-lg space-y-2">
                    <div className="text-xs font-bold text-slate-300 mb-2">Hemodynamics (Left)</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                        <span className="text-slate-400">Aorta</span>
                        <span className="font-mono font-bold text-red-400 text-right">
                            {Math.round(props.data.pressureAorta)} mmHg
                        </span>
                        <span className="text-slate-400">LV</span>
                        <span className="font-mono font-bold text-orange-400 text-right">
                            {Math.round(props.data.pressureVentricle)} mmHg
                        </span>
                        <span className="text-slate-400">LA</span>
                        <span className="font-mono font-bold text-blue-400 text-right">
                            {Math.round(props.data.pressureAtrium)} mmHg
                        </span>
                        <span className="text-slate-400 border-t border-slate-700 pt-2">Volume</span>
                        <span className="font-mono font-bold text-emerald-400 text-right border-t border-slate-700 pt-2">
                            {Math.round(props.data.volume)} mL
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-2.5 rounded-lg border border-slate-700 shadow-lg space-y-1.5">
                    <div className="text-xs font-bold text-slate-300 mb-2">Blood Flow</div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"></span>
                        Oxygenated (Systemic)
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
                        Deoxygenated (Pulmonary)
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300 pt-1.5 border-t border-slate-700">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        Valve Open
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
