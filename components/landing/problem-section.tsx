import { EyeOff, ChartNoAxesCombined, Network } from 'lucide-react'
import { Reveal, SectionHeading } from './reveal'
import { TiltCard } from './tilt-card'

const problems = [
  {
    icon: EyeOff,
    title: 'حضور غائب للعلامة',
    description: 'قد تكون علامتك غائبة عن المحادثات التي يتخذ فيها عملاؤك المحتملون قراراتهم.',
    accent: 'from-brand/15 to-brand/0',
    iconClass: 'bg-brand text-white',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'أفضلية المنافسين',
    description: 'افهم أي المنافسين يُذكرون ويُوصى بهم ويُستشهد بهم بدلًا من علامتك.',
    accent: 'from-cyan/15 to-cyan/0',
    iconClass: 'bg-cyan text-white',
  },
  {
    icon: Network,
    title: 'مصادر معلومات مجهولة',
    description: 'اكتشف المواقع والمصادر التي تؤثر في طريقة وصف أنظمة الذكاء الاصطناعي لقطاعك.',
    accent: 'from-emerald/15 to-emerald/0',
    iconClass: 'bg-emerald text-white',
  },
]

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="problem-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="التحدي"
          title={<span id="problem-title">البحث يتغير. هل علامتك ظاهرة؟</span>}
          description="يكتشف عملاؤك العلامات التجارية بشكل متزايد عبر إجابات الذكاء الاصطناعي. الترتيب التقليدي في محركات البحث وحده لا يفسّر كيف تصف أنظمة الذكاء الاصطناعي الشركات وتقارن بينها وتوصي بها."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <TiltCard className="p-7">
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${p.accent}`} aria-hidden="true" />
                <div className="relative">
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl shadow-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg] ${p.iconClass}`}
                  >
                    <p.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold text-navy">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
