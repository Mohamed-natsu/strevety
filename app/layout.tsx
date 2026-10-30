import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Strevety | اجعل علامتك التجارية هي الإجابة',
  description:
    'منصة Strevety لذكاء الظهور في الذكاء الاصطناعي: قِس ظهور علامتك التجارية في إجابات الذكاء الاصطناعي، وافهم منافسيك، واكتشف فرص النمو في السعودية والخليج.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon-light-32x32.png' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f9fd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
