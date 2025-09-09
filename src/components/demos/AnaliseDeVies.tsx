// src/components/demos/AnaliseDeVies.tsx
'use client';

import { useState } from 'react';

/**
 * The interactive component for the Bias Analysis demo.
 * Manages its own state for the URL input and analysis results.
 */
export default function AnaliseDeViesDemo() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      setResult(`Análise para a URL "${url}" concluída. (Resultado simulado)`);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border-2 border-phato-ui bg-phato-card p-8">
      <form onSubmit={handleSubmit}>
        <label htmlFor="url-input" className="block text-lg font-medium text-phato-light">
          Insira o URL da notícia
        </label>
        <div className="mt-2 flex gap-4">
          <input
            type="url"
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com/noticia"
            className="flex-grow rounded-md border-phato-ui bg-phato-black px-4 py-2 text-phato-light focus:border-phato-yellow focus:ring-phato-yellow"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-phato-yellow px-6 py-2 font-semibold text-phato-black transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-phato-ui"
          >
            {isLoading ? 'A analisar...' : 'Analisar'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 rounded-lg bg-phato-black p-4">
            <h3 className="font-semibold text-phato-light">Resultado da Análise:</h3>
            <p className="mt-2 text-phato-text">{result}</p>
        </div>
      )}
    </div>
  );
}
