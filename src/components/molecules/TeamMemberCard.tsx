// src/components/molecules/TeamMemberCard.tsx
'use client';

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

/**
 * A card component to display a team member's profile.
 * Includes a subtle hover animation using Framer Motion.
 */
export default function TeamMemberCard({ name, role, imageUrl, bio }: TeamMemberCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }} // Subtle scale effect on hover
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Image
        className="mx-auto h-56 w-56 rounded-full"
        src={imageUrl}
        alt={`Foto de ${name}`}
        width={224}
        height={224}
      />
      <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-phato-light">
        {name}
      </h3>
      <p className="text-base leading-6 text-phato-yellow">{role}</p>
      <p className="mt-4 text-sm leading-6 text-phato-text">{bio}</p>
    </motion.div>
  );
}
