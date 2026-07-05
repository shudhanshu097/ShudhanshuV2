"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FollowGlow } from "@/components/follow-glow";

type LeadershipCardProps = {
  title: string;
  body: string;
  hoverStat: string;
  icon: string;
  glow: string;
  index: number;
};

export function LeadershipCard({
  title,
  body,
  hoverStat,
  icon,
  glow,
  index,
}: LeadershipCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FollowGlow glow={glow} tilt tiltStrength={18} className="h-full p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg text-[var(--text-muted)]">{icon}</span>
          <h3 className="text-sm uppercase tracking-[0.2em]">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{body}</p>
        <motion.p
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            height: hovered ? "auto" : 0,
            marginTop: hovered ? 12 : 0,
          }}
          className="overflow-hidden text-xs font-medium text-[var(--text)]"
        >
          {hoverStat}
        </motion.p>
      </FollowGlow>
    </motion.div>
  );
}
