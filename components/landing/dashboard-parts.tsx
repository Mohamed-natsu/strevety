'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { useInView } from './reveal'
import { cn } from '@/lib/utils'

export type Metric = {
  label: string
  value: number
  delta: number
  tone: 'brand' | 'emerald' | 'cyan' | 'navy'
}

const toneClasses: Record<Metric['tone'], string> = {
  brand: 'bg-brand',
  emerald: 'bg-emerald',
  cyan: 'bg-cyan',
  navy: 'bg-navy',
}

export function MetricCard({ metric, compact = false }: { metric: Metric; compact?: boolean }) {
  const positive = metric.delta >= 0
  return (
    <div className={cn('rounded-xl border border-border bg-white', compact ? 'p-2.5' : 'p-3.5')}>
      <div className="flex items-center gap-1.5">
        <span className={cn('size-1.5 rounded-full', toneClasses[metric.tone])} aria-hidden="true" />
        <p className="truncate text-[11px] font-medium text-muted-foreground">{metric.label}</p>
      </div>
      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <span className={cn('tabular font-extrabold text-navy', compact ? 'text-lg' : 'text-2xl')}>
          {metric.value}%
        </span>
        <span
          className={cn(
            'tabular inline-flex items-center gap-0.5 text-[11px] font-bold',
            positive ? 'text-emerald' : 'text-destructive',
          )}
        >
          {positive ? <TrendingUp className="size-3" aria-hidden="true" /> : <TrendingDown className="size-3" aria-hidden="true" />}
          {positive ? '+' : ''}
          {metric.delta}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
        <div className={cn('h-full rounded-full', toneClasses[metric.tone])} style={{ width: `${metric.value}%` }} />
      </div>
    </div>
  )
}

const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس']

export function VisibilityChart({
  series,
  height = 150,
  title = 'الظهور في الذكاء الاصطناعي عبر الزمن',
}: {
  series: { name: string; color: string; values: number[] }[]
  height?: number
  title?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const width = 520
  const pad = 8
  const step = (width - pad * 2) / (months.length - 1)
  const toPoints = (values: number[]) =>
    values.map((v, i) => [width - pad - i * step, height - 18 - (v / 100) * (height - 30)] as const)
  const toPath = (pts: readonly (readonly [number, number])[]) =>
    pts.reduce((acc, [x, y], i) => {
      if (i === 0) return `M ${x} ${y}`
      const [px, py] = pts[i - 1]
      const cx = (px + x) / 2
      return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`
    }, '')

  return (
    <div ref={ref} className="rounded-xl border border-border bg-white p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold text-navy">{title}</p>
        <div className="flex items-center gap-3">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: s.color }} aria-hidden="true" />
              {s.name}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full" role="img" aria-label={`${title} - بيانات توضيحية`}>
        <defs>
          <linearGradient id="area-brand" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#286bff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#286bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((r) => (
          <line
            key={r}
            x1={0}
            x2={width}
            y1={(height - 18) * r}
            y2={(height - 18) * r}
            stroke="#e3e8f1"
            strokeDasharray="3 4"
          />
        ))}
        {series.map((s, idx) => {
          const pts = toPoints(s.values)
          const d = toPath(pts)
          return (
            <g key={s.name}>
              {idx === 0 && inView && (
                <path
                  d={`${d} L ${pts[pts.length - 1][0]} ${height - 18} L ${pts[0][0]} ${height - 18} Z`}
                  fill="url(#area-brand)"
                  className="animate-in fade-in duration-1000"
                />
              )}
              {inView && (
                <path
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={idx === 0 ? 2.5 : 1.75}
                  strokeLinecap="round"
                  strokeDasharray={idx === 0 ? undefined : '0'}
                  className="animate-draw"
                  style={{ animationDelay: `${idx * 200}ms`, opacity: idx === 0 ? 1 : 0.7 }}
                />
              )}
              {idx === 0 && inView && (
                <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={4} fill="#286bff" stroke="#fff" strokeWidth={2} />
              )}
            </g>
          )
        })}
        {months.map((m, i) => (
          <text
            key={m}
            x={width - pad - i * step}
            y={height - 2}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: 10 }}
          >
            {m}
          </text>
        ))}
      </svg>
    </div>
  )
}

export function CompetitorComparison({
  items,
}: {
  items: { name: string; value: number; highlight?: boolean }[]
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  return (
    <div ref={ref} className="rounded-xl border border-border bg-white p-3.5">
      <p className="text-xs font-bold text-navy">مقارنة المنافسين</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className={cn(item.highlight ? 'font-bold text-navy' : 'text-muted-foreground')}>{item.name}</span>
              <span className="tabular font-bold text-navy">{item.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              {inView && (
                <div
                  className={cn('animate-grow-x h-full rounded-full', item.highlight ? 'bg-gradient-to-l from-brand to-cyan' : 'bg-navy/20')}
                  style={{ width: `${item.value}%`, animationDelay: `${i * 120}ms` }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CitationSourceList({ sources }: { sources: { domain: string; share: number }[] }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3.5">
      <p className="text-xs font-bold text-navy">مصادر الاستشهاد</p>
      <ul className="mt-2.5 flex flex-col divide-y divide-border">
        {sources.map((s) => (
          <li key={s.domain} className="flex items-center justify-between py-1.5 text-[11px]">
            <span dir="ltr" className="font-medium text-navy/80">
              {s.domain}
            </span>
            <span className="tabular rounded-md bg-accent px-1.5 py-0.5 font-bold text-brand-deep">{s.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SampleBadge() {
  return (
    <span className="rounded-md border border-dashed border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      بيانات توضيحية
    </span>
  )
}
