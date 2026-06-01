import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { motion } from 'framer-motion'
import { games } from './data/games'
import { MuseumScene } from './components/MuseumScene'
import { ControlPanel } from './components/ControlPanel'
import { InfoPanel } from './components/InfoPanel'
import { MethodologyPanel } from './components/MethodologyPanel'
import { useMuseumStore } from './store/useMuseumStore'
import { getCameraForExhibit } from './utils/exhibitLayout'

function TourController() {
  const isTouring = useMuseumStore((state) => state.isTouring)
  const next = useMuseumStore((state) => state.next)

  useEffect(() => {
    if (!isTouring) return undefined
    const interval = window.setInterval(next, 4200)
    return () => window.clearInterval(interval)
  }, [isTouring, next])

  return null
}

function CameraTargetController() {
  const selectedRank = useMuseumStore((state) => state.selectedRank)
  const cameraMode = useMuseumStore((state) => state.cameraMode)
  const setCameraTarget = useMuseumStore((state) => state.setCameraTarget)

  useEffect(() => {
    if (cameraMode === 'exhibit') {
      setCameraTarget(getCameraForExhibit(selectedRank))
    }
  }, [cameraMode, selectedRank, setCameraTarget])

  return null
}

export default function App() {
  return (
    <main className="app-shell">
      <TourController />
      <CameraTargetController />
      <section className="scene-shell" aria-label="Interactive 3D game sales museum">
        <Canvas
          shadows
          camera={{ position: [0, 8.5, 16], fov: 48, near: 0.1, far: 100 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#05070d']} />
          <fog attach="fog" args={['#05070d', 18, 42]} />
          <Suspense fallback={null}>
            <MuseumScene games={games} />
          </Suspense>
        </Canvas>
        <div className="scene-vignette" />
      </section>

      <motion.header
        className="app-title"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span>Global Game Sales Walkthrough</span>
        <strong>Low-poly data museum</strong>
      </motion.header>

      <ControlPanel />
      <InfoPanel />
      <MethodologyPanel />
    </main>
  )
}
