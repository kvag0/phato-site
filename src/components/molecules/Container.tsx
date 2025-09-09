// src/components/molecules/Container.tsx

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable container component to standardize page and section layouts.
 * It centers content, applies horizontal padding, and sets a max-width
 * to ensure readability and consistency across the site.
 * This is a core "molecule" in our Atomic Design system.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  // `mx-auto` centers the container.
  // `max-w-5xl` sets the maximum width for larger screens.
  // `px-6` applies horizontal padding for smaller screens.
  // The provided `className` allows for additional styling overrides.
  const combinedClassName = `mx-auto max-w-5xl px-6 ${className}`;

  return <div className={combinedClassName}>{children}</div>;
}
