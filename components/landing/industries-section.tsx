'use client'

import { useState } from 'react'
import {
  ShoppingBag,
  Building2,
  HeartPulse,
  Landmark,
  Hotel,
  GraduationCap,
  Car,
  Cpu,
  MessageSquareQuote,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading, Reveal } from './reveal'
import { cn } from '@/lib/utils'

type Industry = {
  id: string
  name: string
  icon: LucideIcon
  summary: string
  prompts: string[]
  focus: string[]
  color: string
}

const industries: Industry[] = [
  {
    id: 'retail',
    name: 'التجزئة والتجارة الإلكترونية',
    icon: ShoppingBag,
    color: '#286bff',
    summary: 'اعرف متى تُرشَّح متاجرك ومنتجاتك عندما يسأل المتسوقون عن أفضل الخيارات والعروض.',
    prompts: ['أفضل متجر إلكترونيات موثوق في السعودية', 'أين أشتري عطورًا أصلية أونلاين؟'],
    focus: ['استفسارات المنتجات', 'مقارنة الأسعار', 'مراجعات العملاء'],
  },
  {
    id: 'realestate',
    name: 'العقارات',
    icon: Building2,
    color: '#1438d6',
    summary: 'تتبّع ظهور مشاريعك ووكالتك عندما يبحث المشترون والمستثمرون عن أحياء ومطورين.',
    prompts: ['أفضل المطورين العقاريين في الرياض', 'أحياء مناسبة للعائلات في جدة'],
    focus: ['المطورون والمشاريع', 'الأحياء والمدن', 'التمويل العقاري'],
  },
  {
    id: 'health',
    name: 'الرعاية الصحية',
    icon: HeartPulse,
    color: '#12c98b',
    summary: 'افهم كيف تُوصف عيادتك أو مستشفاك في الإجابات الصحية مع مراقبة دقة المعلومات.',
    prompts: ['أفضل عيادة أسنان في الدمام', 'مستشفى متخصص في طب الأطفال بالخبر'],
    focus: ['التخصصات الطبية', 'السمعة والثقة', 'دقة المعلومات'],
  },
  {
    id: 'fintech',
    name: 'الخدمات المالية والتقنية المالية',
    icon: Landmark,
    color: '#08b8d4',
    summary: 'راقب حضورك في المقارنات بين البنوك والمحافظ الرقمية وحلول الدفع.',
    prompts: ['أفضل محفظة رقمية في السعودية', 'بطاقة ائتمانية بدون رسوم سنوية'],
    focus: ['مقارنات المنتجات', 'الثقة والأمان', 'الامتثال'],
  },
  {
    id: 'hospitality',
    name: 'السياحة والضيافة',
    icon: Hotel,
    color: '#5fb4ff',
    summary: 'اظهر في توصيات الفنادق والمطاعم والوجهات عندما يخطط الزوار لرحلاتهم.',
    prompts: ['أفضل فنادق العلا للعائلات', 'مطاعم مميزة في الرياض لعشاء عمل'],
    focus: ['الوجهات', 'التقييمات', 'المواسم والفعاليات'],
  },
  {
    id: 'education',
    name: 'التعليم',
    icon: GraduationCap,
    color: '#1f5fff',
    summary: 'اعرف كيف تُقارن مدرستك أو جامعتك أو منصتك التعليمية في أسئلة أولياء الأمور والطلاب.',
    prompts: ['أفضل المدارس العالمية في الرياض', 'دورات معتمدة في تحليل البيانات أونلاين'],
    focus: ['البرامج والاعتمادات', 'المقارنات', 'الرسوم والقبول'],
  },
  {
    id: 'auto',
    name: 'السيارات والتنقل',
    icon: Car,
    color: '#0b1220',
    summary: 'تتبّع ظهور وكالاتك وخدماتك في أسئلة الشراء والصيانة والتأجير.',
    prompts: ['أفضل وكالة سيارات كهربائية في السعودية', 'تأجير سيارات شهري بسعر مناسب'],
    focus: ['الطرازات والوكلاء', 'الصيانة والخدمة', 'التأجير'],
  },
  {
    id: 'saas',
    name: 'التقنية والبرمجيات',
    icon: Cpu,
    color: '#12c98b',
    summary: 'اعرف متى يُوصى بمنتجك كبديل أو كحل أول في مقارنات البرمجيات للشركات.',
    prompts: ['أفضل نظام محاسبة للشركات الصغيرة', 'بديل عربي لأدوات إدارة المشاريع'],
    focus: ['البدائل والمقارنات', 'التكاملات', 'دعم اللغة العربية'],
  },
]

export function IndustriesSection() {
  const [activeId, setActiveId] = useState(industries[0].id)
  const active = industries.find((i) => i.id === activeId) ?? industries[0]

  return (
    <section id="industries" className="scroll-mt-24 bg-white py-20 md:py-28" aria-labelledby="industries-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="القطاعات"
          title={<span id="industries-title">رؤى مصممة لطبيعة قطاعك.</span>}
          description="لكل قطاع أسئلته ومنافسوه ومصادره. اختر قطاعك لترى كيف تساعدك Strevety على فهم الاستفسارات التي يطرحها عملاؤك."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="grid grid-cols-2 content-start gap-3 self-start sm:grid-cols-4" role="tablist" aria-label="القطاعات">
            {industries.map((ind, i) => {
              const selected = ind.id === activeId
              return (
                <Reveal key={ind.id} delay={(i % 4) * 70}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="industry-panel"
                    onClick={() => setActiveId(ind.id)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setActiveId(ind.id)}
                    className={cn(
                      'group flex h-full w-full flex-col items-start gap-4 rounded-2xl border p-4 text-start transition-all duration-300',
                      selected
                        ? '-translate-y-1 border-brand/30 bg-accent/60 shadow-brand'
                        : 'border-border bg-background hover:-translate-y-0.5 hover:border-brand/20',
                    )}
                  >
                    <span
                      className="flex size-11 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110"
                      style={{ background: ind.color }}
                    >
                      <ind.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold leading-snug text-navy">{ind.name}</span>
                  </button>
                </Reveal>
              )
            })}
          </div>

          <div
            id="industry-panel"
            role="tabpanel"
            aria-live="polite"
            className="relative overflow-hidden rounded-3xl border border-border bg-background p-6 md:p-8"
          >
            <div
              className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full opacity-20 blur-3xl transition-colors duration-500"
              style={{ background: active.color }}
              aria-hidden="true"
            />
            <div key={active.id} className="animate-in fade-in slide-in-from-bottom-3 relative flex flex-col gap-6 duration-500">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-14 items-center justify-center rounded-2xl text-white shadow-float"
                  style={{ background: active.color }}
                >
                  <active.icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-extrabold text-navy">{active.name}</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{active.summary}</p>

              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-muted-foreground">أمثلة على استفسارات نتتبّعها</p>
                {active.prompts.map((p, i) => (
                  <div
                    key={p}
                    className="animate-in fade-in slide-in-from-left-2 flex items-start gap-2.5 rounded-xl border border-border bg-white p-3 fill-mode-both duration-500"
                    style={{ animationDelay: `${150 + i * 120}ms` }}
                  >
                    <MessageSquareQuote className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                    <span className="text-sm font-medium text-navy">{p}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-muted-foreground">محاور التركيز</p>
                <ul className="flex flex-wrap gap-2">
                  {active.focus.map((f) => (
                    <li key={f} className="rounded-full border border-brand/15 bg-white px-3 py-1 text-xs font-bold text-brand-deep">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#pricing"
                className="group inline-flex items-center gap-1.5 self-start text-sm font-bold text-brand hover:text-brand-deep"
              >
                ابدأ بتتبّع قطاعك
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
