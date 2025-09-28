"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const Sparkles = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--highlight) / 0.6) 1px, transparent 1px)`,
            backgroundSize: `1.5rem 1.5rem`,
            maskImage: `radial-gradient(ellipse at center, white, transparent 70%)`,
          }}
        />
      </div>
      {children}
    </div>
  );
};