import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// Heart sound synthesis with user interaction requirement
let audioContext = null;
let audioInitialized = false;

const initAudio = () => {
    if (typeof window !== 'undefined' && !audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInitialized = true;
    }
};

const playHeartSound = (type) => {
    if (!audioContext || audioContext.state === 'suspended') {
        audioContext?.resume();
    }
    if (!audioContext) return;
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const now = audioContext.currentTime;
        
        if (type === 'LUB') {
            // Low frequency thud for AV valve closure
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(50, now);
            oscillator.frequency.exponentialRampToValueAtTime(30, now + 0.1);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(180, now);
            
            gainNode.gain.setValueAtTime(0.8, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            oscillator.start(now);
            oscillator.stop(now + 0.15);
        } else if (type === 'DUP') {
            // Higher frequency snap for semilunar valve closure
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(90, now);
            oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.08);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(220, now);
            
            gainNode.gain.setValueAtTime(0.6, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            
            oscillator.start(now);
            oscillator.stop(now + 0.1);
        }
    } catch (e) {
        console.warn('Audio playback failed:', e);
    }
};

// Realistic heart shape using merged geometry
const createRealisticHeartGeometry = () => {
    // Create a more organic heart shape by merging multiple geometries
    const heartGroup = new THREE.Group();
    
    // Base ventricles (teardrop/cone shapes)
    const leftVentricleGeo = new THREE.ConeGeometry(0.7, 1.8, 32);
    const rightVentricleGeo = new THREE.ConeGeometry(0.6, 1.5, 32);
    
    return { leftVentricleGeo, rightVentricleGeo };
};

// Improved valve with visible animation
const HeartValve = ({ position, rotation, isOpen, label, type = "AV", color = "#fbbf24" }) => {
    const leaflet1Ref = useRef();
    const leaflet2Ref = useRef();
    const leaflet3Ref = useRef();
    
    useFrame((state, delta) => {
        // More dramatic valve opening for visibility
        const targetAngle = isOpen ? (type === "AV" ? 1.4 : 1.5) : 0.02;
        
        if (type === "AV") {
            if (leaflet1Ref.current) {
                leaflet1Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet1Ref.current.rotation.z, targetAngle, delta * 12);
            }
            if (leaflet2Ref.current) {
                leaflet2Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet2Ref.current.rotation.z, -targetAngle, delta * 12);
            }
        } else {
            [leaflet1Ref, leaflet2Ref, leaflet3Ref].forEach(ref => {
                if (ref.current) {
                    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetAngle, delta * 12);
                }
            });
        }
    });
    
    return (
        <group position={position} rotation={rotation}>
            {/* Valve ring */}
            <mesh>
                <torusGeometry args={[0.38, 0.06, 16, 32]} />
                <meshStandardMaterial color="#b45309" metalness={0.4} roughness={0.3} />
            </mesh>
            
            {type === "AV" ? (
                <>
                    <group ref={leaflet1Ref} position={[-0.25, 0, 0]}>
                        <mesh rotation={[Math.PI/2, 0, 0]}>
                            <boxGeometry args={[0.5, 0.7, 0.05]} />
                            <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.95} />
                        </mesh>
                    </group>
                    <group ref={leaflet2Ref} position={[0.25, 0, 0]}>
                        <mesh rotation={[Math.PI/2, 0, 0]}>
                            <boxGeometry args={[0.5, 0.7, 0.05]} />
                            <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.95} />
                        </mesh>
                    </group>
                </>
            ) : (
                <>
                    {[0, 2.094, -2.094].map((angle, i) => (
                        <group key={i} rotation={[0, 0, angle]}>
                            <group ref={i === 0 ? leaflet1Ref : i === 1 ? leaflet2Ref : leaflet3Ref} position={[0.28, 0, 0]}>
                                <mesh rotation={[Math.PI/2, 0, 0]}>
                                    <coneGeometry args={[0.18, 0.6, 8]} />
                                    <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.95} />
                                </mesh>
                            </group>
                        </group>
                    ))}
                </>
            )}
            
            {/* Glow when open */}
            {isOpen && (
                <mesh>
                    <torusGeometry args={[0.42, 0.1, 16, 32]} />
                    <meshBasicMaterial color="#4ade80" transparent opacity={0.5} />
                </mesh>
            )}
            
            {/* Label with background */}
            <Html position={type === "AV" ? [-0.95, 0, 0] : [0.95, 0.3, 0]} center>
                <div style={{
                    background: 'rgba(15, 23, 42, 0.92)',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    backdropFilter: 'blur(8px)',
                    textAlign: type === "AV" ? 'right' : 'left',
                    minWidth: '90px'
                }}>
                    <div style={{ 
                        fontSize: '13px', 
                        fontWeight: '600', 
                        color: '#fff',
                        marginBottom: '2px'
                    }}>
                        {label}
                    </div>
                    <div style={{ 
                        fontSize: '11px', 
                        fontWeight: '700',
                        color: isOpen ? '#4ade80' : '#f87171'
                    }}>
                        {isOpen ? '● OPEN' : '● CLOSED'}
                    </div>
                </div>
            </Html>
        </group>
    );
};

// Realistic anatomical heart
const RealisticHeart = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const heartRef = useRef();
    const leftVentricleRef = useRef();
    const rightVentricleRef = useRef();
    const leftAtriumRef = useRef();
    const rightAtriumRef = useRef();
    
    const oxyParticlesRef = useRef();
    const deoxyParticlesRef = useRef();
    
    const isTricuspidOpen = isBicuspidOpen;
    const isPulmonaryOpen = isAorticOpen;
    
    const particleCount = 60;
    
    const createParticles = () => new Array(particleCount).fill(0).map(() => ({
        phase: Math.floor(Math.random() * 3),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.004,
        angle: Math.random() * Math.PI * 2,
        offset: new THREE.Vector3((Math.random()-0.5)*0.12, (Math.random()-0.5)*0.12, (Math.random()-0.5)*0.12)
    }));
    
    const oxyParticles = useMemo(createParticles, []);
    const deoxyParticles = useMemo(createParticles, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        if (heartRef.current) {
            const pulse = 1.0 + Math.sin(time * 2.5) * 0.012;
            heartRef.current.scale.set(pulse, pulse, pulse);
        }
        
        const volumeNorm = (data.volume - 50) / 70;
        const ventricleScale = 0.88 + volumeNorm * 0.17;
        const atrialScale = data.phase === "Atrial Systole" ? 0.92 : 1.0;
        
        if (leftVentricleRef.current) {
            leftVentricleRef.current.scale.lerp(new THREE.Vector3(ventricleScale, ventricleScale, ventricleScale), delta * 7);
        }
        if (rightVentricleRef.current) {
            const rvScale = 0.91 + volumeNorm * 0.12;
            rightVentricleRef.current.scale.lerp(new THREE.Vector3(rvScale, rvScale, rvScale), delta * 6);
        }
        if (leftAtriumRef.current) {
            leftAtriumRef.current.scale.lerp(new THREE.Vector3(atrialScale, atrialScale, atrialScale), delta * 5);
        }
        if (rightAtriumRef.current) {
            rightAtriumRef.current.scale.lerp(new THREE.Vector3(atrialScale, atrialScale, atrialScale), delta * 5);
        }

        const animateParticles = (particles, ref, isLeft) => {
            if (!ref.current) return;
            const dummy = new THREE.Object3D();
            const isMitralOpen = isLeft ? isBicuspidOpen : isTricuspidOpen;
            const isValveOpen = isLeft ? isAorticOpen : isPulmonaryOpen;
            const xOffset = isLeft ? -0.4 : 0.55;
            
            particles.forEach((p, i) => {
                let pos = new THREE.Vector3();
                
                if (p.phase === 0) {
                    pos.set(xOffset + (isLeft ? -1 : 1) * (1 - p.progress), 1.0, 0);
                    p.progress += p.speed * 2.5;
                    if (p.progress >= 1) { p.phase = 1; p.progress = 0; }
                } else if (p.phase === 1) {
                    if (p.progress < 0.55) {
                        const angle = p.angle + p.progress * Math.PI * 2.5;
                        pos.set(xOffset + Math.cos(angle) * 0.32, 0.85, Math.sin(angle) * 0.32);
                        p.progress += p.speed * 1.3;
                    } else {
                        if (isMitralOpen) {
                            pos.set(xOffset, 0.85 - (p.progress - 0.55) * 2.2, 0);
                            p.progress += p.speed * 3.5;
                            if (p.progress >= 1) { p.phase = 2; p.progress = 0; }
                        } else {
                            p.progress = 0.55;
                        }
                    }
                } else {
                    if (p.progress < 0.65) {
                        const angle = p.angle + p.progress * Math.PI * 4;
                        pos.set(xOffset + Math.cos(angle) * 0.48, -0.6 - p.progress * 0.5, Math.sin(angle) * 0.38);
                        p.progress += p.speed * 0.9;
                    } else {
                        if (isValveOpen) {
                            pos.set(xOffset, -0.4 + (p.progress - 0.65) * 7, 0);
                            p.progress += p.speed * 6;
                            if (p.progress >= 1) { p.phase = 0; p.progress = 0; p.angle = Math.random() * Math.PI * 2; }
                        } else {
                            p.progress = 0.65;
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
        <group ref={heartRef} rotation={[0.2, -0.3, 0.08]} position={[0, -0.2, 0]}>
            
            {/* LEFT ATRIUM - rounded organic shape */}
            <group position={[-0.4, 1.0, -0.15]} ref={leftAtriumRef}>
                <mesh castShadow>
                    <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.42}
                        roughness={0.35}
                        metalness={0.1}
                        transmission={0.55}
                        thickness={0.4}
                        clearcoat={0.5}
                    />
                </mesh>
                {/* Atrial appendage */}
                <mesh position={[-0.45, 0.15, 0.25]} rotation={[0.3, 0.6, 0.4]} castShadow>
                    <capsuleGeometry args={[0.18, 0.38, 8, 16]} />
                    <meshPhysicalMaterial
                        color="#f87171"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        transmission={0.5}
                    />
                </mesh>
                <Html position={[-0.95, 0.35, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.92)',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(252, 165, 165, 0.5)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fca5a5', whiteSpace: 'nowrap' }}>
                            Left Atrium
                        </div>
                    </div>
                </Html>
            </group>

            {/* RIGHT ATRIUM */}
            <group position={[0.6, 1.0, 0]} ref={rightAtriumRef}>
                <mesh castShadow>
                    <sphereGeometry args={[0.46, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
                    <meshPhysicalMaterial
                        color="#93c5fd"
                        transparent
                        opacity={0.38}
                        roughness={0.35}
                        transmission={0.6}
                        thickness={0.35}
                    />
                </mesh>
                <Html position={[1.05, 0.35, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.92)',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(147, 197, 253, 0.5)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#93c5fd', whiteSpace: 'nowrap' }}>
                            Right Atrium
                        </div>
                    </div>
                </Html>
            </group>

            {/* LEFT VENTRICLE - realistic teardrop shape */}
            <group position={[-0.4, -0.35, 0]} ref={leftVentricleRef}>
                <mesh castShadow rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.75, 1.75, 32, 1, false, 0, Math.PI * 2]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.45}
                        roughness={0.4}
                        metalness={0.12}
                        transmission={0.5}
                        thickness={0.7}
                        clearcoat={0.6}
                    />
                </mesh>
                {/* Rounded top */}
                <mesh position={[0, 0.85, 0]} castShadow>
                    <sphereGeometry args={[0.75, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.45}
                        roughness={0.4}
                        transmission={0.5}
                        thickness={0.7}
                    />
                </mesh>
                <Html position={[-1.2, -0.6, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.92)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.6)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>
                            Left Ventricle
                        </div>
                    </div>
                </Html>
            </group>

            {/* RIGHT VENTRICLE */}
            <group position={[0.58, -0.32, 0.22]} ref={rightVentricleRef}>
                <mesh castShadow rotation={[Math.PI, 0, 0.15]}>
                    <coneGeometry args={[0.62, 1.48, 32]} />
                    <meshPhysicalMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        transmission={0.58}
                        thickness={0.55}
                    />
                </mesh>
                <mesh position={[0, 0.72, 0]} castShadow>
                    <sphereGeometry args={[0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.4}
                        roughness={0.4}
                        transmission={0.58}
                    />
                </mesh>
                <Html position={[1.25, -0.55, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.92)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(96, 165, 250, 0.6)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#60a5fa', whiteSpace: 'nowrap' }}>
                            Right Ventricle
                        </div>
                    </div>
                </Html>
            </group>

            {/* AORTA */}
            <group position={[-0.4, 1.7, 0]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.32, 0.35, 1.3, 24]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.5}
                        roughness={0.25}
                        transmission={0.42}
                        clearcoat={0.7}
                    />
                </mesh>
                <Html position={[-0.85, 2.5, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.92)',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(185, 28, 28, 0.5)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#b91c1c' }}>
                            Aorta
                        </div>
                    </div>
                </Html>
            </group>

            {/* PULMONARY ARTERY */}
            <group position={[0.58, 1.6, 0.25]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.27, 0.3, 1.15, 24]} />
                    <meshPhysicalMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.45}
                        roughness={0.25}
                        transmission={0.45}
                    />
                </mesh>
                <Html position={[1.15, 2.3, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.92)',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(59, 130, 246, 0.5)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#60a5fa', whiteSpace: 'nowrap' }}>
                            Pulmonary A.
                        </div>
                    </div>
                </Html>
            </group>

            {/* VALVES */}
            <HeartValve 
                position={[-0.4, 0.45, 0]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isBicuspidOpen}
                label="Mitral"
                type="AV"
            />
            
            <HeartValve 
                position={[-0.4, 1.25, 0]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isAorticOpen}
                label="Aortic"
                type="SL"
            />
            
            <HeartValve 
                position={[0.58, 0.48, 0.22]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isTricuspidOpen}
                label="Tricuspid"
                type="AV"
            />
            
            <HeartValve 
                position={[0.58, 1.15, 0.25]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isPulmonaryOpen}
                label="Pulmonary"
                type="SL"
            />

            {/* Blood Particles */}
            <instancedMesh ref={oxyParticlesRef} args={[null, null, particleCount]} castShadow>
                <sphereGeometry args={[1, 10, 10]} />
                <meshStandardMaterial color="#ff0000" emissive="#cc0000" emissiveIntensity={0.85} />
            </instancedMesh>
            
            <instancedMesh ref={deoxyParticlesRef} args={[null, null, particleCount]} castShadow>
                <sphereGeometry args={[1, 10, 10]} />
                <meshStandardMaterial color="#4444ff" emissive="#0000cc" emissiveIntensity={0.85} />
            </instancedMesh>

            {/* Sound effects handled by audio synthesis */}
        </group>
    );
};

const HeartVisual = (props) => {
    // Initialize audio on first interaction
    useEffect(() => {
        const handleInteraction = () => {
            initAudio();
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
        
        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
        
        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
    }, []);
    
    // Play heart sounds when they occur
    useEffect(() => {
        if (props.soundVisual && audioInitialized) {
            const soundType = props.soundVisual.includes('LUB') ? 'LUB' : 'DUP';
            playHeartSound(soundType);
        }
    }, [props.soundVisual]);
    
    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            <Canvas 
                camera={{ position: [3.2, 0.4, 4.5], fov: 42 }} 
                shadows 
                dpr={[1, 2]}
            >
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 4, 14]} />
                
                <ambientLight intensity={0.45} />
                <directionalLight 
                    position={[6, 6, 6]} 
                    intensity={1.5} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[-4, 3, 4]} intensity={1.2} color="#fca5a5" />
                <pointLight position={[4, 3, 4]} intensity={1.2} color="#60a5fa" />
                <pointLight position={[0, -2, 3]} intensity={0.7} color="#a855f7" />
                <spotLight 
                    position={[0, 10, 0]} 
                    angle={0.45} 
                    penumbra={1} 
                    intensity={1.4} 
                    castShadow 
                />
                
                <Environment preset="city" />

                <RealisticHeart {...props} />

                <OrbitControls
                    enableZoom={true}
                    minDistance={2.8}
                    maxDistance={9}
                    rotateSpeed={0.5}
                    target={[0, 0.3, 0]}
                />
            </Canvas>

            {/* Phase indicator - top right */}
            <div className="absolute top-6 right-6 pointer-events-none select-none">
                <div className="bg-slate-900/95 backdrop-blur-md px-6 py-3 rounded-xl border border-indigo-500/40 shadow-xl shadow-indigo-500/20">
                    <div className="text-xs text-slate-400 font-medium mb-1">Cardiac Phase</div>
                    <div className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {props.data.phase}
                    </div>
                </div>
            </div>

            {/* Legend - bottom left */}
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
