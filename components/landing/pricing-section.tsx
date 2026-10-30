'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles, ArrowLeft, Minus, Plus } from 'lucide-react'
import { SectionHeading, Reveal } from './reveal'
import { TiltCard } from './tilt-card'
import { cn } from '@/lib/utils'

type Plan = {
  name: string
  description: string
  monthly: number | null
  basePrompts: number
  pricePerExtra: number
  cta: string
  href: string
  featured?: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'البداية',
    description: 'للعلامات التي تبدأ رحلة قياس ظهورها.',
    monthly: 0,
    basePrompts: 25,
    pricePerExtra: 0,
    cta: 'ابدأ مجانًا',
    href: '/signup',
    features: ['علامة تجارية واحدة', '25 استفسارًا متتبعًا', 'تقرير ظهور شهري', 'مقارنة بمنافسَين', 'دعم عبر البريد'],
  },
  {
    name: 'النمو',
    description: 'للفرق التي تريد رؤى متعمقة وتحسينًا مستمرًا.',
    monthly: 749,
    basePrompts: 150,
    pricePerExtra: 3,
    cta: 'ابدأ تجربة مجانية',
    href: '/signup',
    featured: true,
    features: [
      '3 علامات تجارية',
      '150 استفسارًا متتبعًا',
      'تحديثات أسبوعية',
      'ذكاء الاستشهادات والمنافسين',
      'استوديو التحسين بالذكاء الاصطناعي',
      'دعم العربية والإنجليزية',
    ],
  },
  {
    name: 'المؤسسات',
    description: 'للوكالات والمؤسسات متعددة العلامات والأسواق.',
    monthly: null,
    basePrompts: 0,
    pricePerExtra: 0,
    cta: 'تواصل مع المبيعات',
    href: '/contact',
    features: [
      'علامات واستفسارات غير محدودة',
      'تحديثات يومية',
      'تقارير بعلامتك الخاصة',
      'صلاحيات وفرق متعددة',
      'وصول عبر API',
      'مدير حساب مخصص',
    ],
  },
]

const YEARLY_DISCOUNT = 0.2

export function PricingSection() {
  const [yearly, setYearly] = useState(true)
  const [prompts, setPrompts] = useState(150)

  const priceFor = (plan: Plan) => {
    if (plan.monthly === null) return null
    if (plan.monthly === 0) return 0
    const extra = Math.max(prompts - plan.basePrompts, 0) * plan.pricePerExtra
    const base = plan.monthly + extra
    return Math.round(yearly ? base * (1 - YEARLY_DISCOUNT) : base)
  }

  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-white py-20 md:py-28" aria-labelledby="pricing-title">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="الأسعار"
          title={<span id="pricing-title">خطط مرنة تنمو مع علامتك.</span>}
          description="ابدأ مجانًا، ثم انتقل إلى الخطة المناسبة لحجم فريقك وعدد الاستفسارات التي تريد تتبّعها."
        />

        <Reveal className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-6">
          <div className="relative inline-flex rounded-full border border-border bg-background p-1" role="radiogroup" aria-label="دورة الفوترة">
            <span
              className={cn(
                'absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow-brand ring-1 ring-border transition-all duration-300',
                yearly ? 'right-1' : 'right-[calc(50%+2px)]',
              )}
              aria-hidden="true"
            />
            {[
              { value: true, label: 'سنويًا' },
              { value: false, label: 'شهريًا' },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                role="radio"
                aria-checked={yearly === opt.value}
                onClick={() => setYearly(opt.value)}
                className={cn(
                  'relative z-10 flex min-w-32 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors',
                  yearly === opt.value ? 'text-navy' : 'text-muted-foreground',
                )}
              >
                {opt.label}
                {opt.value && <span className="rounded-full bg-emerald/12 px-1.5 py-0.5 text-[10px] text-emerald">وفّر 20%</span>}
              </button>
            ))}
          </div>

          <div className="w-full rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="prompt-range" className="text-sm font-bold text-navy">
                عدد الاستفسارات المتتبعة (خطة النمو)
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPrompts((p) => Math.max(150, p - 50))}
                  className="flex size-7 items-center justify-center rounded-lg border border-border bg-white text-navy hover:border-brand/40"
                  aria-label="تقليل عدد الاستفسارات"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="tabular min-w-12 text-center text-lg font-extrabold text-brand">{prompts}</span>
                <button
                  type="button"
                  onClick={() => setPrompts((p) => Math.min(1000, p + 50))}
                  className="flex size-7 items-center justify-center rounded-lg border border-border bg-white text-navy hover:border-brand/40"
                  aria-label="زيادة عدد الاستفسارات"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>
            <input
              id="prompt-range"
              type="range"
              min={150}
              max={1000}
              step={50}
              value={prompts}
              onChange={(e) => setPrompts(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-[#286bff]"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, i) => {
            const price = priceFor(plan)
            return (
              <Reveal key={plan.name} delay={i * 110}>
                <TiltCard
                  intensity={4}
                  className={cn(
                    'flex flex-col p-7',
                    plan.featured && 'border-brand/40 bg-gradient-to-b from-accent/70 to-white shadow-float lg:-my-3 lg:py-10',
                  )}
                >
                  <div className="flex h-full flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-navy">{plan.name}</h3>
                      {plan.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white shadow-brand">
                          <Sparkles className="size-3" aria-hidden="true" />
                          الأكثر شيوعًا
                        </span>
                      )}
                    </div>
                    <p className="-mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

                    <div className="flex items-baseline gap-2">
                      {price === null ? (
                        <span className="text-4xl font-extrabold text-navy">سعر مخصص</span>
                      ) : price === 0 ? (
                        <span className="text-5xl font-extrabold text-navy">مجانًا</span>
                      ) : (
                        <>
                          <span key={price} className="tabular animate-in fade-in slide-in-from-bottom-1 text-5xl font-extrabold text-navy duration-300">
                            {price.toLocaleString('en-US')}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">ر.س / شهريًا</span>
                        </>
                      )}
                    </div>
                    {plan.featured && (
                      <p className="-mt-4 text-xs text-muted-foreground">
                        {yearly ? 'تُدفع سنويًا' : 'تُدفع شهريًا'} · يشمل {prompts} استفسارًا
                      </p>
                    )}

                    <Link
                      href={plan.href}
                      className={cn(
                        'group inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5',
                        plan.featured
                          ? 'bg-brand text-white shadow-brand hover:bg-brand-deep'
                          : 'border border-border bg-white text-navy hover:border-brand/40',
                      )}
                    >
                      {plan.cta}
                      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    </Link>

                    <ul className="flex flex-col gap-3 border-t border-border pt-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-navy/80">
                          <span
                            className={cn(
                              'flex size-5 shrink-0 items-center justify-center rounded-full',
                              plan.featured ? 'bg-brand text-white' : 'bg-emerald/12 text-emerald',
                            )}
                          >
                            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          الأسعار توضيحية وتشمل جميع الخطط إمكانية الإلغاء في أي وقت. الأسعار لا تشمل ضريبة القيمة المضافة.
        </p>
      </div>
    </section>
  )
}
