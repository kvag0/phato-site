import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Esta seção estende a paleta de cores padrão do Tailwind.
        // Criamos um objeto 'phato' para agrupar todas as nossas cores.
        // Isso nos permite usar classes como: bg-phato-black, text-phato-yellow, etc.
        phato: {
          yellow: '#ffbc59', // Cor de destaque para calls-to-action e elementos interativos [cite: 980]
          black: '#0d0d0d',  // A cor de base para fundos escuros [cite: 981]
          card: '#2a2a2a',    // Usado para superfícies secundárias como painéis [cite: 982]
          ui: '#3d3d3d',      // Para elementos de interface menos proeminentes [cite: 983]
          text: '#a3a3a3',    // A cor principal para textos de corpo [cite: 984]
          light: '#E0E0E0',  // Para textos de destaque e ícones [cite: 985]
        }
      },
    },
  },
  plugins: [],
}
export default config