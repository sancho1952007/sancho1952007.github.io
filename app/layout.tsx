import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { Geist, Geist_Mono } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Sancho Godinho',
  description:
    "Sancho Godinho's official website. Visit the website to learn more about me & my projects!",
  keywords: ['sancho godinho', 'sancho'],
  authors: [{ name: 'Sancho Godinho' }],
  creator: 'Sancho Godinho',
  metadataBase: new URL('https://sancho1952007.vercel.app'),
  openGraph: {
    type: 'website',
    url: 'https://sancho1952007.vercel.app/',
    title: 'Sancho Godinho',
    description:
      "Sancho Godinho's official website. Visit the website to learn more about me & my projects!",
    images: [
      {
        url: 'https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image.png%3Fv%3D1?maxage=15d',
        width: 1200,
        height: 630,
        alt: 'Sancho Godinho\'s Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sancho Godinho',
    description:
      "Sancho Godinho's official website. Visit the website to learn more about me & my projects!",
    images: ['https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image.png%3Fv%3D1?maxage=15d'],
  },
  icons: {
    icon: 'https://gravatar.com/userimage/206490397/3148feef79a3656c62949155a11b8c2f.jpeg?size=100',
    shortcut: 'https://gravatar.com/userimage/206490397/3148feef79a3656c62949155a11b8c2f.jpeg?size=100',
  },
  generator: 'v0.app',
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
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(m)document.documentElement.classList.add('dark');}catch(e){}})();`,
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
