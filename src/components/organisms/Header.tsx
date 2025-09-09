// src/components/organisms/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

// Navigation links data
const navLinks = [
  { href: '/missao', label: 'A Missão' },
  { href: '/tecnologia', label: 'A Tecnologia' },
  { href: '/ecossistema', label: 'Ecossistema' },
  { href: '/conteudo', label: 'Conteúdo' },
];

/**
 * The main site header component.
 * Includes the brand logo and navigation links.
 * It's a client component to handle the state of the mobile menu.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-bold text-xl text-phato-light tracking-wider">
            PHATO
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-phato-text"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu principal</span>
            {/* Heroicon: menu */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold leading-6 text-phato-text hover:text-phato-light transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu, show/hide based on state */}
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-phato-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
               <Link href="/" className="-m-1.5 p-1.5 font-bold text-xl text-phato-light tracking-wider">
                PHATO
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-phato-text"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Fechar menu</span>
                {/* Heroicon: x-mark */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-phato-text hover:bg-phato-card"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
