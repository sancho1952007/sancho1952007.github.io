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
  metadataBase: new URL('https://sancho1952007.github.io/'),
  alternates: {
    canonical: '/',
    languages: {
      'en': 'https://sancho1952007.github.io/',
      'x-default': 'https://sancho1952007.github.io/',
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
    url: 'https://sancho1952007.github.io/',
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
    icon: 'https://gravatar.com/userimage/206490397/3148feef79a3656c62949155a11b8c2f.jpeg?size=100',
    shortcut: 'https://gravatar.com/userimage/206490397/3148feef79a3656c62949155a11b8c2f.jpeg?size=100',
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
    'article:publisher': 'https://sancho1952007.github.io/',
    'linkedin:owner': 'Sancho Godinho',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=sessionStorage.getItem('theme');if('system'===e||(!e)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.classList.add('dark')}else{d.classList.add('light')}}else if(e){c.add(e||'')}if(e==='light'||e==='dark'){d.style.colorScheme=e}}catch(e){}}()`,
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
              url: 'https://sancho1952007.github.io',
              image: 'https://sancho1952007.github.io/pfp.png',
              sameAs: [
                'https://hackerone.com/sancho-godinho',
                'https://github.com/sancho1952007'
              ],
              jobTitle: 'Full-stack developer & cybersecurity researcher',
              worksFor: {
                '@type': 'Organization',
                name: 'Dodo Payments'
              }
            })
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${geistPixelSquare.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
