import Link from 'next/link'
import { Logo } from './logo'

const columns = [
  {
    title: 'المنتج',
    links: [
      { label: 'المنصة', href: '#platform' },
      { label: 'كيف تعمل', href: '#how-it-works' },
      { label: 'القطاعات', href: '#industries' },
      { label: 'الأسعار', href: '#pricing' },
    ],
  },
  {
    title: 'الحلول',
    links: [
      { label: 'فرق التسويق', href: '#audience' },
      { label: 'فرق SEO', href: '#audience' },
      { label: 'الوكالات', href: '#audience' },
      { label: 'المؤسسات', href: '#pricing' },
    ],
  },
  {
    title: 'الشركة',
    links: [
      { label: 'من نحن', href: '/about' },
      { label: 'تواصل معنا', href: '/contact' },
      { label: 'احجز عرضًا', href: '/contact' },
    ],
  },
  {
    title: 'قانوني',
    links: [
      { label: 'سياسة الخصوصية', href: '/privacy' },
      { label: 'شروط الاستخدام', href: '/terms' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              منصة لذكاء الظهور في الذكاء الاصطناعي، تساعد العلامات التجارية في السعودية والخليج على فهم حضورها وتنمية
              ظهورها.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-extrabold text-navy">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-brand">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>{'© 2026 Strevety. جميع الحقوق محفوظة.'}</p>
          <p>صُنعت للأسواق العربية والخليجية.</p>
        </div>
      </div>
    </footer>
  )
}
