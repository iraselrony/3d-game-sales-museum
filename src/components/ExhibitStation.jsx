import { Text } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useMuseumStore } from '../store/useMuseumStore'

function CoverFace({ game, isSelected }) {
  return (
    <group position={[0, 1.58, 0.08]}>
      <mesh castShadow>
        <boxGeometry args={[1.36, 1.86, 0.1]} />
        <meshStandardMaterial
          color={game.cover.gradient[0]}
          roughness={0.38}
          metalness={0.28}
          emissive={game.accent}
          emissiveIntensity={isSelected ? 0.2 : 0.06}
        />
      </mesh>
      <mesh position={[0.18, 0.2, 0.065]} rotation-z={-0.35}>
        <boxGeometry args={[1.16, 0.4, 0.035]} />
        <meshBasicMaterial color={game.cover.gradient[1]} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.32, -0.38, 0.07]} rotation-z={0.28}>
        <boxGeometry args={[0.82, 0.28, 0.04]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
      </mesh>
      <mesh position={[0, 0, 0.073]} rotation-z={0.78}>
        <ringGeometry args={[0.34, 0.37, 36]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
      <Text
        position={[-0.34, -0.36, 0.105]}
        color="#ffffff"
        fontSize={0.28}
        anchorX="center"
        anchorY="middle"
      >
        {game.cover.initials}
      </Text>
      <Text
        position={[0.43, 0.68, 0.105]}
        color="#ffffff"
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
      >
        {`#${game.rank}`}
      </Text>
    </group>
  )
}

export function ExhibitStation({ game, position, isSelected, isVisible }) {
  const selectRank = useMuseumStore((state) => state.selectRank)
  const accentColor = useMemo(() => new THREE.Color(game.accent), [game.accent])

  if (!isVisible) {
    return (
      <group position={position}>
        <mesh position={[0, 0.045, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.65, 0.72, 6]} />
          <meshBasicMaterial color="#2d3748" transparent opacity={0.28} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={position}>
      <mesh receiveShadow castShadow position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.78, 0.98, 0.72, 6]} />
        <meshStandardMaterial
          color={isSelected ? '#1d2d3b' : '#121722'}
          roughness={0.58}
          metalness={0.18}
        />
      </mesh>
      <mesh position={[0, 0.78, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.83, 0.91, 6]} />
        <meshBasicMaterial color={game.accent} transparent opacity={isSelected ? 0.95 : 0.46} />
      </mesh>
      <mesh
        castShadow
        position={[0, 1.58, 0]}
        rotation={[0, Math.PI, 0]}
        onClick={(event) => {
          event.stopPropagation()
          if (isVisible) selectRank(game.rank)
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          document.body.style.cursor = isVisible ? 'pointer' : 'not-allowed'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[1.5, 2.02, 0.16]} />
        <meshStandardMaterial
          color="#0d1420"
          roughness={0.42}
          metalness={0.36}
          emissive={accentColor}
          emissiveIntensity={isSelected ? 0.18 : 0.04}
        />
      </mesh>
      <CoverFace game={game} isSelected={isSelected} />
      {isSelected && (
        <mesh position={[0, 0.08, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[1.18, 1.28, 48]} />
          <meshBasicMaterial color={game.accent} transparent opacity={0.72} />
        </mesh>
      )}
      <Text
        position={[0, 2.84, 0.05]}
        color="#f7fbff"
        fontSize={0.22}
        maxWidth={1.95}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {`#${game.rank} ${game.title}`}
      </Text>
      <Text
        position={[0, 2.52, 0.05]}
        color={game.accent}
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
      >
        {game.sales}
      </Text>
    </group>
  )
}
