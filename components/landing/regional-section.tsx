import { Languages, MapPin, LineChart, Building } from 'lucide-react'
import { Reveal, SectionHeading, CountUp } from './reveal'

const items = [
  { icon: Languages, title: 'دعم العربية والإنجليزية', description: 'تحليل الاستفسارات والإجابات باللغتين بدقة.' },
  { icon: MapPin, title: 'رؤى خاصة بالسوق', description: 'نتائج مخصصة للسعودية ودول الخليج.' },
  { icon: LineChart, title: 'معايير مقارنة حسب القطاع', description: 'قارن أداءك بمعايير قطاعك المحلي.' },
  { icon: Building, title: 'مصممة للشركات والوكالات', description: 'صلاحيات وفرق متعددة وتقارير مرنة.' },
]

const stats = [
  { value: 2, suffix: '', label: 'لغتان مدعومتان' },
  { value: 6, suffix: '', label: 'أسواق خليجية' },
  { value: 12, suffix: '+', label: 'قطاعًا مدعومًا' },
]

export function RegionalSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="regional-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white md:p-14">
          <div
            className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-brand/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 right-10 size-80 rounded-full bg-emerald/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden="true"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white/80">
                  <span className="size-1.5 rounded-full bg-emerald" aria-hidden="true" />
                  إقليمي بالأساس
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="regional-title" className="text-balance text-3xl font-extrabold leading-tight md:text-[2.6rem] md:leading-[1.25]">
                  صُممت للأسواق التي تعمل بها.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-pretty text-lg leading-relaxed text-white/70">
                  يختلف الاكتشاف بالذكاء الاصطناعي باختلاف اللغة والسوق والقطاع. تساعد Strevety الشركات في السعودية
                  ومنطقة الخليج على فهم ظهورها في البحث باللغتين العربية والإنجليزية.
                </p>
              </Reveal>
              <Reveal delay={240} className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <CountUp to={s.value} suffix={s.suffix} className="text-3xl font-extrabold md:text-4xl" />
                    <p className="mt-1 text-xs text-white/60 md:text-sm">{s.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-sky/40 hover:bg-white/[0.08]">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-cyan text-white transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-extrabold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
