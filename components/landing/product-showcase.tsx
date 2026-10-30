'use client'

import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  ScanSearch,
  Radar,
  Link2,
  SearchCode,
  TrendingUp,
  MessageSquareText,
  Bot,
  CheckCircle2,
  Star,
  CircleDot,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading, Reveal } from './reveal'
import { CompetitorComparison, MetricCard, SampleBadge, VisibilityChart, type Metric } from './dashboard-parts'
import { cn } from '@/lib/utils'

type Tab = {
  id: string
  label: string
  icon: LucideIcon
  metrics: Metric[]
  series: { name: string; color: string; values: number[] }[]
  chartTitle: string
}

const tabs: Tab[] = [
  {
    id: 'overview',
    label: 'نظرة عامة',
    icon: LayoutDashboard,
    chartTitle: 'اتجاه الذكر والتوصية',
    metrics: [
      { label: 'مؤشر الظهور', value: 68, delta: 12, tone: 'brand' },
      { label: 'اتجاه الذكر', value: 42, delta: 6, tone: 'cyan' },
      { label: 'اتجاه التوصية', value: 31, delta: 4, tone: 'emerald' },
    ],
    series: [
      { name: 'الذكر', color: '#286bff', values: [22, 26, 30, 29, 34, 37, 40, 42] },
      { name: 'التوصية', color: '#12c98b', values: [12, 14, 15, 19, 22, 24, 28, 31] },
    ],
  },
  {
    id: 'visibility',
    label: 'الظهور',
    icon: ScanSearch,
    chartTitle: 'الظهور حسب نوع الاستفسار',
    metrics: [
      { label: 'استفسارات المقارنة', value: 36, delta: 9, tone: 'brand' },
      { label: 'استفسارات المعلومات', value: 71, delta: 3, tone: 'cyan' },
      { label: 'استفسارات الشراء', value: 44, delta: 7, tone: 'emerald' },
    ],
    series: [
      { name: 'المقارنة', color: '#286bff', values: [18, 20, 22, 25, 27, 30, 33, 36] },
      { name: 'المعلومات', color: '#08b8d4', values: [60, 62, 61, 64, 66, 68, 70, 71] },
    ],
  },
  {
    id: 'competitors',
    label: 'المنافسون',
    icon: Radar,
    chartTitle: 'حصة الصوت عبر الزمن',
    metrics: [
      { label: 'حصة الصوت', value: 34, delta: 5, tone: 'brand' },
      { label: 'فجوة المنافس الأول', value: 14, delta: -6, tone: 'navy' },
      { label: 'استفسارات متفوقة', value: 58, delta: 11, tone: 'emerald' },
    ],
    series: [
      { name: 'علامتك', color: '#286bff', values: [22, 24, 25, 27, 29, 30, 32, 34] },
      { name: 'منافس أ', color: '#08b8d4', values: [40, 41, 40, 42, 41, 40, 39, 38] },
    ],
  },
  {
    id: 'citations',
    label: 'الاستشهادات',
    icon: Link2,
    chartTitle: 'الاستشهادات بموقعك',
    metrics: [
      { label: 'معدل الاستشهاد', value: 24, delta: 3, tone: 'brand' },
      { label: 'مصادر جديدة', value: 18, delta: 8, tone: 'cyan' },
      { label: 'مصادر المنافسين', value: 46, delta: -2, tone: 'navy' },
    ],
    series: [
      { name: 'موقعك', color: '#286bff', values: [10, 12, 13, 15, 17, 19, 22, 24] },
      { name: 'مصادر خارجية', color: '#12c98b', values: [30, 32, 33, 35, 36, 38, 40, 41] },
    ],
  },
  {
    id: 'audit',
    label: 'تدقيق الموقع',
    icon: SearchCode,
    chartTitle: 'صحة الموقع التقنية',
    metrics: [
      { label: 'قابلية الزحف', value: 92, delta: 4, tone: 'emerald' },
      { label: 'البيانات المنظمة', value: 48, delta: 15, tone: 'brand' },
      { label: 'جودة المحتوى', value: 74, delta: 6, tone: 'cyan' },
    ],
    series: [
      { name: 'الصحة العامة', color: '#12c98b', values: [61, 64, 66, 70, 72, 75, 78, 81] },
      { name: 'البيانات المنظمة', color: '#286bff', values: [20, 22, 25, 30, 34, 39, 44, 48] },
    ],
  },
  {
    id: 'opportunities',
    label: 'الفرص',
    icon: TrendingUp,
    chartTitle: 'الفرص المنجزة',
    metrics: [
      { label: 'فرص مفتوحة', value: 27, delta: -4, tone: 'navy' },
      { label: 'فرص منجزة', value: 63, delta: 18, tone: 'emerald' },
      { label: 'أثر متوقع', value: 39, delta: 7, tone: 'brand' },
    ],
    series: [
      { name: 'منجزة', color: '#12c98b', values: [8, 14, 20, 28, 35, 44, 54, 63] },
      { name: 'مفتوحة', color: '#286bff', values: [52, 50, 47, 42, 38, 34, 30, 27] },
    ],
  },
]

const prompts = [
  {
    q: 'ما هي أفضل شركات [القطاع] في السعودية؟',
    a: 'هناك عدة شركات تُذكر بشكل متكرر في هذه الفئة، وتتميز كل منها بنقاط قوة مختلفة في الخدمة والتغطية والسعر...',
  },
  {
    q: 'أيهما أفضل للشركات الصغيرة في الرياض؟',
    a: 'يعتمد الاختيار على حجم الأعمال والميزانية، ومن الخيارات التي يُشار إليها كثيرًا عدة مزودين محليين...',
  },
  {
    q: 'ما البديل الأفضل لـ [منافس أ]؟',
    a: 'إذا كنت تبحث عن بديل، فهناك خيارات تقدم مزايا مشابهة مع دعم أفضل للغة العربية وأسعار مرنة...',
  },
]

const extracted = [
  { label: 'علامتك', status: 'مذكورة', icon: CircleDot, tone: 'text-brand bg-accent' },
  { label: 'منافس أ', status: 'موصى بها', icon: Star, tone: 'text-emerald bg-emerald/10' },
  { label: 'منافس ب', status: 'مذكورة', icon: CircleDot, tone: 'text-brand bg-accent' },
  { label: 'مصدر مرصود', status: 'example-source.sa', icon: Globe, tone: 'text-cyan bg-cyan/10' },
]

function TypedText({ text }: { text: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(0)
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id)
          return c
        }
        return c + 2
      })
    }, 22)
    return () => clearInterval(id)
  }, [text])
  return (
    <span>
      {text.slice(0, count)}
      {count < text.length && <span className="ms-0.5 inline-block h-4 w-0.5 animate-pulse bg-brand align-middle" />}
    </span>
  )
}

export function ProductShowcase() {
  const [active, setActive] = useState(tabs[0].id)
  const [promptIndex, setPromptIndex] = useState(0)
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]
  const prompt = prompts[promptIndex]

  return (
    <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="showcase-title">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[480px] bg-gradient-to-b from-brand/5 via-cyan/5 to-transparent blur-2xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="داخل المنصة"
          title={<span id="showcase-title">من إجابات الذكاء الاصطناعي الخام إلى رؤى قابلة للتنفيذ.</span>}
          description="تحوّل Strevety الإجابات التي يولّدها الذكاء الاصطناعي إلى رؤى منظّمة حول الظهور، تساعد الفرق على اتخاذ قرارات مدروسة. جرّب التنقل بين الأقسام."
        />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-float">
            <div className="grid lg:grid-cols-[220px_1fr]">
              <aside className="border-b border-border bg-background/60 p-3 lg:border-b-0 lg:border-l">
                <p className="hidden px-3 pb-2 pt-1 text-[11px] font-bold text-muted-foreground lg:block">مساحة العمل</p>
                <div role="tablist" aria-label="أقسام لوحة التحكم" className="flex gap-1 overflow-x-auto lg:flex-col">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      role="tab"
                      type="button"
                      aria-selected={active === t.id}
                      aria-controls="showcase-panel"
                      onClick={() => setActive(t.id)}
                      className={cn(
                        'flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                        active === t.id
                          ? 'bg-white text-brand-deep shadow-sm ring-1 ring-border'
                          : 'text-muted-foreground hover:bg-white/70 hover:text-navy',
                      )}
                    >
                      <t.icon className="size-4" aria-hidden="true" />
                      {t.label}
                    </button>
                  ))}
                </div>
              </aside>

              <div id="showcase-panel" role="tabpanel" className="grid gap-4 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold text-navy">{tab.label}</h3>
                  <SampleBadge />
                </div>
                <div key={tab.id} className="animate-in fade-in slide-in-from-bottom-2 grid gap-4 duration-500">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {tab.metrics.map((m) => (
                      <MetricCard key={m.label} metric={m} />
                    ))}
                  </div>
                  <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
                    <VisibilityChart series={tab.series} title={tab.chartTitle} height={180} />
                    <CompetitorComparison
                      items={[
                        { name: 'علامتك', value: tab.metrics[0].value, highlight: true },
                        { name: 'منافس أ', value: Math.min(tab.metrics[0].value + 12, 96) },
                        { name: 'منافس ب', value: Math.max(tab.metrics[0].value - 14, 8) },
                        { name: 'منافس ج', value: Math.max(tab.metrics[0].value - 27, 5) },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid gap-4 rounded-2xl border border-border bg-background p-4 md:p-5 xl:grid-cols-[1.4fr_1fr]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <MessageSquareText className="size-4 text-brand" aria-hidden="true" />
                      تحليل استفسار نموذجي
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {prompts.map((p, i) => (
                        <button
                          key={p.q}
                          type="button"
                          onClick={() => setPromptIndex(i)}
                          aria-pressed={promptIndex === i}
                          className={cn(
                            'rounded-full border px-3 py-1 text-xs transition-all',
                            promptIndex === i
                              ? 'border-brand bg-brand text-white'
                              : 'border-border bg-white text-navy/70 hover:border-brand/40',
                          )}
                        >
                          استفسار {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-xl border border-border bg-white p-3.5">
                      <p className="text-[11px] font-bold text-muted-foreground">الاستفسار</p>
                      <p className="mt-1 font-bold text-navy">{prompt.q}</p>
                    </div>
                    <div className="flex gap-3 rounded-xl border border-border bg-white p-3.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                        <Bot className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold text-muted-foreground">إجابة ذكاء اصطناعي نموذجية</p>
                        <p className="mt-1 min-h-12 text-sm leading-relaxed text-navy/80">
                          <TypedText text={prompt.a} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <CheckCircle2 className="size-4 text-emerald" aria-hidden="true" />
                      الرؤى المستخرجة
                    </p>
                    <ul key={promptIndex} className="flex flex-col gap-2">
                      {extracted.map((e, i) => (
                        <li
                          key={e.label}
                          className="animate-in fade-in slide-in-from-left-2 flex items-center justify-between gap-2 rounded-xl border border-border bg-white px-3 py-2.5 fill-mode-both duration-500"
                          style={{ animationDelay: `${300 + i * 150}ms` }}
                        >
                          <span className="text-sm font-medium text-navy">{e.label}</span>
                          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold', e.tone)}>
                            <e.icon className="size-3" aria-hidden="true" />
                            <span dir="auto">{e.status}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
