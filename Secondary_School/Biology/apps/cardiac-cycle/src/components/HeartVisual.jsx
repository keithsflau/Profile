import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const HeartModel = ({ data, isBicuspidOpen, isAorticOpen, soundVisual }) => {
    const ventricleRef = useRef();
    const atriumRef = useRef();
    const aortaRef = useRef();

    // Lerp factors for smooth animation
    const lerpSpeed = 10;

    useFrame((state, delta) => {
        // Ventricle Pulse (Scale)
        // Volume 50-120 -> Scale 1.0 - 1.3
        const targetScale = 0.9 + (data.volume / 120) * 0.3;
        if (ventricleRef.current) {
            ventricleRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * lerpSpeed);

            // Color: Darker red when high pressure
            // P 0-120
            const pressureIntensity = Math.min(data.pressureVentricle / 130, 1);
            // Relaxed: #ff6b6b (Light Red), Contracted: #7f1d1d (Deep Red)
            const colorRelaxed = new THREE.Color('#ff5555');
            const colorContracted = new THREE.Color('#990000');
            ventricleRef.current.material.color.lerp(colorRelaxed.clone().lerp(colorContracted, pressureIntensity), delta * 5);
        }

        // Atrium Pulse (Inverse slightly for visual effect)
        if (atriumRef.current) {
            // Atrium fills when ventricle empties? Simplified visual
            // const atriumScale = 1.0 - (data.volume/240); // Slight counter pulse
            // atriumRef.current.scale.lerp(new THREE.Vector3(atriumScale, atriumScale, atriumScale), delta * 5);
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            {/* Ambient Label */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <group>
                    {/* Left Atrium */}
                    <Sphere ref={atriumRef} args={[0.9, 32, 32]} position={[0, 1.6, 0]}>
                        <meshStandardMaterial color="#3b82f6" metalness={0.1} roughness={0.2} transparent opacity={0.9} />
                    </Sphere>
                    <Text position={[0, 2.8, 0]} fontSize={0.2} color="#1e3a8a">Left Atrium</Text>

                    {/* Left Ventricle */}
                    <Sphere ref={ventricleRef} args={[1.1, 32, 32]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#ef4444" metalness={0.2} roughness={0.3} />
                    </Sphere>
                    <Text position={[0, -1.5, 0]} fontSize={0.2} color="#7f1d1d">Left Ventricle</Text>

                    {/* Aorta */}
                    <group position={[1.2, 1.5, 0]} rotation={[0, 0, -0.5]}>
                        <Cylinder ref={aortaRef} args={[0.5, 0.5, 2.5, 32]}>
                            <meshStandardMaterial color="#ef4444" metalness={0.1} roughness={0.2} />
                        </Cylinder>
                        <Text position={[0, 1.5, 0]} rotation={[0, 0, 0.5]} fontSize={0.2} color="#b91c1c">Aorta</Text>
                    </group>

                    {/* Mitral Valve (Between Atrium and Ventricle) */}
                    <Valve
                        position={[0, 0.9, 0]}
                        isOpen={isBicuspidOpen}
                        label="Mitral Valve"
                        color="#ffffff"
                    />

                    {/* Aortic Valve (Between Ventricle and Aorta) */}
                    {/* Visual trick: Place it near the aorta base */}
                    <Valve
                        position={[0.7, 0.7, 0]}
                        rotation={[0, 0, -0.6]}
                        isOpen={isAorticOpen}
                        label="Semilunar Valve"
                        labelOffset={[0.5, 0.5, 0]}
                        color="#fbbf24"
                    />
                </group>
            </Float>

            {/* Sound Effects Explosion */}
            {soundVisual && (
                <SoundExplosion text={soundVisual} />
            )}
        </group>
    );
};

const Valve = ({ position, rotation = [0, 0, 0], isOpen, label, labelOffset = [0.8, 0, 0], color }) => {
    // A simple representation: Two flaps
    // Closed: Flat horizontal
    // Open: Rotated 60-90 degrees
    const angle = isOpen ? Math.PI / 2.5 : 0;

    return (
        <group position={position} rotation={rotation}>
            {/* Text Label Line */}
            <group position={labelOffset}>
                <Text fontSize={0.15} color="black" anchorX="left">{label}</Text>
                <Text fontSize={0.1} position={[0, -0.15, 0]} color={isOpen ? "green" : "red"} anchorX="left">
                    {isOpen ? "OPEN" : "CLOSED"}
                </Text>
            </group>

            {/* Flap 1 */}
            <group position={[-0.05, 0, 0]}>
                <mesh rotation={[0, 0, -angle]}>
                    <boxGeometry args={[0.3, 0.05, 0.3]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            </group>
            {/* Flap 2 */}
            <group position={[0.05, 0, 0]}>
                <mesh rotation={[0, 0, angle]}>
                    <boxGeometry args={[0.3, 0.05, 0.3]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            </group>
        </group>
    )
}

const SoundExplosion = ({ text }) => {
    // A text that scales up and fades
    // We can rely on key prop to reset state when text changes
    const textRef = useRef();
    useFrame((state, delta) => {
        if (textRef.current) {
            textRef.current.scale.x += delta * 5;
            textRef.current.scale.y += delta * 5;
            textRef.current.scale.z += delta * 5;
            textRef.current.material.opacity = Math.max(0, textRef.current.material.opacity - delta * 2);
        }
    });

    return (
        <Text
            ref={textRef}
            position={[0, 0, 1.5]}
            fontSize={0.8}
            color="white"
            outlineWidth={0.05}
            outlineColor="black"
            font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Default font or similar
        >
            {text.split(" ")[0]} {/* Just "LUB" or "DUP" */}
            <meshBasicMaterial transparent opacity={1} />
        </Text>
    )
}

const HeartVisual = (props) => {
    return (
        <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows>
                <color attach="background" args={['#0f172a']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, -10]} angle={0.3} intensity={0.5} />

                <HeartModel {...props} />

                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={2 * Math.PI / 3} />
                <Environment preset="city" />
            </Canvas>

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <div className="text-white font-bold text-shadow">3D Visualization</div>
                <div className="text-slate-400 text-xs">Interact: Rotate (Drag)</div>
            </div>
        </div>
    );
};

export default HeartVisual;
