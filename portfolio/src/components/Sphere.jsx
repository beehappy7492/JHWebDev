/**
 * Background particle field that spells "WELCOME".
 * Particle home positions are sampled from canvas-rendered text.
 * Mouse repels nearby particles; they spring back to letter shapes.
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const REPEL_R = 0.9
const REPEL_F = 0.065
const SPRING  = 0.038
const DAMPING = 0.86

/** Sample pixel positions from canvas text, return as Three.js world coords. */
function sampleText(halfW, halfH) {
  // Tall canvas — Bebas Neue has generous ascenders
  const CW = 1800, CH = 420
  const cv  = document.createElement('canvas')
  cv.width  = CW
  cv.height = CH
  const ctx = cv.getContext('2d')

  ctx.fillStyle    = '#fff'
  // Bebas Neue: all-caps, wide, impactful display face
  ctx.font         = `360px 'Bebas Neue', Impact, sans-serif`
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('WELCOME', CW / 2, CH / 2)

  const data   = ctx.getImageData(0, 0, CW, CH).data
  const stride = 6
  const pts    = []

  // yOffset pushes the cloud into the lower third of the viewport
  // so it doesn't compete with the main content at the top
  const yOffset = -halfH * 0.48

  for (let y = 0; y < CH; y += stride) {
    for (let x = 0; x < CW; x += stride) {
      if (data[(y * CW + x) * 4 + 3] > 128) {
        const jx = (Math.random() - 0.5) * stride * 0.7
        const jy = (Math.random() - 0.5) * stride * 0.7
        // X spans ~90 % of viewport width; Y covers ~80 % of half-height
        const wx = ((x + jx) / CW - 0.5) * halfW * 1.82
        const wy = yOffset + (0.5 - (y + jy) / CH) * halfH * 0.82
        const wz = (Math.random() - 0.5) * 0.28
        pts.push([wx, wy, wz])
      }
    }
  }

  // Shuffle so any subsampling stays spatially even across all letters
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pts[i], pts[j]] = [pts[j], pts[i]]
  }

  return pts
}

export default function Sphere() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let raf
    let cancelled  = false
    let cleanupFn  = null

    document.fonts.ready.then(() => {
      if (cancelled || !mountRef.current) return

      const W = el.clientWidth
      const H = el.clientHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)
      el.appendChild(renderer.domElement)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
      camera.position.z = 4.5

      const halfH = Math.tan(THREE.MathUtils.degToRad(55 / 2)) * 4.5
      const halfW = halfH * (W / H)

      // ── Build particle data from sampled letter positions ──────────────
      const pts   = sampleText(halfW, halfH)
      const COUNT = pts.length

      const positions  = new Float32Array(COUNT * 3)
      const homePos    = new Float32Array(COUNT * 3)
      const velocities = new Float32Array(COUNT * 3)
      const colors     = new Float32Array(COUNT * 3)

      for (let i = 0; i < COUNT; i++) {
        const [x, y, z] = pts[i]
        const ix = i * 3
        positions[ix]     = x
        positions[ix + 1] = y
        positions[ix + 2] = z
        homePos[ix]       = x
        homePos[ix + 1]   = y
        homePos[ix + 2]   = z

        // Depth-based blue-white tint
        const t = Math.max(0, Math.min(1, (z + 0.14) / 0.28))
        colors[ix]     = 0.55 + t * 0.45
        colors[ix + 1] = 0.60 + t * 0.40
        colors[ix + 2] = 0.78 + t * 0.22
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))

      const mat = new THREE.PointsMaterial({
        size: 0.025,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
      })

      scene.add(new THREE.Points(geo, mat))

      // ── Mouse → world z=0 plane ────────────────────────────────────────
      const mouse3D   = new THREE.Vector3(0, 0, 0)
      const mouseNorm = new THREE.Vector2(0, 0)
      const raycaster = new THREE.Raycaster()
      const zPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

      const onMouseMove = (e) => {
        mouseNorm.x =  (e.clientX / window.innerWidth)  * 2 - 1
        mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(mouseNorm, camera)
        raycaster.ray.intersectPlane(zPlane, mouse3D)
      }
      window.addEventListener('mousemove', onMouseMove)

      const onResize = () => {
        const w = el.clientWidth, h = el.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      // ── Animation loop ─────────────────────────────────────────────────
      const pos = geo.attributes.position.array

      const tick = () => {
        raf = requestAnimationFrame(tick)

        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3
          const px = pos[ix],     py = pos[ix + 1], pz = pos[ix + 2]
          const hx = homePos[ix], hy = homePos[ix + 1], hz = homePos[ix + 2]

          // Spring toward home
          velocities[ix]     += (hx - px) * SPRING
          velocities[ix + 1] += (hy - py) * SPRING
          velocities[ix + 2] += (hz - pz) * SPRING

          // Mouse repulsion (XY only)
          const dx   = px - mouse3D.x
          const dy   = py - mouse3D.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_R && dist > 0.001) {
            const force = (1 - dist / REPEL_R) * REPEL_F
            velocities[ix]     += (dx / dist) * force
            velocities[ix + 1] += (dy / dist) * force
          }

          velocities[ix]     *= DAMPING
          velocities[ix + 1] *= DAMPING
          velocities[ix + 2] *= DAMPING

          pos[ix]     += velocities[ix]
          pos[ix + 1] += velocities[ix + 1]
          pos[ix + 2] += velocities[ix + 2]
        }

        geo.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
      }
      tick()

      cleanupFn = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        geo.dispose()
        mat.dispose()
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    })

    return () => {
      cancelled = true
      if (cleanupFn) cleanupFn()
      else cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
