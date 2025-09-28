import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react"

export { Footer }
export default Footer

function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#ffbc59] mb-4">Phato</h3>
              <p className="text-muted-foreground leading-relaxed">
                Iluminando a verdade na era da desinformação através de inteligência artificial avançada e tecnologia de
                ponta.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-[#ffbc59]" />
                <a href="mailto:contato@phato.com" className="hover:text-[#ffbc59] transition-colors">
                  contato@phato.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-[#ffbc59]" />
                <span>São José dos Campos, Brasil</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Navegação</h4>
            <nav className="space-y-3">
              <Link href="/missao" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Nossa Missão
              </Link>
              <Link href="/tecnologia" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Tecnologia
              </Link>
              <Link href="/conteudo" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Conteúdo
              </Link>
              <Link href="/business" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Business
              </Link>
              <Link href="/carreiras" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Carreiras
              </Link>
            </nav>
          </div>

          {/* Products & Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Produtos</h4>
            <nav className="space-y-3">
              <Link href="/fact-check" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Phato App
              </Link>
              <Link href="/api" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                API Phato
              </Link>
              <Link href="/dashboard" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Dashboard
              </Link>
              <Link href="/integracao" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Integrações
              </Link>
              <Link href="/consultoria" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Consultoria
              </Link>
            </nav>
          </div>

          {/* Legal & Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Suporte</h4>
            <nav className="space-y-3">
              <Link href="/ajuda" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Central de Ajuda
              </Link>
              <Link href="/documentacao" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Documentação
              </Link>
              <Link href="/status" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Status do Sistema
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Blog
              </Link>
              <Link href="/contato" className="block text-muted-foreground hover:text-[#ffbc59] transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground font-medium">Siga-nos:</span>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/company/phato"
                  className="p-2 rounded-full bg-[#ffbc59]/10 text-[#ffbc59] hover:bg-[#ffbc59] hover:text-black transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/phato"
                  className="p-2 rounded-full bg-[#ffbc59]/10 text-[#ffbc59] hover:bg-[#ffbc59] hover:text-black transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/phato"
                  className="p-2 rounded-full bg-[#ffbc59]/10 text-[#ffbc59] hover:bg-[#ffbc59] hover:text-black transition-all duration-300"
                  aria-label="Youtube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Seu e-mail para novidades"
                className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#ffbc59] focus:ring-1 focus:ring-[#ffbc59] min-w-[280px]"
              />
              <button className="px-6 py-2 bg-[#ffbc59] text-black font-medium rounded-lg hover:bg-[#ffbc59]/90 transition-colors whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <Link href="/privacidade" className="hover:text-[#ffbc59] transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-[#ffbc59] transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="hover:text-[#ffbc59] transition-colors">
                Política de Cookies
              </Link>
              <Link href="/lgpd" className="hover:text-[#ffbc59] transition-colors">
                LGPD
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Phato. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
