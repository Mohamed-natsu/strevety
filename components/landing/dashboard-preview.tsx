'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Search, Bell, CalendarRange } from 'lucide-react'
import {
  CitationSourceList,
  CompetitorComparison,
  MetricCard,
  SampleBadge,
  VisibilityChart,
  type Metric,
} from './dashboard-parts'

const metrics: Metric[] = [
  { label: 'الظهور في الذكاء الاصطناعي', value: 68, delta: 12, tone: 'brand' },
  { label: 'معدل الذكر', value: 42, delta: 6, tone: 'cyan' },
  { label: 'معدل التوصية', value: 31, delta: 4, tone: 'emerald' },
  { label: 'معدل الاستشهاد', value: 24, delta: -2, tone: 'navy' },
]

const series = [
  { name: 'علامتك', color: '#286bff', values: [34, 38, 41, 47, 52, 55, 62, 68] },
  { name: 'منافس أ', color: '#08b8d4', values: [44, 46, 45, 48, 50, 49, 52, 54] },
]

const competitors = [
  { name: 'علامتك', value: 68, highlight: true },
  { name: 'منافس أ', value: 54 },
  { name: 'منافس ب', value: 41 },
  { name: 'منافس ج', value: 29 },
]

const sources = [
  { domain: 'industry-review.sa', share: 28 },
  { domain: 'gulf-business.example', share: 19 },
  { domain: 'forum.example.com', share: 14 },
]

export function DashboardPreview() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 18, y: 0 })
  const [hover, setHover] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const progress = Math.min(Math.max(1 - rect.top / window.innerHeight, 0), 1)
      setTilt((t) => ({ ...t, x: 18 - progress * 18 }))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    setHover({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -4,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 6,
    })
  }

  return (
    <section className="relative px-5 pb-20 pt-10 md:px-8 md:pb-28" aria-label="معاينة لوحة التحكم">
      <div
        ref={wrapRef}
        className="mx-auto max-w-[1240px] [perspective:1800px]"
        onPointerMove={onMove}
        onPointerLeave={() => setHover({ x: 0, y: 0 })}
      >
        <div
          className="relative rounded-[22px] border border-border bg-white/70 p-2 shadow-float backdrop-blur transition-transform duration-300 ease-out will-change-transform md:p-3"
          style={{
            transform: `rotateX(${tilt.x + hover.x}deg) rotateY(${hover.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <p className="text-sm font-bold text-navy">نظرة عامة على الظهور في الذكاء الاصطناعي</p>
                <SampleBadge />
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground">
                  <Search className="size-3.5" aria-hidden="true" />
                  ابحث في الاستفسارات
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground">
                  <CalendarRange className="size-3.5" aria-hidden="true" />
                  آخر 8 أشهر
                </span>
                <span className="relative inline-flex size-8 items-center justify-center rounded-lg border border-border">
                  <Bell className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-emerald" />
                </span>
              </div>
            </div>

            <div className="grid gap-3 p-3 md:p-4">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {metrics.map((m) => (
                  <MetricCard key={m.label} metric={m} />
                ))}
              </div>
              <div className="grid gap-3 lg:grid-cols-[1.7fr_1fr]">
                <VisibilityChart series={series} height={170} />
                <CompetitorComparison items={competitors} />
              </div>
              <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
                <div className="relative overflow-hidden rounded-xl border border-brand/20 bg-gradient-to-l from-accent to-white p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-white">
                      <Sparkles className="size-3.5" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-bold text-navy">تم رصد فرصة ظهور</p>
                    <span className="mr-auto rounded-full bg-emerald/12 px-2 py-0.5 text-[10px] font-bold text-emerald">
                      أولوية عالية
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy/75">
                    علامتك التجارية أقل حضورًا في استفسارات المقارنة عالية النية. إضافة صفحات مقارنة وأسئلة شائعة منظّمة
                    قد تحسّن فرص ظهورك.
                  </p>
                </div>
                <CitationSourceList sources={sources} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
