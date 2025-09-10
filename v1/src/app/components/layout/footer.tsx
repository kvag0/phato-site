import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-background py-8 text-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Coluna 1: Links de navegação */}
        <div>
          <h4 className="mb-2 text-lg font-semibold text-primary">Navegação</h4>
          <ul className="space-y-1">
            {['Missão', 'Tecnologia', 'Ecossistema', 'Conteúdo'].map((text) => (
              <li key={text}>
                <Link href={`/${text.toLowerCase()}`} className="hover:text-accent transition-colors">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Coluna 2: Ícones de redes sociais */}
        <div>
          <h4 className="mb-2 text-lg font-semibold text-primary">Conecte-se</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        
        {/* Coluna 3: CTA */}
        <div>
          <h4 className="mb-2 text-lg font-semibold text-primary">Junte-se à Missão</h4>
          <button className="mt-2 w-full rounded-md bg-accent px-4 py-2 font-semibold text-background transition-colors hover:bg-yellow-600">
            Inscreva-se na Newsletter
          </button>
        </div>
      </div>
      
      {/* Texto de Copyright */}
      <div className="mt-8 border-t border-secondary pt-4 text-center text-sm">
        <p>© 2025 Phato. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
