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
        // Cores da nossa paleta. Utilizadas para manter a consistência do design.
        background: '#0d0d0d',  // Fundo padrão
        primary: '#E0E0E0',    // Texto principal
        secondary: '#a3a3a3',   // Texto secundário
        accent: '#ffbc59',      // Cor de destaque (amarelo Phato)
      },
      fontFamily: {
        // Fonte padrão do projeto, "Inter"
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
