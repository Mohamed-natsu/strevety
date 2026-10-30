'use client'

import { useEffect, useState } from 'react'
import { Building2, MessagesSquare, BarChart3, Rocket, type LucideIcon } from 'lucide-react'
import { SectionHeading, useInView } from './reveal'
import { cn } from '@/lib/utils'

const steps: { icon: LucideIcon; title: string; description: string; detail: string[] }[] = [
  {
    icon: Building2,
    title: 'أضف علامتك التجارية',
    description: 'أدخل موقعك الإلكتروني، وقطاعك، ومنافسيك، والأسواق المستهدفة.',
    detail: ['الموقع الإلكتروني', 'القطاع', 'المنافسون', 'السوق: السعودية · الخليج'],
  },
  {
    icon: MessagesSquare,
    title: 'تتبّع الاستفسارات المهمة',
    description: 'راقب الأسئلة والاستفسارات التي قد يطرحها عملاؤك المحتملون على أنظمة الذكاء الاصطناعي.',
    detail: ['استفسارات المقارنة', 'استفسارات الشراء', 'استفسارات محلية', 'العربية والإنجليزية'],
  },
  {
    icon: BarChart3,
    title: 'حلّل حضورك',
    description: 'قِس الذكر والتوصيات والاستشهادات والمنافسين وتوجهات الظهور.',
    detail: ['معدل الذكر', 'معدل التوصية', 'الاستشهادات', 'حصة الصوت'],
  },
  {
    icon: Rocket,
    title: 'حسّن وانمُ',
    description: 'استخدم الرؤى والتوصيات لتحسين المحتوى وتعزيز ظهور علامتك.',
    detail: ['فرص ذات أولوية', 'توصيات المحتوى', 'تتبّع التقدم', 'تقارير دورية'],
  },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>(0.3)

  useEffect(() => {
    if (!inView || paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3800)
    return () => clearInterval(id)
  }, [inView, paused])

  const current = steps[active]

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 md:py-28" aria-labelledby="how-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="كيف تعمل"
          title={<span id="how-title">من الظهور إلى النمو في أربع خطوات.</span>}
        />

        <div
          ref={ref}
          className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <ol className="relative flex flex-col gap-3">
            <span className="absolute bottom-6 right-[27px] top-6 w-px bg-border" aria-hidden="true" />
            <span
              className="absolute right-[27px] top-6 w-px bg-gradient-to-b from-brand to-emerald transition-all duration-700"
              style={{ height: `calc(${(active / (steps.length - 1)) * 100}% - ${(active / (steps.length - 1)) * 48}px)` }}
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={cn(
                    'relative flex w-full items-start gap-4 rounded-2xl border p-4 text-start transition-all duration-300',
                    active === i ? 'border-brand/30 bg-accent/60 shadow-brand' : 'border-transparent hover:bg-background',
                  )}
                >
                  <span
                    className={cn(
                      'relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-2xl border transition-all duration-300',
                      active === i
                        ? 'border-brand bg-brand text-white'
                        : i < active
                          ? 'border-emerald/30 bg-emerald/10 text-emerald'
                          : 'border-border bg-white text-muted-foreground',
                    )}
                  >
                    <s.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1 pt-1">
                    <span className="tabular text-xs font-bold text-muted-foreground">الخطوة {i + 1}</span>
                    <span className="text-lg font-extrabold text-navy">{s.title}</span>
                    <span
                      className={cn(
                        'grid text-sm leading-relaxed text-muted-foreground transition-all duration-300',
                        active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <span className="overflow-hidden">{s.description}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative [perspective:1400px]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/10 via-cyan/5 to-emerald/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              key={active}
              className="animate-in fade-in zoom-in-95 relative rounded-3xl border border-border bg-background p-6 shadow-float duration-500 md:p-8 [transform:rotateY(-6deg)_rotateX(4deg)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-brand">
                  <current.icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="tabular text-xs font-bold text-brand">
                    {active + 1} / {steps.length}
                  </p>
                  <p className="text-xl font-extrabold text-navy">{current.title}</p>
                </div>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {current.detail.map((d, i) => (
                  <li
                    key={d}
                    className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-border bg-white p-4 text-sm font-bold text-navy fill-mode-both duration-500"
                    style={{ animationDelay: `${150 + i * 90}ms` }}
                  >
                    <span className="mb-2 block h-1 w-8 rounded-full bg-gradient-to-l from-brand to-emerald" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-brand to-emerald transition-all duration-700"
                  style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
