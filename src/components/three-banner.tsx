import { useEffect, useRef } from "react"
import type * as ThreeNamespace from "three"
import { useTheme } from "@/lib/theme-context"

type Three = typeof ThreeNamespace

function setupScene(THREE: Three, container: HTMLDivElement, isDark: () => boolean) {
  let renderer: ThreeNamespace.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    })
  } catch {
    return () => {}
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
  camera.position.z = 5.2

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "100%"
  renderer.domElement.style.display = "block"
  container.appendChild(renderer.domElement)

  const group = new THREE.Group()
  scene.add(group)

  const shellGeometry = new THREE.IcosahedronGeometry(2.05, 1)
  const shellMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  })
  const shell = new THREE.Mesh(shellGeometry, shellMaterial)
  group.add(shell)

  const coreGeometry = new THREE.IcosahedronGeometry(1.12, 0)
  const coreMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  group.add(core)

  const starCount = 520
  const positions = new Float32Array(starCount * 3)
  for (let index = 0; index < starCount; index += 1) {
    const radius = 3.1 + Math.random() * 4.4
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5
    positions[index * 3 + 2] = radius * Math.cos(phi)
  }
  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const starMaterial = new THREE.PointsMaterial({
    size: 0.045,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  })
  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  const applyTheme = () => {
    const dark = isDark()
    shellMaterial.color.set(dark ? 0x8ab4ff : 0x2f6fed)
    coreMaterial.color.set(dark ? 0xffffff : 0x0f172a)
    starMaterial.color.set(dark ? 0xc7d7ff : 0x64748b)
    shellMaterial.opacity = dark ? 0.55 : 0.42
    coreMaterial.opacity = dark ? 0.28 : 0.22
    starMaterial.opacity = dark ? 0.7 : 0.5
  }
  applyTheme()

  const pointer = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = container.getBoundingClientRect()
    if (bounds.width === 0 || bounds.height === 0) return
    target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
  }
  const handlePointerLeave = () => {
    target.x = 0
    target.y = 0
  }
  container.addEventListener("pointermove", handlePointerMove)
  container.addEventListener("pointerleave", handlePointerLeave)

  const resize = () => {
    const { clientWidth, clientHeight } = container
    if (clientWidth === 0 || clientHeight === 0) return
    renderer.setSize(clientWidth, clientHeight, false)
    camera.aspect = clientWidth / clientHeight
    camera.position.z = clientWidth < 480 ? 6.8 : 5.2
    camera.updateProjectionMatrix()
  }
  resize()

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  let visible = true
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true
    },
    { threshold: 0 }
  )
  visibilityObserver.observe(container)

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  let frame = 0
  let elapsed = 0
  let last = performance.now()

  const renderFrame = () => {
    applyTheme()
    group.rotation.x = pointer.y * 0.24 + elapsed * 0.06
    group.rotation.y = pointer.x * 0.34 + elapsed * 0.12
    core.rotation.x = -elapsed * 0.25
    core.rotation.y = -elapsed * 0.18
    stars.rotation.y = elapsed * 0.03 + pointer.x * 0.1
    stars.rotation.x = pointer.y * 0.06
    renderer.render(scene, camera)
  }

  const animate = (now: number) => {
    frame = requestAnimationFrame(animate)
    const delta = Math.min((now - last) / 1000, 0.1)
    last = now
    if (!visible || document.hidden) return
    elapsed += delta
    pointer.x += (target.x - pointer.x) * 0.05
    pointer.y += (target.y - pointer.y) * 0.05
    renderFrame()
  }

  const start = () => {
    cancelAnimationFrame(frame)
    if (motionQuery.matches) {
      renderFrame()
      return
    }
    last = performance.now()
    frame = requestAnimationFrame(animate)
  }
  start()

  motionQuery.addEventListener("change", start)

  return () => {
    cancelAnimationFrame(frame)
    motionQuery.removeEventListener("change", start)
    resizeObserver.disconnect()
    visibilityObserver.disconnect()
    container.removeEventListener("pointermove", handlePointerMove)
    container.removeEventListener("pointerleave", handlePointerLeave)
    shellGeometry.dispose()
    shellMaterial.dispose()
    coreGeometry.dispose()
    coreMaterial.dispose()
    starGeometry.dispose()
    starMaterial.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}

export function ThreeBanner({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let dispose: () => void = () => {}

    import("three")
      .then((THREE) => {
        if (cancelled) return
        dispose = setupScene(THREE, container, () => themeRef.current === "dark")
      })
      .catch(() => {})

    return () => {
      cancelled = true
      dispose()
    }
  }, [])

  return <div ref={containerRef} aria-hidden className={className} />
}
