'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Reveal, useInView } from './reveal'

const LogoScene = dynamic(() => import('./logo-scene'), { ssr: false })

export function FinalCta() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)
  return (
    <section className="px-5 py-20 md:px-8 md:py-28" aria-labelledby="cta-title">
      <div
        ref={ref}
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] border border-brand/15 bg-gradient-to-br from-accent via-white to-[#e9fbf4] p-8 md:p-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="flex flex-col items-start gap-6">
            <h2 id="cta-title" className="text-balance text-3xl font-extrabold leading-tight text-navy md:text-5xl md:leading-[1.2]">
              اكتشف كيف تظهر علامتك في <span className="text-gradient-brand">الذكاء الاصطناعي.</span>
            </h2>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              افهم موقعك، واكتشف الفرص، واتخذ قرارات مبنية على البيانات.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 text-base font-bold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                ابدأ مجانًا
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-7 py-4 text-base font-bold text-navy transition-all hover:-translate-y-0.5 hover:border-brand/40"
              >
                احجز عرضًا توضيحيًا
              </Link>
            </div>
          </Reveal>
          <div className="relative h-72 md:h-80">{inView && <LogoScene />}</div>
        </div>
      </div>
    </section>
  )
}
