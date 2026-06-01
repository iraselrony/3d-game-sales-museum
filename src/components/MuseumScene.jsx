import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useMuseumStore } from '../store/useMuseumStore'
import { ExhibitStation } from './ExhibitStation'
import { getExhibitPosition } from '../utils/exhibitLayout'

function CameraRig() {
  const controls = useRef()
  const { camera } = useThree()
  const cameraTarget = useMuseumStore((state) => state.cameraTarget)
  const animatedTarget = useRef(new THREE.Vector3(...cameraTarget.target))

  useEffect(() => {
    const positionTween = gsap.to(camera.position, {
      x: cameraTarget.position[0],
      y: Math.max(cameraTarget.position[1], 1.45),
      z: cameraTarget.position[2],
      duration: 1.25,
      ease: 'power3.inOut',
      overwrite: true,
    })
    const targetTween = gsap.to(animatedTarget.current, {
      x: cameraTarget.target[0],
      y: cameraTarget.target[1],
      z: cameraTarget.target[2],
      duration: 1.25,
      ease: 'power3.inOut',
      overwrite: true,
    })

    return () => {
      positionTween.kill()
      targetTween.kill()
    }
  }, [camera, cameraTarget])

  useFrame(() => {
    camera.position.y = Math.max(camera.position.y, 1.45)
    if (controls.current) {
      controls.current.target.copy(animatedTarget.current)
      controls.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.06}
      minDistance={4}
      maxDistance={24}
      minPolarAngle={0.22}
      maxPolarAngle={Math.PI / 2.08}
      target={[0, 0.8, 0]}
    />
  )
}

function MuseumArchitecture() {
  const wallMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#101522', roughness: 0.86, metalness: 0.08 }),
    [],
  )
  const floorMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0b0f18', roughness: 0.72, metalness: 0.18 }),
    [],
  )

  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} material={floorMaterial}>
        <planeGeometry args={[26, 21, 1, 1]} />
      </mesh>
      <mesh receiveShadow position={[0, 2.2, -8.5]} material={wallMaterial}>
        <boxGeometry args={[24, 4.4, 0.4]} />
      </mesh>
      <mesh receiveShadow position={[-11.8, 2.2, 0]} material={wallMaterial}>
        <boxGeometry args={[0.4, 4.4, 18]} />
      </mesh>
      <mesh receiveShadow position={[11.8, 2.2, 0]} material={wallMaterial}>
        <boxGeometry args={[0.4, 4.4, 18]} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[8.8, 9.05, 8]} />
        <meshStandardMaterial color="#101b2b" roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.055, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.55, 6]} />
        <meshStandardMaterial color="#0d2530" emissive="#062b35" emissiveIntensity={0.35} />
      </mesh>
      {[-8, -4, 0, 4, 8].map((x) => (
        <mesh key={x} position={[x, 0.04, -8.22]}>
          <boxGeometry args={[1.2, 0.08, 0.08]} />
          <meshStandardMaterial color="#28d7ff" emissive="#28d7ff" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  )
}

function Lights({ selectedGame }) {
  const [x, , z] = getExhibitPosition(selectedGame.rank)

  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#6d87b8', '#090b12', 0.95]} />
      <directionalLight
        castShadow
        position={[4, 8, 6]}
        intensity={1.8}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight position={[-7, 6, -6]} angle={0.48} penumbra={0.85} intensity={1.5} distance={15} color="#5fdcff" />
      <spotLight position={[7, 6, 3]} angle={0.52} penumbra={0.85} intensity={1.2} distance={15} color="#9ae8ff" />
      <spotLight
        castShadow
        position={[x, 5.8, z + 1.2]}
        angle={0.38}
        penumbra={0.65}
        intensity={2.35}
        distance={10}
        color={selectedGame.accent}
      />
    </>
  )
}

export function MuseumScene({ games }) {
  const filters = useMuseumStore((state) => state.filters)
  const selectedRank = useMuseumStore((state) => state.selectedRank)
  const selectedGame = useMuseumStore((state) => state.selectedGame())

  return (
    <>
      <CameraRig />
      <Lights selectedGame={selectedGame} />
      <MuseumArchitecture />
      <group>
        {games.map((game) => {
          const visible =
            (filters.platform === 'All' || filters.platform === game.platform) &&
            (filters.era === 'All' || filters.era === game.era) &&
            (filters.region === 'All' || filters.region === game.region)
          return (
            <ExhibitStation
              key={game.rank}
              game={game}
              position={getExhibitPosition(game.rank)}
              isSelected={selectedRank === game.rank}
              isVisible={visible}
            />
          )
        })}
      </group>
      <mesh position={[0, 0.08, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.8, 1.95, 48]} />
        <meshBasicMaterial color={selectedGame.accent} transparent opacity={0.55} />
      </mesh>
    </>
  )
}
