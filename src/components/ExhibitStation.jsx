import { Html, Text } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useMuseumStore } from '../store/useMuseumStore'
import { CoverCard } from './CoverCard'

export function ExhibitStation({ game, position, isSelected, isVisible }) {
  const selectRank = useMuseumStore((state) => state.selectRank)
  const accentColor = useMemo(() => new THREE.Color(game.accent), [game.accent])
  const opacity = isVisible ? 1 : 0.16

  return (
    <group position={position}>
      <mesh receiveShadow castShadow position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.78, 0.98, 0.72, 6]} />
        <meshStandardMaterial
          color={isSelected ? '#1d2d3b' : '#121722'}
          roughness={0.58}
          metalness={0.18}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0, 0.78, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.83, 0.91, 6]} />
        <meshBasicMaterial color={game.accent} transparent opacity={isSelected ? 0.95 : opacity * 0.55} />
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
        <boxGeometry args={[1.28, 1.72, 0.12]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.42}
          metalness={0.22}
          emissive={accentColor}
          emissiveIntensity={isSelected ? 0.32 : 0.08}
          transparent
          opacity={opacity}
        />
      </mesh>
      {isSelected && (
        <mesh position={[0, 0.08, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[1.18, 1.28, 48]} />
          <meshBasicMaterial color={game.accent} transparent opacity={0.72} />
        </mesh>
      )}
      <Text
        position={[0, 2.66, 0.05]}
        color={isVisible ? '#f7fbff' : '#667086'}
        fontSize={0.22}
        maxWidth={1.95}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {`#${game.rank} ${game.title}`}
      </Text>
      <Text
        position={[0, 2.35, 0.05]}
        color={isVisible ? game.accent : '#667086'}
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
      >
        {game.sales}
      </Text>
      <Html
        position={[0, 1.58, 0.075]}
        transform
        center
        distanceFactor={7.6}
        zIndexRange={[2, 0]}
        style={{ pointerEvents: 'none', opacity }}
      >
        <CoverCard game={game} compact />
      </Html>
    </group>
  )
}
