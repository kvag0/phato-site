// src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

export const metadata: Metadata = {
  title: 'Phato | Iluminando o Contexto',
  description: 'Uma plataforma de análise e curadoria de notícias para combater a desinformação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="flex min-h-full flex-col bg-phato-black text-phato-text">
        <Header />
        <main className="flex-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
