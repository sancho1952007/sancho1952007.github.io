import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sancho Godinho",
  description: "Sancho Godinho's official website. Visit the website to learn more about my projects & offerings!",
  keywords: ["sancho godinho", "sancho", "programmer", "cyber security researcher", "investor", "tech enthusiast"],
  authors: [{ name: "Sancho Godinho" }],
  creator: "Sancho Godinho",
  metadataBase: new URL("https://sancho1952007.github.io"),
  openGraph: {
    type: "website",
    url: "https://sancho1952007.github.io/",
    title: "Sancho Godinho",
    description: "Sancho Godinho's official website. Visit the website to learn more about my projects & offerings!",
    images: [
      {
        url: "https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image.png%3Fv%3D1?maxage=15d",
        width: 1200,
        height: 630,
        alt: "Sancho Godinho Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sancho Godinho",
    description: "Sancho Godinho's official website. Visit the website to learn more about my projects & offerings!",
    images: ["https://wsrv.nl/?url=https://sancho-s3.sg-app.com/sancho-og-image.png%3Fv%3D1?maxage=15d"],
  },
  icons: {
    icon: "https://gravatar.com/avatar/42705d079b3abfd6235c083eba8d532dd7149add0c83d146f0bbed08417888ce?size=100",
    shortcut: "https://gravatar.com/avatar/42705d079b3abfd6235c083eba8d532dd7149add0c83d146f0bbed08417888ce?size=100",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://gravatar.com/avatar/42705d079b3abfd6235c083eba8d532dd7149add0c83d146f0bbed08417888ce?size=100"
          type="image/x-icon"
        />
      </head>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Script src="https://rybbit.sg-app.com/api/script.js" data-site-id="1" strategy="afterInteractive" />
      </body>
    </html>
  )
}
