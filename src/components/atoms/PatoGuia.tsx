// src/components/atoms/PatoGuia.tsx

/**
 * A simple visual representation of the Pato-Guia.
 * For now, it's a styled div, but can be replaced with a Lottie animation.
 */
export default function PatoGuia() {
  // Using an inline SVG for the duck shape for simplicity and performance.
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 100 100" fill="#ffbc59">
        <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z M80,50 C80,45 78,40 75,38 C80,42 82,48 82,50 C82,55 80,60 75,62 C78,60 80,55 80,50 Z M60,35 C62,35 64,37 64,40 C64,43 62,45 60,45 C58,45 56,43 56,40 C56,37 58,35 60,35 Z" />
      </svg>
    </div>
  );
}
