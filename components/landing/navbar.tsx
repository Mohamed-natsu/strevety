'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { Logo } from './logo'
import { cn } from '@/lib/utils'

const links = [
  { href: '#platform', label: 'المنصة' },
  { href: '#how-it-works', label: 'كيف تعمل' },
  { href: '#industries', label: 'القطاعات' },
  { href: '#audience', label: 'الحلول' },
  { href: '#pricing', label: 'الأسعار' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-border/80 bg-white/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 md:px-8"
        aria-label="التنقل الرئيسي"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-navy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/signup"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-bold text-navy transition-all hover:border-brand/40 hover:text-brand"
          >
            احجز عرضًا
          </Link>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white shadow-brand transition-all hover:bg-brand-deep"
          >
            ابدأ مجانًا
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-white text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-brand via-cyan to-emerald"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      {open && (
        <div
          id="mobile-menu"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-white px-5 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-4 text-lg font-bold text-navy"
                >
                  {link.label}
                  <ArrowLeft className="size-4 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-brand py-3.5 text-center font-bold text-white shadow-brand"
            >
              ابدأ مجانًا
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-border py-3.5 text-center font-bold text-navy"
            >
              احجز عرضًا
            </Link>
            <Link href="/signup" className="py-2 text-center text-sm font-medium text-muted-foreground">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
