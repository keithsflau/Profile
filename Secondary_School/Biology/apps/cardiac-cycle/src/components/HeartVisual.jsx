import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Geometry & Curves ---

// Create a curved path for the Aorta
const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.5, 1.2, 0),
    new THREE.Vector3(0.6, 2.0, 0),
    new THREE.Vector3(0, 2.8, 0),
    new THREE.Vector3(-0.8, 2.5, 0),
    new THREE.Vector3(-1.0, 1.0, 0), // Descending aorta
]);

// Blood Flow Paths
const inflowCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.5, 2.5, 0), // Pulmonary Vein
    new THREE.Vector3(-0.5, 1.8, 0),
    new THREE.Vector3(0, 1.2, 0),    // Atrium Center
    new THREE.Vector3(0, 0.5, 0),    // Mitral Valve
]);

const ventriclePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.5, 0),    // Mitral Valve
    new THREE.Vector3(0, -0.5, 0),   // Ventricle Center
    new THREE.Vector3(0.2, -1.0, 0.2), // Apex swirl
    new THREE.Vector3(0.4, 0, 0),    // Towards Aortic Valve
    new THREE.Vector3(0.5, 1.2, 0),  // Aortic Valve
]);

const outflowCurve = aortaCurve;

// --- Components ---

const HeartTissueMaterial = ({ color = "#ef4444", distort = 0, speed = 1 }) => (
    <MeshDistortMaterial
        color={color}
        roughness={0.4}
        metalness={0.1}
        distort={distort}
        speed={speed} // Animation speed
        clearcoat={0.8}
        clearcoatRoughness={0.2}
    />
);

const MuscleFiberMaterial = ({ color }) => (
    <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.1}
        bumpScale={0.02}
    />
);

const Valve = ({ position, rotation, isOpen, label, scale = 1 }) => {
    // 3-leaflet valve simulation
    const color = "#fbbf24"; // Yellowish tissue
    
    // Animate leaflets
    const groupRef = useRef();
    
    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Smooth opening/closing visualization could go here
    });

    const angle = isOpen ? 1 : 0.2; // Radians to open

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <group ref={groupRef}>
                 {/* Leaflet 1 */}
                 <group rotation={[0, 0, 0]}>
                    <mesh position={[0.4, 0, 0]} rotation={[0, 0, isOpen ? 1.2 : 0.1]}>
                        <coneGeometry args={[0.05, 0.8, 8]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                 </group>
                 {/* Leaflet 2 */}
                 <group rotation={[0, 0, 2.1]}>
                    <mesh position={[0.4, 0, 0]} rotation={[0, 0, isOpen ? 1.2 : 0.1]}>
                        <coneGeometry args={[0.05, 0.8, 8]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                 </group>
                 {/* Leaflet 3 */}
                 <group rotation={[0, 0, -2.1]}>
                    <mesh position={[0.4, 0, 0]} rotation={[0, 0, isOpen ? 1.2 : 0.1]}>
                        <coneGeometry args={[0.05, 0.8, 8]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                 </group>
            </group>
             {/* Ring */}
            <mesh rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[0.5, 0.05, 16, 32]} />
                <meshStandardMaterial color="#b45309" />
            </mesh>
            
             <HtmlLabel position={[1, 0.5, 0]} label={label} isOpen={isOpen} />
        </group>
    );
};

const HtmlLabel = ({ position, label, isOpen }) => (
    <group position={position}>
        <Text
            fontSize={0.2}
            color="white"
            outlineWidth={0.02}
            outlineColor="black"
            anchorX="left"
            anchorY="bottom"
        >
            {label}
        </Text>
        <Text
            position={[0, -0.25, 0]}
            fontSize={0.15}
            color={isOpen ? "#4ade80" : "#f87171"}
            outlineWidth={0.02}
            outlineColor="black"
            anchorX="left"
            anchorY="top"
        >
            {isOpen ? "OPEN" : "CLOSED"}
        </Text>
    </group>
);

const BloodParticles = ({ isBicuspidOpen, isAorticOpen, heartPhase }) => {
    // A system of particles that flow through the heart
    const count = 60;
    const meshRef = useRef();
    
    // Store particle states: { currentPath: 0/1/2, progress: 0-1, speed: 0.01 }
    // 0: Inflow -> Atrium
    // 1: Atrium -> Ventricle (Blocked by Bicuspid)
    // 2: Ventricle -> Aorta (Blocked by Aortic)
    const particleData = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            pathIdx: 0,
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.01,
            offset: new THREE.Vector3((Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3)
        }));
    }, []);

    const dummy = new THREE.Object3D();

    useFrame(() => {
        if (!meshRef.current) return;

        particleData.forEach((p, i) => {
            let pos = new THREE.Vector3();
            let tangent = new THREE.Vector3();

            // Determine Movement Logic based on Valve States
            let moving = true;

            // Logic:
            // Path 0: Pulmonary Vein -> Mitral Valve (Entry). Always flows, but stops at 1.0 if Bicuspid closed
            // Actually, we should allow them to pool at the valve
            if (p.pathIdx === 0) {
                 if (p.progress >= 0.95 && !isBicuspidOpen) {
                     moving = false; // Waiting at Atrium
                     // Jitter while waiting
                     p.progress = 0.95 + Math.sin(Date.now()*0.01 + i)*0.02; 
                 } else if (p.progress >= 1) {
                     p.pathIdx = 1;
                     p.progress = 0;
                 }
            }
            // Path 1: Ventricle Filling -> Ventricle Ejection point
            else if (p.pathIdx === 1) {
                 // During filling (Bicuspid Open), we move into ventricle.
                 // We accumulate in ventricle until Aortic opens.
                 // Ventricle filling happens when Bicuspid IS OPEN.
                 // If Bicuspid closes, particles are trapped in ventricle (Isovolumetric contraction)
                 
                 // If Aortic is CLOSED, stop at 0.8 (approx aortic valve location relative to ventricle path?)
                 // Actually ventriclePath is 0->Mitral, 1->Aortic.
                 
                 if (p.progress >= 0.9 && !isAorticOpen) {
                     moving = false; // Waiting in Ventricle (Isovolumetric Contraction)
                     // Swirl
                     p.progress = 0.9 + Math.sin(Date.now()*0.005 + i)*0.05; 
                 } else if (p.progress >= 1) {
                     p.pathIdx = 2;
                     p.progress = 0;
                 }
            }
            // Path 2: Aorta Ejection
            else if (p.pathIdx === 2) {
                if (p.progress >= 1) {
                    // Respawn at start
                    p.pathIdx = 0;
                    p.progress = 0;
                }
            }

            if (moving) {
                // Boost speed during ejection
                let speedMult = 1;
                if (p.pathIdx === 2) speedMult = 3.0; // Fast ejection
                if (p.pathIdx === 1 && isBicuspidOpen) speedMult = 2.0; // Fast filling
                
                p.progress += p.speed * speedMult;
            }

            // Calculate Position
            let curve;
            let pathIdx = p.pathIdx; // temp var
            
            if (pathIdx === 0) curve = inflowCurve;
            else if (pathIdx === 1) curve = ventriclePath;
            else curve = outflowCurve;

            // Safe progress
            const safeProg = Math.min(Math.max(p.progress, 0), 1);
            
            curve.getPoint(safeProg, pos);
            // curve.getTangent(safeProg, tangent); // If we wanted orientation

            // Add organic offset/jitter
            pos.add(p.offset);

            dummy.position.copy(pos);
            const scale = 0.15;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ff1111" emissive="#990000" emissiveIntensity={0.5} roughness={0.1} />
        </instancedMesh>
    );
};

const HeartModel = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const ventricleRef = useRef();
    const atriumRef = useRef();
    const aortaRef = useRef();

    // Tweak animation parameters based on pressure/volume
    // Ventricle Contraction: Volume decreases -> Geometry Shrinks? 
    // Actually, in muscle contraction, the WALLS thicken, but outer dimension stays roughy similar, Inner volume shrinks.
    // For visualization, we will "squeeze" the shape.
    
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Ventricle Beat
        if (ventricleRef.current) {
            // Squeeze effect based on volume. Low volume = Squeezed.
            // Volume range: 50 (Squeezed) -> 120 (Relaxed)
            // Scale X/Z reduces more than Y
            const contraction = (120 - data.volume) / 70; // 0 (relaxed) to 1 (full squeeze)
            const scaleXZ = 1.0 - (contraction * 0.2); 
            const scaleY  = 1.0 - (contraction * 0.05);
            
            // Add a small jitter for "tension" during isovolumetric phases
            const jitter = (data.phase.includes("Isovolumetric")) ? Math.sin(time * 50) * 0.01 : 0;

            ventricleRef.current.scale.lerp(new THREE.Vector3(scaleXZ + jitter, scaleY + jitter, scaleXZ + jitter), delta * 8);

            // Color
            const pressurenorm = Math.min(data.pressureVentricle / 120, 1);
            ventricleRef.current.material.distort = 0.3 + pressurenorm * 0.2; // More distorted/tense when high pressure
            ventricleRef.current.material.color.lerp(new THREE.Color(pressurenorm > 0.5 ? '#7f1d1d' : '#ef4444'), delta * 2);
        }

        // Atrium Pulse relatively passive
        if (atriumRef.current) {
             const scale = 1.0 + Math.sin(time * 2) * 0.02;
             atriumRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[0, -1, 0]}>
            {/* --- ANATOMY --- */}

            {/* Left Atrium */}
            <group position={[0, 1.8, 0]}>
                <mesh ref={atriumRef}>
                    {/* A rounder, smoother shape for Atrium */}
                    <sphereGeometry args={[0.9, 64, 64]} />
                    <HeartTissueMaterial color="#fca5a5" distort={0.2} speed={2} />
                </mesh>
                <Text position={[1.2, 0, 0]} fontSize={0.3} color="#fca5a5" anchorX="left">Left Atrium</Text>
            </group>

            {/* Connector / Annulus */}
            <mesh position={[0, 1.0, 0]} rotation={[0,0,0]}>
                <cylinderGeometry args={[0.5, 0.7, 0.4, 32]} />
                 <meshStandardMaterial color="#883333" />
            </mesh>

            {/* Left Ventricle */}
            <group position={[0, 0, 0]}>
                <mesh ref={ventricleRef} position={[0, -0.2, 0]}>
                    {/* Elongated sphere/capsule for ventricle */}
                    <sphereGeometry args={[1.2, 64, 64]} />
                    {/* Distort material gives the "muscle" look */}
                    <HeartTissueMaterial color="#ef4444" distort={0.3} speed={3} />
                </mesh>
                 <Text position={[1.4, 0, 0]} fontSize={0.3} color="#ef4444" anchorX="left">Left Ventricle</Text>
            </group>

            {/* Aorta Arch */}
            <group position={[0,0,0]}>
                <mesh>
                    <tubeGeometry args={[aortaCurve, 64, 0.45, 32, false]} />
                    <HeartTissueMaterial color="#b91c1c" distort={0.1} speed={1} />
                </mesh>
                 <Text position={[1.0, 2.5, 0]} fontSize={0.3} color="#b91c1c" anchorX="left">Aorta</Text>
            </group>

            {/* Pulmonary Veins (Visual Only) */}
            <mesh position={[-1.2, 2.2, 0]} rotation={[0, 0, 1]}>
                <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
                <meshStandardMaterial color="#3b82f6" />
                <Text position={[-0.8, 0, 0]} rotation={[0,0,-1]} fontSize={0.2} color="#93c5fd">Pulmonary Vein</Text>
            </mesh>


            {/* --- VALVES --- */}
            {/* Mitral Valve: Between Atrium (1.8y) and Ventricle (0y). Approx at 0.9y */}
            <Valve 
                position={[0, 0.9, 0]} 
                rotation={[0, 0, Math.PI]} // Downward flow
                isOpen={isBicuspidOpen} 
                label="Bicuspid (Mitral)" 
                scale={1.2}
            />

            {/* Aortic Valve: Entrance to Aorta. At approx [0.5, 1.2, 0] based on curve */}
            <Valve 
                position={[0.5, 1.2, 0]} 
                rotation={[0, 0, -0.5]} 
                isOpen={isAorticOpen} 
                label="Aortic Valve" 
            />

            {/* --- SYSTEMS --- */}
            <BloodParticles 
                isBicuspidOpen={isBicuspidOpen} 
                isAorticOpen={isAorticOpen}
                heartPhase={data.phase}
            />

            {/* Sound FX */}
            {soundVisual && <SoundEffects text={soundVisual} />}
            
        </group>
    );
};

const SoundEffects = ({ text }) => {
    return (
        <Float speed={10} rotationIntensity={0} floatIntensity={0}>
             <Text
                position={[0, 0, 2]}
                fontSize={1}
                color="#fbbf24"
                outlineWidth={0.05}
                outlineColor="#78350f"
                characters="LUBDUP"
            >
                {text.split(" ")[0]}
            </Text>
        </Float>
    )
}

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden relative shadow-inner shadow-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }} shadows dpr={[1, 2]}>
                <fog attach="fog" args={['#020617', 5, 20]} />
                
                {/* Lighting Environment */}
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#ffd6d6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" /> {/* Rim light */}
                <Environment preset="night" />

                <HeartModel {...props} />

                <OrbitControls 
                    enableZoom={false} 
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 1.5}
                    rotateSpeed={0.5}
                />
            </Canvas>

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="text-white/90 font-bold text-lg tracking-wide drop-shadow-md">3D Heart Simulation</div>
                <div className="text-slate-400 text-xs font-mono">Interactive View</div>
            </div>
            
            {/* Legend for particles */}
            <div className="absolute bottom-4 left-4 pointer-events-none select-none bg-slate-900/80 p-2 rounded border border-slate-700">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                    Oxygenated Blood Flow
                </div>
            </div>
        </div>
    );
};

export default HeartVisual;
