import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Phato - Iluminando a Verdade na Era da Desinformação",
  description:
    "A Phato é uma empresa de tecnologia dedicada a combater a desinformação através de inteligência artificial avançada.",
  generator: "Phato",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Suspense fallback={null}>
          <main className="flex-1">{children}</main>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
