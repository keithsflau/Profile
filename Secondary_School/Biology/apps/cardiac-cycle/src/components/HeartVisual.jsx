import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// Heart sound synthesis - LOUD
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
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(55, now);
            oscillator.frequency.exponentialRampToValueAtTime(35, now + 0.12);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, now);
            
            // VERY LOUD
            gainNode.gain.setValueAtTime(3.0, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
            
            oscillator.start(now);
            oscillator.stop(now + 0.18);
        } else if (type === 'DUP') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(95, now);
            oscillator.frequency.exponentialRampToValueAtTime(55, now + 0.1);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(250, now);
            
            // VERY LOUD
            gainNode.gain.setValueAtTime(2.5, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            
            oscillator.start(now);
            oscillator.stop(now + 0.12);
        }
    } catch (e) {
        console.warn('Audio playback failed:', e);
    }
};

// Improved Heart Valve with better positioning
const HeartValve = ({ position, rotation, isOpen, label, type = "AV", labelPos = "left" }) => {
    const leaflet1Ref = useRef();
    const leaflet2Ref = useRef();
    const leaflet3Ref = useRef();
    
    useFrame((state, delta) => {
        const targetAngle = isOpen ? (type === "AV" ? 1.5 : 1.6) : 0.01;
        
        if (type === "AV") {
            if (leaflet1Ref.current) {
                leaflet1Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet1Ref.current.rotation.z, targetAngle, delta * 14);
            }
            if (leaflet2Ref.current) {
                leaflet2Ref.current.rotation.z = THREE.MathUtils.lerp(leaflet2Ref.current.rotation.z, -targetAngle, delta * 14);
            }
        } else {
            [leaflet1Ref, leaflet2Ref, leaflet3Ref].forEach(ref => {
                if (ref.current) {
                    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetAngle, delta * 14);
                }
            });
        }
    });
    
    // Determine label position based on labelPos prop
    let htmlPosition;
    if (labelPos === "left") {
        htmlPosition = [-1.0, 0, 0];
    } else if (labelPos === "right") {
        htmlPosition = [1.0, 0, 0];
    } else if (labelPos === "leftTop") {
        htmlPosition = [-0.95, 0.35, 0];
    } else if (labelPos === "rightTop") {
        htmlPosition = [0.95, 0.35, 0];
    }
    
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <torusGeometry args={[0.4, 0.07, 16, 32]} />
                <meshStandardMaterial color="#b45309" metalness={0.4} roughness={0.3} />
            </mesh>
            
            {type === "AV" ? (
                <>
                    <group ref={leaflet1Ref} position={[-0.25, 0, 0]}>
                        <mesh rotation={[Math.PI/2, 0, 0]}>
                            <boxGeometry args={[0.5, 0.75, 0.06]} />
                            <meshStandardMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.95} />
                        </mesh>
                    </group>
                    <group ref={leaflet2Ref} position={[0.25, 0, 0]}>
                        <mesh rotation={[Math.PI/2, 0, 0]}>
                            <boxGeometry args={[0.5, 0.75, 0.06]} />
                            <meshStandardMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.95} />
                        </mesh>
                    </group>
                </>
            ) : (
                <>
                    {[0, 2.094, -2.094].map((angle, i) => (
                        <group key={i} rotation={[0, 0, angle]}>
                            <group ref={i === 0 ? leaflet1Ref : i === 1 ? leaflet2Ref : leaflet3Ref} position={[0.3, 0, 0]}>
                                <mesh rotation={[Math.PI/2, 0, 0]}>
                                    <coneGeometry args={[0.2, 0.65, 8]} />
                                    <meshStandardMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.95} />
                                </mesh>
                            </group>
                        </group>
                    ))}
                </>
            )}
            
            {isOpen && (
                <mesh>
                    <torusGeometry args={[0.45, 0.11, 16, 32]} />
                    <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
                </mesh>
            )}
            
            <Html position={htmlPosition} center>
                <div style={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    padding: '6px 11px',
                    borderRadius: '8px',
                    border: '1px solid rgba(148, 163, 184, 0.4)',
                    backdropFilter: 'blur(10px)',
                    textAlign: labelPos.includes('right') ? 'left' : 'right',
                    minWidth: '95px'
                }}>
                    <div style={{ 
                        fontSize: '13px', 
                        fontWeight: '600', 
                        color: '#fff',
                        marginBottom: '3px'
                    }}>
                        {label}
                    </div>
                    <div style={{ 
                        fontSize: '12px', 
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

// Anatomically accurate 4-chamber heart
const AnatomicalHeart = ({ data, isBicuspidOpen, isAorticOpen }) => {
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
            const pulse = 1.0 + Math.sin(time * 2.5) * 0.015;
            heartRef.current.scale.set(pulse, pulse, pulse);
        }
        
        const volumeNorm = (data.volume - 50) / 70;
        const ventricleScale = 0.87 + volumeNorm * 0.18;
        const atrialScale = data.phase === "Atrial Systole" ? 0.91 : 1.0;
        
        if (leftVentricleRef.current) {
            leftVentricleRef.current.scale.lerp(new THREE.Vector3(ventricleScale, ventricleScale, ventricleScale), delta * 7);
        }
        if (rightVentricleRef.current) {
            const rvScale = 0.90 + volumeNorm * 0.13;
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
            const xOffset = isLeft ? -0.45 : 0.6;
            
            particles.forEach((p, i) => {
                let pos = new THREE.Vector3();
                
                if (p.phase === 0) {
                    pos.set(xOffset + (isLeft ? -1 : 1) * (1 - p.progress), 1.1, 0);
                    p.progress += p.speed * 2.5;
                    if (p.progress >= 1) { p.phase = 1; p.progress = 0; }
                } else if (p.phase === 1) {
                    if (p.progress < 0.55) {
                        const angle = p.angle + p.progress * Math.PI * 2.5;
                        pos.set(xOffset + Math.cos(angle) * 0.34, 0.9, Math.sin(angle) * 0.34);
                        p.progress += p.speed * 1.3;
                    } else {
                        if (isMitralOpen) {
                            pos.set(xOffset, 0.9 - (p.progress - 0.55) * 2.4, 0);
                            p.progress += p.speed * 3.5;
                            if (p.progress >= 1) { p.phase = 2; p.progress = 0; }
                        } else {
                            p.progress = 0.55;
                        }
                    }
                } else {
                    if (p.progress < 0.65) {
                        const angle = p.angle + p.progress * Math.PI * 4;
                        pos.set(xOffset + Math.cos(angle) * 0.52, -0.65 - p.progress * 0.55, Math.sin(angle) * 0.42);
                        p.progress += p.speed * 0.9;
                    } else {
                        if (isValveOpen) {
                            pos.set(xOffset, -0.45 + (p.progress - 0.65) * 7.5, 0);
                            p.progress += p.speed * 6;
                            if (p.progress >= 1) { p.phase = 0; p.progress = 0; p.angle = Math.random() * Math.PI * 2; }
                        } else {
                            p.progress = 0.65;
                        }
                    }
                }
                
                pos.add(p.offset);
                dummy.position.copy(pos);
                dummy.scale.setScalar(0.052);
                dummy.updateMatrix();
                ref.current.setMatrixAt(i, dummy.matrix);
            });
            ref.current.instanceMatrix.needsUpdate = true;
        };
        
        animateParticles(oxyParticles, oxyParticlesRef, true);
        animateParticles(deoxyParticles, deoxyParticlesRef, false);
    });

    return (
        <group ref={heartRef} rotation={[0.18, -0.28, 0.06]} position={[0, -0.25, 0]}>
            
            {/* LEFT ATRIUM - anatomically accurate */}
            <group position={[-0.45, 1.05, -0.2]} ref={leftAtriumRef}>
                <mesh castShadow>
                    <sphereGeometry args={[0.54, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
                    <meshPhysicalMaterial
                        color="#fca5a5"
                        transparent
                        opacity={0.44}
                        roughness={0.32}
                        metalness={0.08}
                        transmission={0.58}
                        thickness={0.42}
                        clearcoat={0.52}
                    />
                </mesh>
                <mesh position={[-0.48, 0.18, 0.28]} rotation={[0.32, 0.62, 0.42]} castShadow>
                    <capsuleGeometry args={[0.19, 0.42, 8, 16]} />
                    <meshPhysicalMaterial
                        color="#f87171"
                        transparent
                        opacity={0.42}
                        roughness={0.38}
                        transmission={0.52}
                    />
                </mesh>
                <Html position={[-1.2, 0.75, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.93)',
                        padding: '6px 11px',
                        borderRadius: '8px',
                        border: '1px solid rgba(252, 165, 165, 0.55)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fca5a5' }}>
                            Left Atrium
                        </div>
                    </div>
                </Html>
            </group>

            {/* RIGHT ATRIUM */}
            <group position={[0.65, 1.05, 0.05]} ref={rightAtriumRef}>
                <mesh castShadow>
                    <sphereGeometry args={[0.48, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
                    <meshPhysicalMaterial
                        color="#93c5fd"
                        transparent
                        opacity={0.40}
                        roughness={0.32}
                        transmission={0.62}
                        thickness={0.37}
                    />
                </mesh>
                <Html position={[1.45, 0.75, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.93)',
                        padding: '6px 11px',
                        borderRadius: '8px',
                        border: '1px solid rgba(147, 197, 253, 0.55)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#93c5fd' }}>
                            Right Atrium
                        </div>
                    </div>
                </Html>
            </group>

            {/* LEFT VENTRICLE - thick muscular wall */}
            <group position={[-0.45, -0.38, 0]} ref={leftVentricleRef}>
                <mesh castShadow rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.78, 1.85, 32, 1, false, 0, Math.PI * 2]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.47}
                        roughness={0.42}
                        metalness={0.10}
                        transmission={0.52}
                        thickness={0.75}
                        clearcoat={0.62}
                    />
                </mesh>
                <mesh position={[0, 0.9, 0]} castShadow>
                    <sphereGeometry args={[0.78, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.47}
                        roughness={0.42}
                        transmission={0.52}
                        thickness={0.75}
                    />
                </mesh>
                <Html position={[-1.2, -1.35, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.93)',
                        padding: '7px 13px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.65)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444' }}>
                            Left Ventricle
                        </div>
                    </div>
                </Html>
            </group>

            {/* RIGHT VENTRICLE - thinner wall */}
            <group position={[0.63, -0.35, 0.25]} ref={rightVentricleRef}>
                <mesh castShadow rotation={[Math.PI, 0, 0.18]}>
                    <coneGeometry args={[0.65, 1.55, 32]} />
                    <meshPhysicalMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.42}
                        roughness={0.42}
                        transmission={0.60}
                        thickness={0.58}
                    />
                </mesh>
                <mesh position={[0, 0.75, 0]} castShadow>
                    <sphereGeometry args={[0.65, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.42}
                        roughness={0.42}
                        transmission={0.60}
                    />
                </mesh>
                <Html position={[1.55, -1.15, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.93)',
                        padding: '7px 13px',
                        borderRadius: '8px',
                        border: '1px solid rgba(96, 165, 250, 0.65)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#60a5fa' }}>
                            Right Ventricle
                        </div>
                    </div>
                </Html>
            </group>

            {/* AORTA - from LEFT ventricle going UP and RIGHT */}
            <group position={[-0.45, 1.75, 0]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.34, 0.37, 1.4, 24]} />
                    <meshPhysicalMaterial
                        color="#b91c1c"
                        transparent
                        opacity={0.52}
                        roughness={0.24}
                        transmission={0.44}
                        clearcoat={0.72}
                    />
                </mesh>
                <Html position={[-1.15, 2.65, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.93)',
                        padding: '6px 11px',
                        borderRadius: '8px',
                        border: '1px solid rgba(185, 28, 28, 0.55)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#b91c1c' }}>
                            Aorta
                        </div>
                    </div>
                </Html>
            </group>

            {/* PULMONARY ARTERY - from RIGHT ventricle going UP and LEFT */}
            <group position={[0.63, 1.65, 0.28]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.29, 0.32, 1.22, 24]} />
                    <meshPhysicalMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.48}
                        roughness={0.24}
                        transmission={0.48}
                    />
                </mesh>
                <Html position={[-1.05, 2.5, 0]} center>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.93)',
                        padding: '6px 11px',
                        borderRadius: '8px',
                        border: '1px solid rgba(59, 130, 246, 0.55)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#60a5fa' }}>
                            Pulmonary A.
                        </div>
                    </div>
                </Html>
            </group>

            {/* PULMONARY VEINS - entering LEFT atrium from back */}
            <group position={[-0.8, 1.05, -0.5]}>
                <mesh rotation={[0, 0, Math.PI/2]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.35, 16]} />
                    <meshStandardMaterial color="#ef4444" transparent opacity={0.55} />
                </mesh>
            </group>

            {/* SUPERIOR VENA CAVA - entering RIGHT atrium from top */}
            <group position={[0.65, 1.6, 0.05]}>
                <mesh>
                    <cylinderGeometry args={[0.19, 0.19, 0.55, 16]} />
                    <meshStandardMaterial color="#1e40af" transparent opacity={0.52} />
                </mesh>
            </group>

            {/* VALVES with corrected label positions */}
            <HeartValve 
                position={[-0.45, 0.50, 0]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isBicuspidOpen}
                label="Mitral"
                type="AV"
                labelPos="left"
            />
            
            <HeartValve 
                position={[-0.45, 1.30, 0]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isAorticOpen}
                label="Aortic"
                type="SL"
                labelPos="leftTop"
            />
            
            <HeartValve 
                position={[0.63, 0.52, 0.25]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isTricuspidOpen}
                label="Tricuspid"
                type="AV"
                labelPos="right"
            />
            
            <HeartValve 
                position={[0.63, 1.20, 0.28]} 
                rotation={[Math.PI/2, 0, 0]}
                isOpen={isPulmonaryOpen}
                label="Pulmonary"
                type="SL"
                labelPos="rightTop"
            />

            {/* Blood Particles */}
            <instancedMesh ref={oxyParticlesRef} args={[null, null, particleCount]} castShadow>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial color="#ff0000" emissive="#cc0000" emissiveIntensity={0.88} />
            </instancedMesh>
            
            <instancedMesh ref={deoxyParticlesRef} args={[null, null, particleCount]} castShadow>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial color="#4444ff" emissive="#0000cc" emissiveIntensity={0.88} />
            </instancedMesh>

            {/* ===== BLOOD FLOW ARROWS AND LABELS ===== */}
            
            {/* SYSTEMIC CIRCULATION (LEFT HEART - RED) */}
            
            {/* Arrow: Lungs → Pulmonary Veins → Left Atrium */}
            <group position={[-1.1, 1.05, -0.5]}>
                <mesh rotation={[0, 0, Math.PI/2]}>
                    <coneGeometry args={[0.12, 0.35, 8]} />
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
                </mesh>
                <Html position={[0, 0.45, 0]} center>
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        backdropFilter: 'blur(4px)',
                        fontSize: '11px',
                        color: '#fca5a5',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                    }}>
                        From Lungs
                    </div>
                </Html>
            </group>

            {/* Arrow: Left Atrium → Mitral Valve → Left Ventricle */}
            {isBicuspidOpen && (
                <group position={[-0.45, 0.5, 0.8]}>
                    <mesh rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.14, 0.4, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.8} />
                    </mesh>
                    <Html position={[0, -0.5, 0]} center>
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.15)',
                            padding: '3px 7px',
                            borderRadius: '6px',
                            border: '1px solid rgba(74, 222, 128, 0.4)',
                            backdropFilter: 'blur(4px)',
                            fontSize: '10px',
                            color: '#4ade80',
                            whiteSpace: 'nowrap',
                            fontWeight: '700'
                        }}>
                            Filling
                        </div>
                    </Html>
                </group>
            )}

            {/* Arrow: Left Ventricle → Aortic Valve → Aorta */}
            {isAorticOpen && (
                <group position={[-0.45, 1.75, 0.8]}>
                    <mesh>
                        <coneGeometry args={[0.14, 0.4, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.8} />
                    </mesh>
                    <Html position={[0, 0.5, 0]} center>
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.15)',
                            padding: '3px 7px',
                            borderRadius: '6px',
                            border: '1px solid rgba(74, 222, 128, 0.4)',
                            backdropFilter: 'blur(4px)',
                            fontSize: '10px',
                            color: '#4ade80',
                            whiteSpace: 'nowrap',
                            fontWeight: '700'
                        }}>
                            Ejection
                        </div>
                    </Html>
                </group>
            )}

            {/* Arrow: Aorta → Body */}
            <group position={[-0.45, 2.8, 0]}>
                <mesh>
                    <coneGeometry args={[0.12, 0.35, 8]} />
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
                </mesh>
                <Html position={[0, 0.45, 0]} center>
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        backdropFilter: 'blur(4px)',
                        fontSize: '11px',
                        color: '#fca5a5',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                    }}>
                        To Body
                    </div>
                </Html>
            </group>

            {/* PULMONARY CIRCULATION (RIGHT HEART - BLUE) */}
            
            {/* Arrow: Body → Vena Cava → Right Atrium */}
            <group position={[0.65, 2.45, 0.05]}>
                <mesh rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.12, 0.35, 8]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
                </mesh>
                <Html position={[0, -0.45, 0]} center>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        backdropFilter: 'blur(4px)',
                        fontSize: '11px',
                        color: '#93c5fd',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                    }}>
                        From Body
                    </div>
                </Html>
            </group>

            {/* Arrow: Right Atrium → Tricuspid Valve → Right Ventricle */}
            {isTricuspidOpen && (
                <group position={[0.63, 0.52, 1.0]}>
                    <mesh rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.14, 0.4, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.8} />
                    </mesh>
                    <Html position={[0, -0.5, 0]} center>
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.15)',
                            padding: '3px 7px',
                            borderRadius: '6px',
                            border: '1px solid rgba(74, 222, 128, 0.4)',
                            backdropFilter: 'blur(4px)',
                            fontSize: '10px',
                            color: '#4ade80',
                            whiteSpace: 'nowrap',
                            fontWeight: '700'
                        }}>
                            Filling
                        </div>
                    </Html>
                </group>
            )}

            {/* Arrow: Right Ventricle → Pulmonary Valve → Pulmonary Artery */}
            {isPulmonaryOpen && (
                <group position={[0.63, 1.65, 1.0]}>
                    <mesh>
                        <coneGeometry args={[0.14, 0.4, 8]} />
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.8} />
                    </mesh>
                    <Html position={[0, 0.5, 0]} center>
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.15)',
                            padding: '3px 7px',
                            borderRadius: '6px',
                            border: '1px solid rgba(74, 222, 128, 0.4)',
                            backdropFilter: 'blur(4px)',
                            fontSize: '10px',
                            color: '#4ade80',
                            whiteSpace: 'nowrap',
                            fontWeight: '700'
                        }}>
                            Ejection
                        </div>
                    </Html>
                </group>
            )}

            {/* Arrow: Pulmonary Artery → Lungs */}
            <group position={[0.63, 2.65, 0.28]}>
                <mesh>
                    <coneGeometry args={[0.12, 0.35, 8]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
                </mesh>
                <Html position={[0, 0.45, 0]} center>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        backdropFilter: 'blur(4px)',
                        fontSize: '11px',
                        color: '#93c5fd',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                    }}>
                        To Lungs
                    </div>
                </Html>
            </group>

            {/* CIRCULATION PATHWAY SUMMARY (Top indicators) */}
            <Html position={[0, 3.5, 0]} center>
                <div style={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(148, 163, 184, 0.4)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    minWidth: '280px'
                }}>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#fca5a5',
                        borderBottom: '1px solid rgba(252, 165, 165, 0.3)',
                        paddingBottom: '4px'
                    }}>
                        🔴 Systemic Circulation
                    </div>
                    <div style={{
                        fontSize: '10px',
                        color: '#cbd5e1',
                        lineHeight: '1.4'
                    }}>
                        Lungs → Pulm. Veins → LA → Mitral → LV → Aortic → Aorta → Body
                    </div>
                    
                    <div style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#93c5fd',
                        borderBottom: '1px solid rgba(147, 197, 253, 0.3)',
                        paddingBottom: '4px',
                        marginTop: '4px'
                    }}>
                        🔵 Pulmonary Circulation
                    </div>
                    <div style={{
                        fontSize: '10px',
                        color: '#cbd5e1',
                        lineHeight: '1.4'
                    }}>
                        Body → Vena Cava → RA → Tricuspid → RV → Pulm. → Pulm. A. → Lungs
                    </div>
                </div>
            </Html>
        </group>
    );
};

const HeartVisual = (props) => {
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
    
    useEffect(() => {
        if (props.soundVisual && audioInitialized) {
            const soundType = props.soundVisual.includes('LUB') ? 'LUB' : 'DUP';
            playHeartSound(soundType);
        }
    }, [props.soundVisual]);
    
    return (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden relative shadow-2xl">
            <Canvas 
                camera={{ position: [3.4, 0.5, 5.0], fov: 44 }} 
                shadows 
                dpr={[1, 2]}
            >
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 4.5, 15]} />
                
                <ambientLight intensity={0.48} />
                <directionalLight 
                    position={[6, 6, 6]} 
                    intensity={1.6} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[-4.5, 3, 4]} intensity={1.3} color="#fca5a5" />
                <pointLight position={[4.5, 3, 4]} intensity={1.3} color="#60a5fa" />
                <pointLight position={[0, -2.5, 3.5]} intensity={0.75} color="#a855f7" />
                <spotLight 
                    position={[0, 11, 0]} 
                    angle={0.48} 
                    penumbra={1} 
                    intensity={1.5} 
                    castShadow 
                />
                
                <Environment preset="city" />

                <AnatomicalHeart {...props} />

                <OrbitControls
                    enableZoom={true}
                    minDistance={3.0}
                    maxDistance={10}
                    rotateSpeed={0.45}
                    target={[0, 0.25, 0]}
                />
            </Canvas>

            <div className="absolute top-6 right-6 pointer-events-none select-none">
                <div className="bg-slate-900/95 backdrop-blur-md px-6 py-3 rounded-xl border border-indigo-500/40 shadow-xl shadow-indigo-500/20">
                    <div className="text-xs text-slate-400 font-medium mb-1">Cardiac Phase</div>
                    <div className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {props.data.phase}
                    </div>
                </div>
            </div>

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
