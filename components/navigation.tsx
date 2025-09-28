"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/missao", name: "Missão" },
  { href: "/tecnologia", name: "Tecnologia" },
  { href: "/conteudo", name: "Conteúdo" },
  { href: "/business", name: "Business" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-sm border-b border-[#3d3d3d]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#ffbc59]">Phato</span>
          </Link>

          {/* [INFO]: Navegação Desktop - Permanece inalterada. */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/missao" className="text-[#a3a3a3] hover:text-[#ffbc59] transition-colors">
              Missão
            </Link> 
            <Link href="/tecnologia" className="text-[#a3a3a3] hover:text-[#ffbc59] transition-colors">
              Tecnologia
            </Link>
            <Link href="/conteudo" className="text-[#a3a3a3] hover:text-[#ffbc59] transition-colors">
              Conteúdo
            </Link>
            <Link
              href="/business"
              className="bg-[#ffbc59] text-[#0d0d0d] px-4 py-2 rounded-lg hover:bg-[#ffbc59]/90 transition-colors font-semibold"
            >
              Business
            </Link>
          </div>
          
          {/* [NOVO]: Botão Hamburger para Mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="w-6 h-8 relative focus:outline-none z-50"
              aria-label="Abrir menu"
              animate={isOpen ? "open" : "closed"}
            >
              {/* [MICRO-INTERACTION]: Animação das linhas do ícone */}
              <motion.span
                className="absolute h-0.5 w-full bg-[#ffbc59]"
                variants={{
                  closed: { top: "20%", rotate: 0, y: 0 },
                  open: { top: "50%", rotate: 45, y: "-50%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#ffbc59]"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute h-0.5 w-full bg-[#ffbc59]"
                variants={{
                  closed: { top: "75%", rotate: 0, y: 0 },
                  open: { top: "50%", rotate: -45, y: "-50%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* [NOVO]: Menu Overlay para Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-lg md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ y: "-20%" }}
              animate={{ y: 0 }}
              exit={{ y: "-20%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="container mx-auto px-4 pt-24"
            >
              <ul className="flex flex-col items-center gap-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1), ease: "easeInOut" }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className={cn(
                        "block w-full text-center text-3xl font-medium py-4 rounded-lg",
                         pathname === item.href
                          ? "text-[#ffbc59]"
                          : "text-[#a3a3a3] hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}