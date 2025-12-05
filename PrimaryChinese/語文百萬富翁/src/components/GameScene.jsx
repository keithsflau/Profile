import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box, Sphere } from '@react-three/drei'

function GameScene({ currentLevel }) {
  const groupRef = useRef()
  const coinRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (coinRef.current) {
      coinRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* 背景光效 */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffd700" />

      {/* 中央金币 */}
      <group ref={coinRef} position={[0, 0, 0]}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ffd700" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#ffed4e"
            emissiveIntensity={0.3}
          />
        </Sphere>
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.3}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {currentLevel}
        </Text>
      </group>

      {/* 周围装饰金币 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <group key={i} position={[x, Math.sin(i) * 0.3, z]}>
            <Box args={[0.3, 0.05, 0.3]}>
              <meshStandardMaterial 
                color="#ffd700" 
                metalness={0.9} 
                roughness={0.1}
              />
            </Box>
          </group>
        )
      })}

      {/* 文字标题 */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
      >
        語文百萬富翁
      </Text>
    </group>
  )
}

export default GameScene

