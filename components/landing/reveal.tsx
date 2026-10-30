'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12)
  return (
    <Tag
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function CountUp({
  to,
  suffix = '',
  duration = 1400,
  className,
}: {
  to: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(to * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {value}
      {suffix}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'center' | 'start'
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-start',
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-accent px-3 py-1 text-xs font-bold text-brand-deep">
        <span className="size-1.5 rounded-full bg-emerald" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem] md:leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  )
}
