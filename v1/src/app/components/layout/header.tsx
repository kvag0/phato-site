"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Custom hook para detectar a direção do scroll
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
};

const Header = () => {
  const scrollDirection = useScrollDirection();
  
  return (
    <motion.header
      className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md"
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === "down" ? "-100%" : 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/">
          <motion.svg
            className="h-8 w-8 text-accent"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <circle cx="12" cy="12" r="10" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#0d0d0d"
            >
              P
            </text>
          </motion.svg>
        </Link>
        
        <ul className="flex space-x-6 text-sm">
          {['Missão', 'Tecnologia', 'Ecossistema', 'Conteúdo'].map((text) => (
            <li key={text}>
              <Link href={`/${text.toLowerCase()}`} className="group relative">
                <span className="relative z-10 block transition-colors group-hover:text-accent">{text}</span>
                <span className="absolute left-0 top-full h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
