'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Check, Sparkles, TrendingUp, Quote } from 'lucide-react'

const LogoScene = dynamic(() => import('./logo-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center">
      <Image
        src="/images/strevety-mark.png"
        alt=""
        width={330}
        height={435}
        className="h-48 w-auto animate-pulse mix-blend-multiply"
      />
    </div>
  ),
})

const points = [
  'قِس ظهور علامتك التجارية عبر منصات الذكاء الاصطناعي.',
  'اكتشف فجوات المنافسين ومصادر الاستشهاد.',
  'حوّل الرؤى إلى فرص نمو قابلة للتنفيذ.',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 size-[720px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="flex flex-col items-start gap-7">
          <span className="animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3 py-1.5 text-xs font-bold text-brand-deep shadow-sm duration-700">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-emerald animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald" />
            </span>
            ذكاء الظهور في الذكاء الاصطناعي
          </span>

          <h1
            id="hero-title"
            className="animate-in fade-in slide-in-from-bottom-4 text-balance text-[2.6rem] font-extrabold leading-[1.15] text-navy duration-700 sm:text-6xl lg:text-[4.2rem]"
          >
            اجعل علامتك التجارية
            <br />
            <span className="text-gradient-brand">هي الإجابة.</span>
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground delay-150 duration-700 fill-mode-both">
            الذكاء الاصطناعي يغيّر طريقة اكتشاف الناس للعلامات التجارية واختيارها. تساعدك Strevety على قياس ظهورك،
            وفهم منافسيك، واكتشاف الفرص في الإجابات التي يولّدها الذكاء الاصطناعي.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col gap-3 delay-300 duration-700 fill-mode-both sm:w-auto sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              ابدأ مجانًا
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-base font-bold text-navy transition-all hover:-translate-y-0.5 hover:border-brand/40"
            >
              <CalendarDays className="size-4 text-brand" aria-hidden="true" />
              احجز عرضًا توضيحيًا
            </Link>
          </div>

          <ul className="flex flex-col gap-2.5">
            {points.map((point, i) => (
              <li
                key={point}
                className="animate-in fade-in slide-in-from-right-4 flex items-center gap-2.5 text-sm text-navy/80 duration-700 fill-mode-both"
                style={{ animationDelay: `${450 + i * 120}ms` }}
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald/12 text-emerald">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p className="text-xs font-medium text-muted-foreground">افهم ظهورك. اكتشف الفجوات. اتخذ الإجراء.</p>
        </div>

        <div className="relative h-[420px] sm:h-[500px] lg:h-[580px]">
          <div
            className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-br from-brand/15 via-cyan/10 to-emerald/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
            <LogoScene />
          </div>

          <div className="animate-float pointer-events-none absolute left-0 top-6 rounded-2xl border border-border bg-white/90 p-3.5 shadow-float backdrop-blur sm:left-4">
            <p className="text-[11px] font-medium text-muted-foreground">نسبة الظهور</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="tabular text-2xl font-extrabold text-navy">68%</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald">
                <TrendingUp className="size-3" aria-hidden="true" />
                +12
              </span>
            </div>
            <div className="mt-2 flex h-6 items-end gap-1" aria-hidden="true">
              {[30, 45, 38, 55, 50, 68, 74].map((h, i) => (
                <span key={i} className="w-2 rounded-sm bg-brand/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="animate-float-slow pointer-events-none absolute bottom-16 left-0 max-w-[230px] rounded-2xl border border-border bg-white/90 p-3.5 shadow-float backdrop-blur sm:left-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-brand-deep">
              <Sparkles className="size-3.5" aria-hidden="true" />
              تم رصد فرصة ظهور
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-navy/80">
              علامتك أقل حضورًا في استفسارات المقارنة عالية النية.
            </p>
          </div>

          <div
            className="animate-float pointer-events-none absolute bottom-2 right-8 hidden items-center gap-2 rounded-full border border-border bg-white/90 px-3 py-2 shadow-float backdrop-blur sm:flex"
            style={{ animationDelay: '1.2s' }}
          >
            <Quote className="size-3.5 text-emerald" aria-hidden="true" />
            <span className="text-xs font-bold text-navy">تمت التوصية بعلامتك</span>
          </div>

          <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-muted-foreground/80 max-sm:hidden">
            حرّك المؤشر للتفاعل مع الشعار
          </p>
        </div>
      </div>
    </section>
  )
}
