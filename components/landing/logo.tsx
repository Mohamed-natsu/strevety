import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      dir="ltr"
      className={cn('inline-flex shrink-0 items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring', className)}
      aria-label="Strevety - الصفحة الرئيسية"
    >
      <Image
        src="/images/strevety-logo.png"
        alt="Strevety"
        width={1566}
        height={435}
        priority
        className="h-8 w-auto mix-blend-multiply"
      />
    </Link>
  )
}
