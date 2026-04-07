import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Sancho Godinho - Full-Stack Developer & Startup Founder',
  description:
    'Sancho Godinho is a full-stack developer and founder of Postily. Explore his projects, open-source work, and technical writing.',
  keywords: [
    'Sancho Godinho',
    'full-stack developer',
    'software engineer',
    'Postily',
    'TypeScript developer',
    'React developer',
    'open source',
    'portfolio',
  ],
  authors: [{ name: 'Sancho Godinho' }],
  creator: 'Sancho Godinho',
  metadataBase: new URL('https://sancho1952007.github.io/'),
  openGraph: {
    type: 'website',
    url: 'https://sancho1952007.github.io/',
    title: 'Sancho Godinho - Full-Stack Developer & Startup Founder',
    description:
      'Sancho Godinho is a full-stack developer and founder of Postily. Explore his projects, open-source work, and technical writing.',
    images: [
      {
        url: 'https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image-compressed.png?maxage=15d',
        width: 1200,
        height: 630,
        alt: 'Sancho Godinho — Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sancho Godinho — Full-Stack Developer & Startup Founder',
    description:
      'Sancho Godinho is a full-stack developer and founder of Postily. Explore his projects, open-source work, and technical writing.',
    images: ['https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image-compressed.png?maxage=15d'],
  },
  icons: {
    icon: 'https://gravatar.com/userimage/206490397/3148feef79a3656c62949155a11b8c2f.jpeg?size=100',
    shortcut: 'https://gravatar.com/userimage/206490397/3148feef79a3656c62949155a11b8c2f.jpeg?size=100',
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
        {/* Truly blocking inline script injected before any CSS or React renders.
            Next.js <Script strategy="beforeInteractive"> does NOT block the first
            paint — it only runs before hydration. A raw dangerouslySetInnerHTML
            on <head> is the only way to guarantee zero flash. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
        {/* Rybbit Analytics */}
        <Script
          src="https://rybbit.sg-app.com/api/script.js"
          data-site-id="1"
          strategy="afterInteractive"
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
