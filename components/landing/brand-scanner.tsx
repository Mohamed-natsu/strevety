'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ScanSearch, Loader2, Check, ArrowLeft, Lightbulb, RotateCcw } from 'lucide-react'
import { SectionHeading } from './reveal'
import { cn } from '@/lib/utils'

const industries = ['التجزئة', 'العقارات', 'الرعاية الصحية', 'التقنية المالية', 'الضيافة', 'التعليم']

const scanSteps = [
  'توليد استفسارات واقعية لقطاعك',
  'تحليل إجابات الذكاء الاصطناعي',
  'رصد المنافسين والمصادر',
  'حساب مؤشر الظهور',
]

type Result = {
  score: number
  mention: number
  recommendation: number
  citation: number
  channels: { label: string; value: number }[]
}

function hash(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function buildResult(brand: string, industry: string): Result {
  const h = hash(`${brand.trim()}-${industry}`)
  const pick = (shift: number, min: number, max: number) => min + ((h >> shift) % (max - min + 1))
  return {
    score: pick(0, 32, 78),
    mention: pick(3, 25, 70),
    recommendation: pick(6, 12, 52),
    citation: pick(9, 8, 40),
    channels: [
      { label: 'البحث بالذكاء الاصطناعي', value: pick(12, 20, 85) },
      { label: 'المساعدات المحادثية', value: pick(15, 20, 85) },
      { label: 'الاكتشاف التوليدي', value: pick(18, 15, 80) },
    ],
  }
}

export function BrandScanner() {
  const [brand, setBrand] = useState('')
  const [industry, setIndustry] = useState(industries[0])
  const [status, setStatus] = useState<'idle' | 'scanning' | 'done'>('idle')
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = (e: React.FormEvent) => {
    e.preventDefault()
    const name = brand.trim()
    if (!name) return
    timers.current.forEach(clearTimeout)
    setStatus('scanning')
    setStep(0)
    setResult(null)
    scanSteps.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 550 * (i + 1)))
    })
    timers.current.push(
      setTimeout(() => {
        setResult(buildResult(name, industry))
        setStatus('done')
      }, 550 * scanSteps.length + 250),
    )
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    setStatus('idle')
    setResult(null)
    setStep(0)
  }

  const circumference = 2 * Math.PI * 52

  return (
    <section id="try" className="relative scroll-mt-24 py-20 md:py-28" aria-labelledby="scanner-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="جرّبها بنفسك"
          title={<span id="scanner-title">كيف يراك الذكاء الاصطناعي؟</span>}
          description="أدخل اسم علامتك التجارية واختر قطاعك لتشاهد مثالًا تفاعليًا على التقرير الذي تقدمه Strevety."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <form
            onSubmit={run}
            className="flex flex-col gap-6 rounded-3xl border border-border bg-white p-6 shadow-brand md:p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="brand-name" className="text-sm font-bold text-navy">
                اسم العلامة التجارية
              </label>
              <div className="relative">
                <ScanSearch
                  className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="brand-name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="مثال: متجر الواحة"
                  maxLength={40}
                  autoComplete="off"
                  className="h-14 w-full rounded-2xl border border-input bg-background pe-4 ps-12 text-base text-navy outline-none transition-all placeholder:text-muted-foreground/70 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                />
              </div>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-sm font-bold text-navy">القطاع</legend>
              <div className="flex flex-wrap gap-2">
                {industries.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setIndustry(item)}
                    aria-pressed={industry === item}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                      industry === item
                        ? 'border-brand bg-brand text-white shadow-brand'
                        : 'border-border bg-background text-navy/70 hover:border-brand/40 hover:text-navy',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!brand.trim() || status === 'scanning'}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-navy text-base font-bold text-white transition-all hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'scanning' ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  جارٍ التحليل...
                </>
              ) : (
                <>
                  حلّل ظهوري
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                </>
              )}
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              هذه معاينة توضيحية تعمل داخل المتصفح ولا تمثل تحليلًا حقيقيًا لعلامتك التجارية.
            </p>
          </form>

          <div
            className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-white to-accent p-6 md:p-8"
            aria-live="polite"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade" aria-hidden="true" />

            {status === 'idle' && (
              <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="relative flex size-24 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-brand/15 animate-pulse-ring" />
                  <span className="absolute inset-3 rounded-full bg-brand/10" />
                  <ScanSearch className="relative size-9 text-brand" aria-hidden="true" />
                </div>
                <p className="text-lg font-bold text-navy">تقريرك سيظهر هنا</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  اكتب اسم علامتك واضغط «حلّل ظهوري» لمشاهدة مؤشر الظهور والفرص المقترحة.
                </p>
              </div>
            )}

            {status === 'scanning' && (
              <ol className="relative flex h-full flex-col justify-center gap-4">
                {scanSteps.map((label, i) => {
                  const done = step > i
                  const active = step === i
                  return (
                    <li
                      key={label}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border bg-white p-4 transition-all duration-500',
                        done ? 'border-emerald/30' : active ? 'border-brand/40 shadow-brand' : 'border-border opacity-50',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-8 items-center justify-center rounded-full',
                          done ? 'bg-emerald text-white' : 'bg-accent text-brand',
                        )}
                      >
                        {done ? (
                          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                        ) : (
                          <Loader2 className={cn('size-4', active && 'animate-spin')} aria-hidden="true" />
                        )}
                      </span>
                      <span className="text-sm font-medium text-navy">{label}</span>
                    </li>
                  )
                })}
              </ol>
            )}

            {status === 'done' && result && (
              <div className="animate-in fade-in zoom-in-95 relative flex flex-col gap-6 duration-500">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">تقرير توضيحي · {industry}</p>
                    <p className="mt-1 text-xl font-extrabold text-navy">{brand.trim()}</p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-bold text-navy hover:border-brand/40"
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                    إعادة
                  </button>
                </div>

                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="relative size-36 shrink-0">
                    <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#e3e8f1" strokeWidth="10" />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="url(#gauge)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - result.score / 100)}
                        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)' }}
                      />
                      <defs>
                        <linearGradient id="gauge" x1="0" x2="1">
                          <stop offset="0%" stopColor="#1438d6" />
                          <stop offset="60%" stopColor="#286bff" />
                          <stop offset="100%" stopColor="#12c98b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="tabular text-4xl font-extrabold text-navy">{result.score}</span>
                      <span className="text-[11px] text-muted-foreground">مؤشر الظهور</span>
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-3 gap-2">
                    {[
                      { label: 'الذكر', value: result.mention },
                      { label: 'التوصية', value: result.recommendation },
                      { label: 'الاستشهاد', value: result.citation },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl border border-border bg-white p-3 text-center">
                        <p className="tabular text-xl font-extrabold text-navy">{m.value}%</p>
                        <p className="text-[11px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {result.channels.map((c, i) => (
                    <li key={c.label} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-navy/80">{c.label}</span>
                        <span className="tabular font-bold text-navy">{c.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="animate-grow-x h-full rounded-full bg-gradient-to-l from-brand to-cyan"
                          style={{ width: `${c.value}%`, animationDelay: `${i * 150}ms` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-start gap-3 rounded-2xl border border-emerald/25 bg-emerald/6 p-4">
                  <Lightbulb className="mt-0.5 size-5 shrink-0 text-emerald" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-navy/80">
                    أفضل فرصة مقترحة: تعزيز حضورك في استفسارات «أفضل {industry} في السعودية» عبر محتوى مقارن ومصادر
                    موثوقة.
                  </p>
                </div>

                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-brand hover:bg-brand-deep"
                >
                  احصل على التقرير الكامل مجانًا
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
