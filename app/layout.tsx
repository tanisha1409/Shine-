import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Tanu's Birthday Surprise",
  description: "A birthday surprise landing page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-[100svh] antialiased">{children}</body>
    </html>
  )
}
