import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Text, Environment, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Anatomically accurate heart shape using custom geometry
const createHeartGeometry = () => {
    const shape = new THREE.Shape();
    
    // Create a heart curve using the classic parametric equation
    // Scaled and adjusted for anatomical realism
    const x = t => 16 * Math.pow(Math.sin(t), 3);
    const y = t => 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const t = (i / 100) * Math.PI * 2;
        points.push(new THREE.Vector2(x(t) / 25, y(t) / 25));
    }
    
    shape.setFromPoints(points);
    
    const extrudeSettings = {
        depth: 0.8,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 5
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

// Valve component with visible leaflets
const HeartValve = ({ position, rotation, isOpen, label, type = "AV" }) => {
    const leaflet1Ref = useRef();
    const leaflet2Ref = useRef();
    const leaflet3Ref = useRef();
    
    useFrame((state, delta) => {
        // Smooth valve opening/closing animation
        const targetAngle = isOpen ? Math.PI / 3 : 0;
        
        if (type === "AV") {
            // AV valves (Mitral, Tricuspid) - 2 leaflets
            if (leaflet1Ref.current) {
                leaflet1Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet1Ref.current.rotation.z, targetAngle, delta * 8);
            }
            if (leaflet2Ref.current) {
                leaflet2Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet2Ref.current.rotation.z, -targetAngle, delta * 8);
            }
        } else {
            // Semilunar valves (Aortic, Pulmonary) - 3 leaflets (cusps)
            const openAngle = isOpen ? Math.PI / 2.5 : 0.1;
            if (leaflet1Ref.current) {
                leaflet1Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet1Ref.current.rotation.z, openAngle, delta * 8);
            }
            if (leaflet2Ref.current) {
                leaflet2Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet2Ref.current.rotation.z, openAngle, delta * 8);
            }
            if (leaflet3Ref.current) {
                leaflet3Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet3Ref.current.rotation.z, openAngle, delta * 8);
            }
        }
    });
    
    return (
        <group position={position} rotation={rotation}>
            {/* Annulus (valve ring) */}
            <mesh>
                <torusGeometry args={[0.35, 0.05, 16, 32]} />
                <meshStandardMaterial 
                    color="#d97706"
                    metalness={0.3}
                    roughness={0.4}
                />
            </mesh>
            
            {type === "AV" ? (
                // Two leaflets for AV valves
                <>
                    <group ref={leaflet1Ref} position={[-0.2, 0, 0]}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <boxGeometry args={[0.4, 0.6, 0.04]} />
                            <meshStandardMaterial 
                                color="#fbbf24"
                                side={THREE.DoubleSide}
                                transparent
                                opacity={0.9}
                            />
                        </mesh>
                    </group>
                    <group ref={leaflet2Ref} position={[0.2, 0, 0]}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <boxGeometry args={[0.4, 0.6, 0.04]} />
                            <meshStandardMaterial 
                                color="#fbbf24"
                                side={THREE.DoubleSide}
                                transparent
                                opacity={0.9}
                            />
                        </mesh>
                    </group>
                </>
            ) : (
                // Three cusps for Semilunar valves
                <>
                    <group rotation={[0, 0, 0]}>
                        <group ref={leaflet1Ref} position={[0.25, 0, 0]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <coneGeometry args={[0.15, 0.5, 8]} />
                                <meshStandardMaterial 
                                    color="#fbbf24"
                                    side={THREE.DoubleSide}
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>
                        </group>
                    </group>
                    <group rotation={[0, 0, Math.PI * 2 / 3]}>
                        <group ref={leaflet2Ref} position={[0.25, 0, 0]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <coneGeometry args={[0.15, 0.5, 8]} />
                                <meshStandardMaterial 
                                    color="#fbbf24"
                                    side={THREE.DoubleSide}
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>
                        </group>
                    </group>
                    <group rotation={[0, 0, -Math.PI * 2 / 3]}>
                        <group ref={leaflet3Ref} position={[0.25, 0, 0]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <coneGeometry args={[0.15, 0.5, 8]} />
                                <meshStandardMaterial 
                                    color="#fbbf24"
                                    side={THREE.DoubleSide}
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>
                        </group>
                    </group>
                </>
            )}
            
            {/* Label */}
            <Text 
                position={type === "AV" ? [-0.9, 0, 0] : [0.9, 0.3, 0]} 
                fontSize={0.18} 
                color="white"
                anchorX={type === "AV" ? "right" : "left"}
            >
                {label}
            </Text>
            <Text 
                position={type === "AV" ? [-0.9, -0.22, 0] : [0.9, 0.08, 0]} 
                fontSize={0.14} 
                color={isOpen ? "#4ade80" : "#f87171"}
                anchorX={type === "AV" ? "right" : "left"}
                fontWeight="bold"
            >
                {isOpen ? "OPEN ✓" : "CLOSED ✗"}
            </Text>
            
            {/* Glow effect when open */}
            {isOpen && (
                <mesh>
                    <torusGeometry args={[0.38, 0.08, 16, 32]} />
                    <meshBasicMaterial 
                        color="#4ade80"
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            )}
        </group>
    );
};

// Complete anatomical heart
const AnatomicalHeart = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const heartRef = useRef();
    const leftVentricleRef = useRef();
    const rightVentricleRef = useRef();
    const leftAtriumRef = useRef();
    const rightAtriumRef = useRef();
    
    const oxyParticlesRef = useRef();
    const deoxyParticlesRef = useRef();
    
    const isTricuspidOpen = isBicuspidOpen;
    const isPulmonaryOpen = isAorticOpen;
    
    const particleCount = 70;
    
    const oxyParticles = useMemo(() => 
        new Array(particleCount).fill(0).map(() => ({
            phase: Math.floor(Math.random() * 4),
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.003,
            angle: Math.random() * Math.PI * 2,
            offset: new THREE.Vector3((Math.random()-0.5)*0.15, (Math.random()-0.5)*0.15, (Math.random()-0.5)*0.15)
        }))
    , []);
    
    const deoxyParticles = useMemo(() => 
        new Array(particleCount).fill(0).map(() => ({
            phase: Math.floor(Math.random() * 4),
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.003,
            angle: Math.random() * Math.PI * 2,
            offset: new THREE.Vector3((Math.random()-0.5)*0.15, (Math.random()-0.5)*0.15, (Math.random()-0.5)*0.15)
        }))
    , []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Heart beat pulse
        if (heartRef.current) {
            const pulse = 1.0 + Math.sin(time * 2) * 0.015;
            heartRef.current.scale.set(pulse, pulse, pulse);
        }
        
        // Chamber contractions
        const volumeNorm = (data.volume - 50) / 70;
        const ventricleScale = 0.9 + volumeNorm * 0.15;
        const atrialScale = data.phase === "Atrial Systole" ? 0.93 : 1.0;
        
        if (leftVentricleRef.current) {
            leftVentricleRef.current.scale.lerp(new THREE.Vector3(ventricleScale, ventricleScale, ventricleScale), delta * 6);
        }
        if (rightVentricleRef.current) {
            const rvScale = 0.93 + volumeNorm * 0.1;
            rightVentricleRef.current.scale.lerp(new THREE.Vector3(rvScale, rvScale, rvScale), delta * 6);
        }
        if (leftAtriumRef.current) {
            leftAtriumRef.current.scale.lerp(new THREE.Vector3(atrialScale, atrialScale, atrialScale), delta * 5);
        }
        if (rightAtriumRef.current) {
            rightAtriumRef.current.scale.lerp(new THREE.Vector3(atrialScale, atrialScale, atrialScale), delta * 5);
        }

        // Particle animation (simplified for performance)
        const animateParticles = (particles, ref, isLeft) => {
            if (!ref.current) return;
            const dummy = new THREE.Object3D();
            const isMitralOpen = isLeft ? isBicuspidOpen : isTricuspidOpen;
            const isValveOpen = isLeft ? isAorticOpen : isPulmonaryOpen;
            
            particles.forEach((p, i) => {
                let pos = new THREE.Vector3();
                const xOffset = isLeft ? -0.35 : 0.5;
                
                if (p.phase === 0) {
                    // Vein to atrium
                    pos.set(xOffset + (isLeft ? -1 : 1) * (1 - p.progress), 0.9, 0);
                    p.progress += p.speed * 2;
                    if (p.progress >= 1) { p.phase = 1; p.progress = 0; }
                } else if (p.phase === 1) {
                    // Atrium swirl
                    if (p.progress < 0.6) {
                        const angle = p.angle + p.progress * Math.PI * 2;
                        pos.set(xOffset + Math.cos(angle) * 0.3, 0.8, Math.sin(angle) * 0.3);
                        p.progress += p.speed;
                    } else {
                        if (isMitralOpen) {
                            pos.set(xOffset, 0.8 - (p.progress - 0.6) * 2, 0);
                            p.progress += p.speed * 3;
                            if (p.progress >= 1) { p.phase = 2; p.progress = 0; }
                        } else {
                            p.progress = 0.6;
                        }
                    }
                } else if (p.phase === 2) {
                    // Ventricle
                    if (p.progress < 0.6) {
                        const angle = p.angle + p.progress * Math.PI * 3;
                        pos.set(xOffset + Math.cos(angle) * 0.5, -0.5 - p.progress * 0.4, Math.sin(angle) * 0.4);
                        p.progress += p.speed;
                    } else {
                        if (isValveOpen) {
                            pos.set(xOffset, -0.3 + (p.progress - 0.6) * 6, 0);
                            p.progress += p.speed * 5;
                            if (p.progress >= 1) { p.phase = 0; p.progress = 0; }
                        } else {
                            p.progress = 0.6;
                        }
                    }
                }
                
                pos.add(p.offset);
                dummy.position.copy(pos);
                dummy.scale.setScalar(0.05);
                dummy.updateMatrix();
                ref.current.setMatrixAt(i, dummy.matrix);
            });
            ref.current.instanceMatrix.needsUpdate = true;
        };
        
        animateParticles(oxyParticles, oxyParticlesRef, true);
        animateParticles(deoxyParticles, deoxyParticlesRef, false);
    });

    return (
        <group ref={heartRef} rotation={[0.15, -0.25, 0.05]}>
            {/* Heart Base */}
            <mesh position={[0, 0, 0]} scale={[1.2, 1.3, 0.8]}>
                <dodecahedronGeometry args={[1, 2]} />
                <meshPhysicalMaterial
                    color="#7f1d1d"
                    transparent
                    opacity={0.15}
                    roughness={0.4}
                    transmission={0.7}
                    thickness={0.8}
                />
            </mesh>
            
            {/* Left Atrium */}
            <group position={[-0.35, 0.9, 0]} ref={leftAtriumRef}>
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.35}
                        roughness={0.3}
                        transmission={0.6}
                        thickness={0.4}
                    />
                </mesh>
                <Text position={[-0.9, 0.2, 0]} fontSize={0.2} color="#fca5a5" anchorX="right">
                    Left Atrium
                </Text>
            </group>

            {/* Right Atrium */}
            <group position={[0.5, 0.9, 0.1]} ref={rightAtriumRef}>
                <mesh>
                    <sphereGeometry args={[0.45, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#93c5fd"
                        transparent
                        opacity={0.32}
                        roughness={0.3}
                        transmission={0.65}
                        thickness={0.35}
                    />
                </mesh>
                <Text position={[0.9, 0.2, 0]} fontSize={0.2} color="#93c5fd" anchorX="left">
                    Right Atrium
                </Text>
            </group>

            {/* Left Ventricle */}
            <group position={[-0.35, -0.4, 0]} ref={leftVentricleRef}>
                <mesh>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        transmission={0.55}
                        thickness={0.7}
                    />
                </mesh>
                <mesh position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.6, 1, 32]} />
                    <meshPhysicalMaterial
                        color="#dc2626"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        transmission={0.55}
                        thickness={0.6}
                    />
                </mesh>
                <Text position={[-1.2, -0.5, 0]} fontSize={0.24} color="#ef4444" anchorX="right">
                    Left Ventricle
                </Text>
            </group>

            {/* Right Ventricle */}
            <group position={[0.5, -0.4, 0.2]} ref={rightVentricleRef}>
                <mesh>
                    <sphereGeometry args={[0.65, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.36}
                        roughness={0.4}
                        transmission={0.6}
                        thickness={0.55}
                    />
                </mesh>
                <mesh position={[0, -0.95, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.5, 0.85, 32]} />
                    <meshPhysicalMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.36}
                        roughness={0.4}
                        transmission={0.6}
                        thickness={0.5}
                    />
                </mesh>
                <Text position={[1.1, -0.5, 0]} fontSize={0.24} color="#60a5fa" anchorX="left">
                    Right Ventricle
                </Text>
            </group>

            {/* Aorta */}
            <group position={[-0.35, 1.6, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.3, 0.32, 1.2, 24]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.45}
                        roughness={0.25}
                        transmission={0.45}
                    />
                </mesh>
                <Text position={[0.7, 0.3, 0]} fontSize={0.22} color="#b91c1c" anchorX="left">
                    Aorta
                </Text>
            </group>

            {/* Pulmonary Artery */}
            <group position={[0.5, 1.5, 0.2]}>
                <mesh>
                    <cylinderGeometry args={[0.26, 0.28, 1.0, 24]} />
                    <meshPhysicalMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.42}
                        roughness={0.25}
                        transmission={0.48}
                    />
                </mesh>
                <Text position={[0.7, 0.2, 0]} fontSize={0.2} color="#3b82f6" anchorX="left">
                    Pulmonary A.
                </Text>
            </group>

            {/* VALVES WITH VISIBLE LEAFLETS */}
            <HeartValve 
                position={[-0.35, 0.35, 0]} 
                rotation={[Math.PI / 2, 0, 0]}
                isOpen={isBicuspidOpen}
                label="Mitral"
                type="AV"
            />
            
            <HeartValve 
                position={[-0.35, 1.15, 0]} 
                rotation={[Math.PI / 2, 0, 0]}
                isOpen={isAorticOpen}
                label="Aortic"
                type="SL"
            />
            
            <HeartValve 
                position={[0.5, 0.35, 0.2]} 
                rotation={[Math.PI / 2, 0, 0]}
                isOpen={isTricuspidOpen}
                label="Tricuspid"
                type="AV"
            />
            
            <HeartValve 
                position={[0.5, 1.05, 0.2]} 
                rotation={[Math.PI / 2, 0, 0]}
                isOpen={isPulmonaryOpen}
                label="Pulmonary"
                type="SL"
            />

            {/* Blood Particles */}
            <instancedMesh ref={oxyParticlesRef} args={[null, null, particleCount]}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshStandardMaterial color="#ff0000" emissive="#cc0000" emissiveIntensity={0.8} />
            </instancedMesh>
            
            <instancedMesh ref={deoxyParticlesRef} args={[null, null, particleCount]}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshStandardMaterial color="#4444ff" emissive="#0000cc" emissiveIntensity={0.8} />
            </instancedMesh>

            {/* Sound */}
            {soundVisual && (
                <Text position={[0, 0, 2.5]} fontSize={1.2} color="#fbbf24" outlineWidth={0.1} outlineColor="#78350f">
                    {soundVisual.split(" ")[0]}
                </Text>
            )}
        </group>
    );
};

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            <Canvas camera={{ position: [3, 0.5, 5], fov: 45 }} shadows dpr={[1, 2]}>
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 4, 15]} />
                
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.4} castShadow />
                <pointLight position={[-4, 2, 3]} intensity={1.0} color="#fca5a5" />
                <pointLight position={[4, 2, 3]} intensity={1.0} color="#60a5fa" />
                <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={1.2} castShadow />
                
                <Environment preset="city" />

                <AnatomicalHeart {...props} />

                <OrbitControls
                    enableZoom={true}
                    minDistance={2.5}
                    maxDistance={10}
                    rotateSpeed={0.4}
                    target={[0, 0.2, 0]}
                />
            </Canvas>

            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="text-white/95 font-bold text-xl drop-shadow-lg">
                    4-Chamber Heart Model
                </div>
                <div className="text-slate-300 text-sm mt-1">
                    Dual Circulation • Valve Mechanics
                </div>
            </div>

            <div className="absolute top-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur px-4 py-3 rounded-xl border border-indigo-500/30">
                    <div className="text-xs text-slate-400">Phase</div>
                    <div className="text-sm font-bold text-indigo-300">{props.data.phase}</div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur px-4 py-3 rounded-xl border border-slate-700 space-y-2 text-xs">
                    <div className="font-bold text-slate-300 mb-2">Hemodynamics</div>
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Aorta</span>
                        <span className="font-mono font-bold text-red-400">{Math.round(props.data.pressureAorta)} mmHg</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400">LV</span>
                        <span className="font-mono font-bold text-orange-400">{Math.round(props.data.pressureVentricle)} mmHg</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Volume</span>
                        <span className="font-mono font-bold text-emerald-400">{Math.round(props.data.volume)} mL</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 pointer-events-none select-none">
                <div className="bg-slate-900/90 backdrop-blur px-3 py-2.5 rounded-lg border border-slate-700 space-y-1.5 text-xs">
                    <div className="font-bold text-slate-300 mb-1.5">Blood Flow</div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                        <span className="text-slate-300">Oxygenated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                        <span className="text-slate-300">Deoxygenated</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
