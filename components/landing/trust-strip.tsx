import { Bot, MessagesSquare, Sparkles, SearchCheck, BarChart3, Languages, Globe2 } from 'lucide-react'

const categories = [
  { label: 'البحث بالذكاء الاصطناعي', icon: Bot },
  { label: 'الذكاء الاصطناعي المحادثي', icon: MessagesSquare },
  { label: 'الاكتشاف التوليدي', icon: Sparkles },
  { label: 'ذكاء البحث', icon: SearchCheck },
  { label: 'تحليلات العلامة التجارية', icon: BarChart3 },
  { label: 'البحث باللغة العربية', icon: Languages },
  { label: 'أسواق الخليج', icon: Globe2 },
]

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white py-8" aria-labelledby="trust-title">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <p id="trust-title" className="text-center text-sm font-bold text-muted-foreground">
          صُممت لعصر جديد من الاكتشاف بالذكاء الاصطناعي.
        </p>
      </div>
      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_left,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
          {[...categories, ...categories].map((c, i) => (
            <span
              key={`${c.label}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-navy/70"
              aria-hidden={i >= categories.length}
            >
              <c.icon className="size-4 text-brand" aria-hidden="true" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
