import { useEffect, useRef, useState } from "react"
import type * as ThreeNamespace from "three"
import { bugs } from "@/data/profile"
import { useTheme } from "@/lib/theme-context"

type Three = typeof ThreeNamespace
type OutlineEffectModule = typeof import("three/examples/jsm/effects/OutlineEffect.js")

const PALETTE = {
  body: 0x1fa9a0,
  bodyDark: 0x15807a,
  belly: 0xfff2d6,
  crest: 0xffc233,
  beak: 0xe8503a,
  eye: 0xfffdf6,
  pupil: 0x1a1410,
  bark: 0x8a5a2b,
  barkDark: 0x6b4520,
  chip: 0xd9a05b,
  leaf: 0x2f9e57,
  bugShell: 0x3d2f6b,
  bugWing: 0xe8503a,
}

function buildScene(
  THREE: Three,
  OutlineEffect: OutlineEffectModule["OutlineEffect"],
  container: HTMLDivElement,
  onBugFreed: () => void
) {
  let renderer: ThreeNamespace.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  } catch {
    return null
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "100%"
  renderer.domElement.style.display = "block"
  renderer.domElement.style.touchAction = "manipulation"
  container.appendChild(renderer.domElement)

  const outline = new OutlineEffect(renderer, {
    defaultThickness: 0.005,
    defaultColor: [0.1, 0.08, 0.06],
    defaultAlpha: 1,
  })

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0.3, 0.4, 9.2)

  const steps = new Uint8Array([90, 160, 215, 255])
  const gradient = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat)
  gradient.minFilter = THREE.NearestFilter
  gradient.magFilter = THREE.NearestFilter
  gradient.generateMipmaps = false
  gradient.needsUpdate = true

  const disposables: { dispose: () => void }[] = [gradient]
  const toon = (color: number) => {
    const material = new THREE.MeshToonMaterial({ color, gradientMap: gradient })
    disposables.push(material)
    return material
  }
  const geo = <T extends ThreeNamespace.BufferGeometry>(geometry: T) => {
    disposables.push(geometry)
    return geometry
  }

  scene.add(new THREE.AmbientLight(0xffffff, 1.2))
  const keyLight = new THREE.DirectionalLight(0xffffff, 2)
  keyLight.position.set(3, 5, 6)
  scene.add(keyLight)
  const rimLight = new THREE.DirectionalLight(0xffd9a0, 0.85)
  rimLight.position.set(-5, 2, -3)
  scene.add(rimLight)

  const world = new THREE.Group()
  scene.add(world)

  const trunk = new THREE.Group()
  trunk.position.set(-1.95, 0, 0)
  world.add(trunk)

  trunk.add(new THREE.Mesh(geo(new THREE.CylinderGeometry(0.95, 1.05, 10, 18)), toon(PALETTE.bark)))

  const ringGeometry = geo(new THREE.TorusGeometry(0.99, 0.06, 6, 20, Math.PI * 1.05))
  for (let index = 0; index < 5; index += 1) {
    const ring = new THREE.Mesh(ringGeometry, toon(PALETTE.barkDark))
    ring.position.y = -3.4 + index * 1.75
    ring.rotation.x = Math.PI / 2
    ring.rotation.z = index * 1.3
    trunk.add(ring)
  }

  const holeGeometry = geo(new THREE.CircleGeometry(0.26, 12))
  const holeMaterial = toon(0x2c1c0c)
  for (const [y, z] of [
    [1.55, 0.98],
    [-0.7, 0.96],
    [-2.4, 0.94],
  ]) {
    const hole = new THREE.Mesh(holeGeometry, holeMaterial)
    hole.position.set(0, y, z)
    hole.scale.set(1, 1.25, 1)
    trunk.add(hole)
  }

  const branch = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.16, 0.24, 2.1, 8)), toon(PALETTE.barkDark))
  branch.position.set(0.78, 3.1, 0.1)
  branch.rotation.z = -Math.PI / 3
  trunk.add(branch)

  const leafGeometry = geo(new THREE.SphereGeometry(0.44, 10, 8))
  const leaves: ThreeNamespace.Mesh[] = []
  for (const [x, y, z, scale] of [
    [1.62, 3.78, 0.28, 0.95],
    [2.06, 3.44, -0.12, 0.72],
    [1.3, 4.16, -0.18, 0.6],
  ]) {
    const leaf = new THREE.Mesh(leafGeometry, toon(PALETTE.leaf))
    leaf.position.set(x, y, z)
    leaf.scale.setScalar(scale)
    leaf.scale.y *= 0.72
    trunk.add(leaf)
    leaves.push(leaf)
  }

  const bird = new THREE.Group()
  bird.position.set(-0.68, 0.4, 0.6)
  world.add(bird)

  const body = new THREE.Mesh(geo(new THREE.SphereGeometry(0.78, 20, 16)), toon(PALETTE.body))
  body.scale.set(0.86, 1.12, 0.86)
  bird.add(body)

  const belly = new THREE.Mesh(geo(new THREE.SphereGeometry(0.56, 18, 14)), toon(PALETTE.belly))
  belly.scale.set(0.82, 1.02, 0.62)
  belly.position.set(0.3, -0.1, 0.36)
  bird.add(belly)

  const wing = new THREE.Mesh(geo(new THREE.SphereGeometry(0.46, 14, 12)), toon(PALETTE.bodyDark))
  wing.scale.set(0.42, 1, 0.72)
  wing.position.set(-0.26, 0.02, 0.42)
  wing.rotation.z = 0.32
  bird.add(wing)

  const tail = new THREE.Mesh(geo(new THREE.ConeGeometry(0.34, 1.35, 6)), toon(PALETTE.bodyDark))
  tail.position.set(-0.26, -0.92, -0.16)
  tail.rotation.set(-0.3, 0, 0.42)
  bird.add(tail)

  const footGeometry = geo(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 6))
  for (const y of [-0.24, -0.66]) {
    const foot = new THREE.Mesh(footGeometry, toon(PALETTE.crest))
    foot.position.set(-0.6, y, 0.08)
    foot.rotation.z = Math.PI / 2.1
    bird.add(foot)
  }

  const head = new THREE.Group()
  head.position.set(0.08, 0.86, 0.06)
  bird.add(head)

  const skull = new THREE.Mesh(geo(new THREE.SphereGeometry(0.55, 20, 16)), toon(PALETTE.body))
  skull.scale.set(0.94, 0.96, 0.9)
  head.add(skull)

  const cheek = new THREE.Mesh(geo(new THREE.SphereGeometry(0.33, 14, 12)), toon(PALETTE.belly))
  cheek.scale.set(0.72, 0.8, 0.5)
  cheek.position.set(0.26, -0.12, 0.3)
  head.add(cheek)

  const crestGeometry = geo(new THREE.ConeGeometry(0.17, 0.62, 6))
  for (const [x, y, tilt, scale] of [
    [-0.16, 0.5, 0.5, 0.9],
    [0.05, 0.58, 0.12, 1.1],
    [0.26, 0.48, -0.3, 0.82],
  ]) {
    const spike = new THREE.Mesh(crestGeometry, toon(PALETTE.crest))
    spike.position.set(x, y, -0.02)
    spike.rotation.z = tilt
    spike.scale.setScalar(scale)
    head.add(spike)
  }

  const beak = new THREE.Mesh(geo(new THREE.ConeGeometry(0.17, 1.02, 7)), toon(PALETTE.beak))
  beak.position.set(-0.62, -0.06, 0.12)
  beak.rotation.z = Math.PI / 2
  head.add(beak)

  const eyeWhite = new THREE.Mesh(geo(new THREE.SphereGeometry(0.2, 14, 12)), toon(PALETTE.eye))
  eyeWhite.position.set(-0.12, 0.16, 0.42)
  eyeWhite.scale.z = 0.62
  head.add(eyeWhite)

  const pupil = new THREE.Mesh(geo(new THREE.SphereGeometry(0.1, 12, 10)), toon(PALETTE.pupil))
  pupil.position.set(-0.2, 0.14, 0.55)
  pupil.scale.z = 0.5
  head.add(pupil)

  const chipGeometry = geo(new THREE.TetrahedronGeometry(0.13))
  const chipMaterial = toon(PALETTE.chip)
  const CHIP_COUNT = 24
  const chips = new THREE.InstancedMesh(chipGeometry, chipMaterial, CHIP_COUNT)
  chips.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  chips.frustumCulled = false
  world.add(chips)

  const chipState = Array.from({ length: CHIP_COUNT }, () => ({
    life: 0,
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    spin: new THREE.Vector3(),
    rotation: new THREE.Euler(),
  }))
  const dummy = new THREE.Object3D()
  let chipCursor = 0

  const parkChip = (index: number) => {
    dummy.position.set(0, -999, 0)
    dummy.scale.setScalar(0.0001)
    dummy.updateMatrix()
    chips.setMatrixAt(index, dummy.matrix)
  }
  for (let index = 0; index < CHIP_COUNT; index += 1) parkChip(index)
  chips.instanceMatrix.needsUpdate = true

  const bugShellGeometry = geo(new THREE.SphereGeometry(0.26, 14, 12))
  const bugHeadGeometry = geo(new THREE.SphereGeometry(0.15, 12, 10))
  const bugWingGeometry = geo(new THREE.SphereGeometry(0.22, 12, 10))
  const bugLegGeometry = geo(new THREE.CylinderGeometry(0.03, 0.03, 0.34, 5))
  const bugShellMaterial = toon(PALETTE.bugShell)
  const bugWingMaterial = toon(PALETTE.bugWing)
  const bugEyeMaterial = toon(PALETTE.eye)

  const makeBug = () => {
    const group = new THREE.Group()
    const shell = new THREE.Mesh(bugShellGeometry, bugShellMaterial)
    shell.scale.set(1.25, 0.85, 1)
    group.add(shell)

    const bugHead = new THREE.Mesh(bugHeadGeometry, bugShellMaterial)
    bugHead.position.set(-0.3, 0.05, 0)
    group.add(bugHead)

    for (const side of [-1, 1]) {
      const bugEye = new THREE.Mesh(geo(new THREE.SphereGeometry(0.05, 8, 6)), bugEyeMaterial)
      bugEye.position.set(-0.38, 0.1, side * 0.08)
      group.add(bugEye)

      const bugWing = new THREE.Mesh(bugWingGeometry, bugWingMaterial)
      bugWing.scale.set(0.9, 0.28, 0.6)
      bugWing.position.set(0.06, 0.2, side * 0.16)
      bugWing.rotation.z = side * 0.25
      group.add(bugWing)

      for (const offset of [-0.16, 0.06, 0.24]) {
        const leg = new THREE.Mesh(bugLegGeometry, bugShellMaterial)
        leg.position.set(offset, -0.16, side * 0.22)
        leg.rotation.x = side * 0.7
        group.add(leg)
      }
    }

    group.visible = false
    group.scale.setScalar(0.001)
    world.add(group)
    return group
  }

  const BUG_POOL = 3
  const bugMeshes = Array.from({ length: BUG_POOL }, makeBug)
  const bugState = Array.from({ length: BUG_POOL }, () => ({
    life: 0,
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
  }))
  let bugCursor = 0

  const holeFlash = new THREE.Mesh(
    geo(new THREE.CircleGeometry(0.34, 14)),
    toon(0x2c1c0c)
  )
  holeFlash.position.set(-1.02, 1.22, 1)
  holeFlash.visible = false
  world.add(holeFlash)

  let peckPhase = 0
  let pecking = false
  let peckStrikes = 0
  let strikesUntilBug = 3
  let nextAutoPeck = 3.2
  let blink = 0
  let nextBlink = 3
  let shake = 0

  const beakTip = () => new THREE.Vector3(-1.28, bird.position.y + 0.8, 0.66)

  const spawnChips = () => {
    const origin = beakTip()
    for (let burst = 0; burst < 5; burst += 1) {
      const chip = chipState[chipCursor]
      chipCursor = (chipCursor + 1) % CHIP_COUNT
      chip.life = 1
      chip.position.copy(origin)
      chip.velocity.set(-1.3 - Math.random() * 1.7, 1.1 + Math.random() * 2.3, (Math.random() - 0.5) * 2.2)
      chip.spin.set(Math.random() * 9, Math.random() * 9, Math.random() * 9)
      chip.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6)
    }
  }

  const releaseBug = () => {
    const origin = beakTip()
    const index = bugCursor
    bugCursor = (bugCursor + 1) % BUG_POOL
    const state = bugState[index]
    state.life = 1
    state.position.copy(origin).add(new THREE.Vector3(-0.1, 0.05, 0.12))
    state.velocity.set(1.5 + Math.random() * 0.7, 1.5 + Math.random() * 0.6, 0.35 + Math.random() * 0.5)
    bugMeshes[index].visible = true
    holeFlash.position.copy(origin).add(new THREE.Vector3(0.24, 0, 0.28))
    holeFlash.visible = true
    onBugFreed()
  }

  const startPecking = (strikes: number) => {
    if (pecking) {
      peckStrikes = Math.min(peckStrikes + strikes, 10)
      return
    }
    pecking = true
    peckPhase = 0
    peckStrikes = strikes
  }

  const handlePointerDown = () => startPecking(3)
  container.addEventListener("pointerdown", handlePointerDown)

  const pointerTarget = { x: 0, y: 0 }
  const pointer = { x: 0, y: 0 }
  const handlePointerMove = (event: PointerEvent) => {
    const bounds = container.getBoundingClientRect()
    if (bounds.width === 0 || bounds.height === 0) return
    pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
  }
  const handlePointerLeave = () => {
    pointerTarget.x = 0
    pointerTarget.y = 0
  }
  container.addEventListener("pointermove", handlePointerMove)
  container.addEventListener("pointerleave", handlePointerLeave)

  const resize = () => {
    const { clientWidth, clientHeight } = container
    if (clientWidth === 0 || clientHeight === 0) return
    renderer.setSize(clientWidth, clientHeight, false)
    outline.setSize(clientWidth, clientHeight)
    camera.aspect = clientWidth / clientHeight
    const compact = clientWidth < 520
    camera.position.set(0, 1.05, compact ? 8.4 : 7.2)
    camera.lookAt(0, 0.75, 0)
    world.position.x = 1.32
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
  let clock = performance.now()
  let elapsed = 0

  const step = (delta: number) => {
    elapsed += delta

    if (!pecking) {
      nextAutoPeck -= delta
      if (nextAutoPeck <= 0) {
        startPecking(3)
        nextAutoPeck = 4.5 + Math.random() * 3.5
      }
    }

    if (pecking) {
      const previous = peckPhase
      peckPhase += delta * 13
      if (Math.floor(peckPhase / Math.PI) > Math.floor(previous / Math.PI)) {
        spawnChips()
        shake = 1
        strikesUntilBug -= 1
        if (strikesUntilBug <= 0) {
          releaseBug()
          strikesUntilBug = 3
        }
        peckStrikes -= 1
        if (peckStrikes <= 0) {
          pecking = false
          peckPhase = 0
        }
      }
    }

    const lunge = pecking ? Math.max(0, Math.sin(peckPhase)) : 0
    head.rotation.z = -lunge * 0.62
    head.position.x = 0.08 - lunge * 0.24
    bird.position.y = 0.4 + Math.sin(elapsed * 1.7) * 0.055 - lunge * 0.06

    shake = Math.max(0, shake - delta * 5)
    trunk.position.x = -1.95 + Math.sin(elapsed * 70) * 0.05 * shake
    for (const leaf of leaves) leaf.rotation.z = Math.sin(elapsed * 60) * 0.22 * shake
    holeFlash.visible = shake > 0.05

    nextBlink -= delta
    if (nextBlink <= 0) {
      blink = 0.16
      nextBlink = 2.4 + Math.random() * 3.6
    }
    if (blink > 0) blink -= delta
    eyeWhite.scale.y = blink > 0 ? 0.12 : 1
    pupil.scale.y = blink > 0 ? 0.12 : 1

    pointer.x += (pointerTarget.x - pointer.x) * 0.06
    pointer.y += (pointerTarget.y - pointer.y) * 0.06
    world.rotation.y = pointer.x * 0.22
    world.rotation.x = pointer.y * 0.09
    tail.rotation.z = 0.42 + Math.sin(elapsed * 2.3) * 0.08

    let anyChip = false
    for (let index = 0; index < CHIP_COUNT; index += 1) {
      const chip = chipState[index]
      if (chip.life <= 0) continue
      anyChip = true
      chip.life -= delta * 0.85
      chip.velocity.y -= delta * 7.5
      chip.position.addScaledVector(chip.velocity, delta)
      chip.rotation.x += chip.spin.x * delta
      chip.rotation.y += chip.spin.y * delta
      chip.rotation.z += chip.spin.z * delta

      if (chip.life <= 0) {
        parkChip(index)
        continue
      }
      dummy.position.copy(chip.position)
      dummy.rotation.copy(chip.rotation)
      dummy.scale.setScalar(chip.life * 1.1)
      dummy.updateMatrix()
      chips.setMatrixAt(index, dummy.matrix)
    }
    if (anyChip) chips.instanceMatrix.needsUpdate = true

    for (let index = 0; index < BUG_POOL; index += 1) {
      const state = bugState[index]
      const mesh = bugMeshes[index]
      if (state.life <= 0) {
        if (mesh.visible) mesh.visible = false
        continue
      }
      state.life -= delta * 0.34
      state.velocity.y -= delta * 0.9
      state.position.addScaledVector(state.velocity, delta)

      mesh.position.copy(state.position)
      mesh.position.y += Math.sin(elapsed * 16 + index) * 0.06
      mesh.rotation.z = 0.35 + Math.sin(elapsed * 14 + index) * 0.22
      mesh.rotation.y = elapsed * 1.4
      mesh.scale.setScalar(Math.min(1, (1 - state.life) * 6) * Math.max(state.life, 0) * 1.25)
      if (state.life <= 0) mesh.visible = false
    }
  }

  const render = () => outline.render(scene, camera)

  const animate = (now: number) => {
    frame = requestAnimationFrame(animate)
    const delta = Math.min((now - clock) / 1000, 0.05)
    clock = now
    if (!visible || document.hidden) return
    step(delta)
    render()
  }

  const start = () => {
    cancelAnimationFrame(frame)
    if (motionQuery.matches) {
      render()
      return
    }
    clock = performance.now()
    frame = requestAnimationFrame(animate)
  }
  start()
  motionQuery.addEventListener("change", start)

  return {
    peck: () => startPecking(3),
    dispose: () => {
      cancelAnimationFrame(frame)
      motionQuery.removeEventListener("change", start)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      container.removeEventListener("pointerdown", handlePointerDown)
      container.removeEventListener("pointermove", handlePointerMove)
      container.removeEventListener("pointerleave", handlePointerLeave)
      for (const item of disposables) item.dispose()
      chips.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}

export function PeckStage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<{ peck: () => void } | null>(null)
  const [found, setFound] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let dispose = () => {}

    Promise.all([import("three"), import("three/examples/jsm/effects/OutlineEffect.js")])
      .then(([THREE, effects]) => {
        if (cancelled) return
        const api = buildScene(THREE, effects.OutlineEffect, container, () =>
          setFound((count) => count + 1)
        )
        if (!api) return
        apiRef.current = api
        dispose = api.dispose
      })
      .catch(() => {})

    return () => {
      cancelled = true
      apiRef.current = null
      dispose()
    }
  }, [theme])

  const bug = bugs[found % bugs.length]

  return (
    <div className="overflow-hidden rounded-2xl border-4 border-ink bg-card shadow-[8px_8px_0_0_var(--ink)]">
      <div className="flex items-center justify-between gap-3 border-b-4 border-ink bg-marigold px-4 py-2 text-ink">
        <p className="font-heading text-base tracking-wide sm:text-lg">The Debug Log</p>
        <p className="text-xs font-black tracking-[0.12em] uppercase">
          {found > 0 ? `${found} pulled out` : "tap the log"}
        </p>
      </div>

      <div className="relative bg-sky">
        <div ref={containerRef} className="h-56 w-full cursor-pointer sm:h-72" aria-hidden />
        <button
          type="button"
          onClick={() => apiRef.current?.peck()}
          className="absolute right-3 bottom-3 rounded-full border-2 border-ink bg-card px-3.5 py-1.5 text-xs font-bold shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
        >
          Peck
        </button>
      </div>

      <div className="border-t-4 border-ink p-4">
        <p className="text-xs font-black tracking-[0.14em] text-muted-foreground uppercase">
          Bug {(found % bugs.length) + 1} of {bugs.length} · {bug.where}
        </p>
        <p className="mt-1.5 font-heading text-lg leading-tight tracking-wide text-balance">
          {bug.name}
        </p>
        <p className="mt-2 text-sm leading-relaxed font-medium text-muted-foreground">{bug.fix}</p>
      </div>
    </div>
  )
}
