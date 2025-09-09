// src/components/atoms/SceneryElement.tsx
'use client';

import { useRef, useLayoutEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneryElementProps {
  // Allow the ref to be potentially null, as it is on the first render.
  scrollTriggerRef: React.RefObject<HTMLDivElement | null>;
  className: string;
  speed: number;
  children: ReactNode;
}

/**
 * A reusable component to create a parallax scenery element.
 */
export default function SceneryElement({ scrollTriggerRef, className, speed, children }: SceneryElementProps) {
  const sceneryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check if both this element's ref and the trigger ref are available.
    if (!scrollTriggerRef.current || !sceneryRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(sceneryRef.current, {
        y: `${-50 * speed}vh`, // Adjusted movement for better parallax
        ease: 'none',
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
    }, sceneryRef); // Scope the context to this component

    return () => ctx.revert();
  }, [scrollTriggerRef, speed]);

  return (
    <div ref={sceneryRef} className={`absolute text-phato-ui/20 ${className}`}>
      {children}
    </div>
  );
}

