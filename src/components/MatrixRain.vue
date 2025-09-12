<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

const props = defineProps({
  intervalMs: { type: Number, default: 50 },
  fontSize:   { type: Number, default: 14 },
  opacity:    { type: [Number, String], default: 0.3 },
  paused:     { type: Boolean, default: false }
})

const canvasEl = ref(null)
let intervalId = null
let drops = []
const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
const chars = matrixChars.split('')

function setupCanvasSize() {
  const canvas = canvasEl.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const columns = Math.floor(canvas.width / props.fontSize)
  drops = Array.from({ length: columns }, () => 1)
}

function drawFrame() {
  const canvas = canvasEl.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return

  ctx.fillStyle = 'rgba(0,0,0,0.04)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#00ff41'
  ctx.font = `${props.fontSize}px 'Fira Code', monospace`

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)]
    const x = i * props.fontSize
    const y = drops[i] * props.fontSize
    ctx.fillText(text, x, y)
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
    drops[i]++
  }
}

function start() { if (!intervalId) intervalId = setInterval(drawFrame, props.intervalMs) }
function stop()  { if (intervalId) { clearInterval(intervalId); intervalId = null } }
function onResize() { setupCanvasSize() }

onMounted(() => {
  setupCanvasSize()
  window.addEventListener('resize', onResize)

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handle = () => (mq.matches || props.paused) ? stop() : start()
  mq.addEventListener?.('change', handle)

  watchEffect(() => handle())
  handle()

  onUnmounted(() => mq.removeEventListener?.('change', handle))
})

onUnmounted(() => {
  stop()
  window.removeEventListener('resize', onResize)
})
</script>
<template>
  <canvas ref="canvasEl" class="matrix-rain" :style="{ opacity }" />
</template>