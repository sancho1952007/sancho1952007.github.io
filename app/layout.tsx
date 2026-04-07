import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'Sancho Godinho — Programmer & Security Researcher',
  description:
    'Programmer, Security Researcher, and Tech Enthusiast who loves building things for the web and exploring the intersection of code and security.',
  openGraph: {
    title: 'Sancho Godinho — Programmer & Security Researcher',
    description:
      'Programmer, Security Researcher, and Tech Enthusiast who loves building things for the web and exploring the intersection of code and security.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script — runs before first paint to stamp .dark on <html>,
            preventing any flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(m)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
