// src/components/missao/InteractiveKeyword.tsx
'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import PatoTooltip from './PatoTooltip';

// O ícone do pato como um componente SVG para facilitar o uso.
const PatoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1 text-phato-yellow/70">
    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.13 9.25h6.118a1.5 1.5 0 001.445-1.086l1.414-4.925a.75.75 0 00-.826-.95A22.221 22.221 0 0010 2.25c-1.32.01-2.63.09-3.928.249zM10 12.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path fillRule="evenodd" d="M.664 11.59a1.5 1.5 0 000 2.82l.873.348a11.95 11.95 0 002.824 1.186.75.75 0 10.33-1.423 10.45 10.45 0 01-2.228-1.025l-.873-.348a.75.75 0 00-.826-.534zM16.94 14.757a.75.75 0 10.33 1.423 11.95 11.95 0 002.823-1.186l.874-.348a1.5 1.5 0 000-2.82l-.873-.348a.75.75 0 00-.826.534 10.45 10.45 0 01-2.228 1.025l-.873.348z" clipRule="evenodd" />
  </svg>
);


interface InteractiveKeywordProps {
  children: React.ReactNode;
  patoNote?: string; // A nota é opcional.
}

/**
 * Um componente que envolve palavras-chave, tornando-as interativas.
 * Se uma 'patoNote' for fornecida, exibe um ícone clicável que abre um tooltip.
 */
export default function InteractiveKeyword({ children, patoNote }: InteractiveKeywordProps) {
  // Se não houver nota, renderiza apenas o texto com estilo de hover.
  if (!patoNote) {
    return (
      <span className="text-phato-yellow/90 font-semibold cursor-pointer transition-colors hover:text-phato-yellow">
        {children}
      </span>
    );
  }

  // Se houver uma nota, usa o Popover do Headless UI.
  return (
    <Popover className="relative inline-flex items-center">
      {({ open }) => (
        <>
          <span className="text-phato-yellow/90 font-semibold">{children}</span>
          <Popover.Button
            className="flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-phato-yellow"
            aria-label={`Nota do Pato sobre ${children}`}
          >
            <PatoIcon />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute bottom-full left-1/2 z-10 mb-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
              <PatoTooltip note={patoNote} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
