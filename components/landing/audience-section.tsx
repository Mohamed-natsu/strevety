'use client'

import { useState } from 'react'
import { Megaphone, Search, Briefcase, Users, Check, type LucideIcon } from 'lucide-react'
import { SectionHeading, Reveal } from './reveal'
import { cn } from '@/lib/utils'

const audiences: { icon: LucideIcon; title: string; description: string; benefits: string[] }[] = [
  {
    icon: Megaphone,
    title: 'فرق التسويق',
    description: 'افهم حضور علامتك وحدد فرص النمو.',
    benefits: ['تقارير ظهور شهرية للإدارة', 'تتبّع أثر الحملات على الذكر', 'رصد الفجوات أمام المنافسين'],
  },
  {
    icon: Search,
    title: 'فرق SEO',
    description: 'تجاوز الترتيب التقليدي وقِس الظهور في البحث بالذكاء الاصطناعي.',
    benefits: ['تدقيق البيانات المنظمة', 'تحليل مصادر الاستشهاد', 'توصيات محتوى قابلة للتنفيذ'],
  },
  {
    icon: Briefcase,
    title: 'الوكالات',
    description: 'راقب عدة علامات تجارية وقدّم رؤى قيّمة لعملائك.',
    benefits: ['مساحات عمل متعددة للعملاء', 'تقارير بعلامتك الخاصة', 'إدارة الفريق والصلاحيات'],
  },
  {
    icon: Users,
    title: 'المؤسسين وقادة الأعمال',
    description: 'افهم كيف تؤثر أنظمة الذكاء الاصطناعي على اكتشاف علامتك.',
    benefits: ['ملخص تنفيذي واضح', 'مقارنة بالمنافسين في لحظة', 'أولويات نمو مرتبة'],
  },
]

export function AudienceSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="audience" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="audience-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="لمن صُممت"
          title={<span id="audience-title">صُممت للفرق التي تقود النمو.</span>}
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => {
            const selected = active === i
            return (
              <Reveal key={a.title} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                  aria-expanded={selected}
                  className={cn(
                    'group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl border p-6 text-start transition-all duration-500',
                    selected
                      ? 'border-transparent bg-gradient-to-br from-brand to-brand-deep text-white shadow-float'
                      : 'border-border bg-white text-navy hover:border-brand/30',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-12 items-center justify-center rounded-2xl transition-all duration-500',
                      selected ? 'bg-white/15 text-white' : 'bg-accent text-brand',
                    )}
                  >
                    <a.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-extrabold">{a.title}</h3>
                  <p className={cn('leading-relaxed', selected ? 'text-white/80' : 'text-muted-foreground')}>
                    {a.description}
                  </p>
                  <div
                    className={cn(
                      'grid transition-all duration-500',
                      selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:grid-rows-[1fr] lg:opacity-40',
                    )}
                  >
                    <ul className="flex flex-col gap-2 overflow-hidden">
                      {a.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm">
                          <Check className={cn('size-4 shrink-0', selected ? 'text-emerald' : 'text-brand')} strokeWidth={3} aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selected && (
                    <span
                      className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-emerald/30 blur-2xl"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
