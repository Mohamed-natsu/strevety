import { ScanSearch, Radar, Link2, SearchCode, WandSparkles, TrendingUp, type LucideIcon } from 'lucide-react'
import { Reveal, SectionHeading } from './reveal'
import { TiltCard } from './tilt-card'
import { cn } from '@/lib/utils'

type Feature = {
  icon: LucideIcon
  title: string
  description: string
  items: string[]
  className: string
  visual?: 'bars' | 'radar' | 'stack'
}

const features: Feature[] = [
  {
    icon: ScanSearch,
    title: 'ذكاء الظهور في الذكاء الاصطناعي',
    description: 'تتبّع عدد مرات ظهور علامتك في إجابات الذكاء الاصطناعي، وكيف تُقدَّم، وهل يُوصى بها.',
    items: ['معدل الذكر', 'معدل التوصية', 'معدل الاستشهاد', 'موقع العلامة', 'الظهور التاريخي'],
    className: 'lg:col-span-4',
    visual: 'bars',
  },
  {
    icon: Radar,
    title: 'ذكاء المنافسين',
    description: 'افهم كيف تُقارَن علامتك بمنافسيها في تجارب الاكتشاف بالذكاء الاصطناعي.',
    items: ['حصة الصوت', 'ظهور المنافسين', 'تحليل فجوات الاستفسارات', 'مقارنة العلامات'],
    className: 'lg:col-span-2',
    visual: 'radar',
  },
  {
    icon: Link2,
    title: 'ذكاء الاستشهادات',
    description: 'حدّد المصادر المستشهد بها في الإجابات واكتشف فرص تعزيز حضورك المعلوماتي.',
    items: ['مصادر الاستشهاد', 'توزيع المصادر', 'مصادر المنافسين', 'فرص الاستشهاد'],
    className: 'lg:col-span-2',
  },
  {
    icon: SearchCode,
    title: 'ذكاء الموقع الإلكتروني',
    description: 'اكتشف المشكلات التقنية والمحتوى التي قد تؤثر على فهم محركات البحث والذكاء الاصطناعي لموقعك.',
    items: ['قابلية الزحف', 'قابلية الفهرسة', 'البيانات المنظمة', 'تحليل المحتوى', 'التدقيق التقني'],
    className: 'lg:col-span-2',
  },
  {
    icon: WandSparkles,
    title: 'استوديو التحسين بالذكاء الاصطناعي',
    description: 'حوّل النتائج التحليلية إلى تحسينات عملية في المحتوى والجوانب التقنية بتوصيات مدعومة بالذكاء الاصطناعي.',
    items: ['توصيات المحتوى', 'توليد الأسئلة الشائعة', 'اقتراحات Schema', 'تحسين المحتوى'],
    className: 'lg:col-span-2',
  },
  {
    icon: TrendingUp,
    title: 'فرص النمو',
    description: 'رتّب أولويات التحسينات الأكثر أهمية بناءً على الأثر المتوقع والجهد والصلة بأعمالك.',
    items: ['تقييم الفرص', 'الأثر مقابل الجهد', 'توصيات ذات أولوية', 'تتبّع التقدم'],
    className: 'lg:col-span-6',
    visual: 'stack',
  },
]

function FeatureVisual({ type }: { type: Feature['visual'] }) {
  if (type === 'bars') {
    return (
      <div className="flex h-28 items-end gap-2" aria-hidden="true">
        {[38, 52, 44, 61, 58, 72, 68, 80, 76, 88].map((h, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-brand/70 to-cyan/70 transition-transform duration-500 group-hover:scale-y-110"
            style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    )
  }
  if (type === 'radar') {
    return (
      <div className="relative mx-auto size-28" aria-hidden="true">
        {[1, 0.7, 0.4].map((s) => (
          <span key={s} className="absolute inset-0 rounded-full border border-brand/20" style={{ transform: `scale(${s})` }} />
        ))}
        <span className="absolute inset-0 animate-spin rounded-full [animation-duration:6s] [background:conic-gradient(from_0deg,rgb(40_107_255/0.25),transparent_30%)]" />
        <span className="absolute right-6 top-6 size-2 rounded-full bg-emerald" />
        <span className="absolute bottom-8 left-5 size-2 rounded-full bg-brand" />
        <span className="absolute bottom-5 right-10 size-1.5 rounded-full bg-cyan" />
      </div>
    )
  }
  if (type === 'stack') {
    const rows = [
      { label: 'صفحات مقارنة للاستفسارات عالية النية', impact: 'أثر مرتفع', effort: 'جهد متوسط', w: 86 },
      { label: 'إضافة بيانات منظمة للأسئلة الشائعة', impact: 'أثر مرتفع', effort: 'جهد منخفض', w: 74 },
      { label: 'تعزيز الحضور في المصادر المرجعية', impact: 'أثر متوسط', effort: 'جهد متوسط', w: 58 },
    ]
    return (
      <ul className="flex flex-col gap-2.5" aria-label="أمثلة توضيحية على الفرص">
        {rows.map((r, i) => (
          <li
            key={r.label}
            className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3 transition-transform duration-300 group-hover:-translate-x-1 sm:flex-row sm:items-center"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="tabular flex size-7 shrink-0 items-center justify-center rounded-lg bg-navy text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-navy">{r.label}</span>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald/12 px-2 py-0.5 text-[11px] font-bold text-emerald">{r.impact}</span>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-brand-deep">{r.effort}</span>
              <span className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted md:block">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${r.w}%` }} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    )
  }
  return null
}

export function FeatureGrid() {
  return (
    <section id="platform" className="scroll-mt-24 bg-white py-20 md:py-28" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="المنصة"
          title={<span id="features-title">كل ما تحتاجه لفهم ظهورك في الذكاء الاصطناعي.</span>}
          description="منصة ذكاء واحدة لقياس الأداء وفهم المنافسين واكتشاف مواضع التحسين."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 100} className={f.className}>
              <TiltCard intensity={f.className.includes('col-span-6') ? 2 : 5} className="bg-background p-6 md:p-7">
                <div
                  className={cn(
                    'flex h-full flex-col gap-6',
                    f.visual === 'stack' && 'lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-center',
                    f.visual === 'bars' && 'md:grid md:grid-cols-[1.2fr_1fr] md:items-end',
                  )}
                >
                  <div className="flex flex-col gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-brand/15 bg-white text-brand shadow-sm transition-colors group-hover:bg-brand group-hover:text-white">
                      <f.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-extrabold text-navy md:text-xl">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.description}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {f.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-medium text-navy/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {f.visual && <FeatureVisual type={f.visual} />}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
