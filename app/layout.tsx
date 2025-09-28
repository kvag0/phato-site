import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroller } from "@/components/smooth-scroller"
import { Footer } from "@/components/footer" // [ADDITION]: Importa o Footer
import { Navigation } from "@/components/navigation" // [ADDITION]: Importa a Navegação
import { Background } from "@/components/ui/background"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroller />
          <div className="flex flex-col min-h-screen">
            <Background />
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}