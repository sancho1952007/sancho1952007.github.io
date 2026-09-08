import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { Geist, Geist_Mono } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const geistPixelSquare = localFont({
  src: '../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2',
  variable: '--font-geist-pixel-square',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6366f1',
  colorScheme: 'dark light',
}

export const metadata: Metadata = {
  title: 'Sancho Godinho | Full-Stack Developer & Cybersecurity Researcher',
  description:
    'Portfolio of Sancho Godinho, a Full-Stack Developer and Cybersecurity Researcher at Dodo Payments. Discover my projects, open-source contributions, and technical insights.',
  keywords: [
    'Sancho',
    'Sancho Godinho',
    'Full-Stack Developer',
    'Cybersecurity Researcher',
    'Hacker',
    'Software Engineer',
    'Dodo Payments',
    'TypeScript',
    'React',
    'Web Security',
    'Bug Bounty',
    'Portfolio',
  ],
  authors: [{ name: 'Sancho Godinho' }],
  creator: 'Sancho Godinho',
  publisher: 'Sancho Godinho',
  metadataBase: new URL('https://sancho.sg-app.com/'),
  alternates: {
    canonical: '/',
    languages: {
      'en': 'https://sancho.sg-app.com/',
      'x-default': 'https://sancho.sg-app.com/',
    }
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Sancho',
    lastName: 'Godinho',
    username: 'sancho1952007',
    url: 'https://sancho.sg-app.com/',
    title: 'Sancho Godinho | Full-Stack Developer & Cybersecurity Researcher',
    description:
      'Portfolio of Sancho Godinho, a Full-Stack Developer and Cybersecurity Researcher at Dodo Payments. Discover my projects, open-source contributions, and technical insights.',
    images: [
      {
        url: 'https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image.png?maxage=15d&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Sancho Godinho - Full-Stack Developer & Cybersecurity Researcher Portfolio',
      },
    ],
    siteName: 'Sancho Godinho Portfolio',
    locale: 'en_US',
    alternateLocale: 'en_GB',
  },
  // Use full res image on X
  twitter: {
    card: 'summary_large_image',
    title: 'Sancho Godinho | Full-Stack Developer & Cybersecurity Researcher',
    description:
      'Portfolio of Sancho Godinho, a Full-Stack Developer and Cybersecurity Researcher at Dodo Payments. Discover my projects, open-source contributions, and technical insights.',
    images: ['https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image.png?maxage=15d'],
    creator: '@sanchogodinho',
    site: '@sanchogodinho',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
  other: {
    'geo.region': 'Earth',
    'geo.placename': 'Remote',
    'language': 'English',
    'revisit-after': '3 days',
    'rating': 'General',
    'distribution': 'Global',
    'coverage': 'Worldwide',
    'target': 'all',
    'article:author': 'Sancho Godinho',
    'article:publisher': 'https://sancho.sg-app.com/',
    'linkedin:owner': 'Sancho Godinho',
  }
}

import TechGrid from '@/components/tech-grid'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement,c=d.classList;var e=null;try{e=localStorage.getItem('theme')||sessionStorage.getItem('theme')}catch(x){}c.remove('light','dark');if(e==='light'){c.add('light');d.style.colorScheme='light'}else if(e==='dark'){c.add('dark');d.style.colorScheme='dark'}else if(e==='system'){var m=window.matchMedia('(prefers-color-scheme: dark)');var t=m.matches?'dark':'light';c.add(t);d.style.colorScheme=t}else{c.add('dark');d.style.colorScheme='dark'}}catch(e){}}()`,
          }}
        />

        {/* Rybbit Analytics */}
        <Script
          src="https://rybbit.sg-app.com/api/script.js"
          data-site-id="1"
          strategy="afterInteractive"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sancho Godinho',
              url: 'https://sancho.sg-app.com',
              image: 'https://sancho.sg-app.com/pfp.png',
              sameAs: [
                'https://hackerone.com/sancho-godinho',
                'https://github.com/sancho1952007'
              ],
              jobTitle: 'Full-stack developer & cybersecurity researcher',
              worksFor: {
                '@type': 'Organization',
                name: 'Dodo Payments'
              },
              description: 'Full-Stack Developer and Cybersecurity Researcher focusing on Web Security, Penetration Testing, and Bug Bounties.',
              knowsAbout: [
                'Web Security',
                'Cybersecurity',
                'Bug Bounty Hunting',
                'Penetration Testing',
                'Full-Stack Development',
                'TypeScript',
                'React'
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${geistPixelSquare.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <TechGrid />
        {children}
      </body>
    </html>
  )
}
