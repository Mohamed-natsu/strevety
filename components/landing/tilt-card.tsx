'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function TiltCard({
  children,
  className,
  intensity = 6,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--rx', `${(0.5 - py) * intensity}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * intensity}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div className="h-full [perspective:1200px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          'group relative h-full overflow-hidden rounded-3xl border border-border bg-white transition-[transform,box-shadow,border-color] duration-300 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-brand/30 hover:shadow-float',
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(40 107 255 / 0.08), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  )
}
