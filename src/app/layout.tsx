// Ficheiro: src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'

// Aqui poderíamos importar as nossas fontes customizadas com next/font
// Ex: import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

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
    <html lang="pt-BR">
      {/* A classe do `body` é onde podemos aplicar a nossa fonte principal, se necessário */}
      <body>
        {/* O 'children' aqui será o conteúdo de cada página individual, como a nossa homepage */}
        <main>
          {children}
        </main>
        {/* No futuro, adicionaremos aqui o nosso Header e Footer */}
      </body>
    </html>
  )
}