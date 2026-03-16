import type { Variants } from "motion/react";

export const fadeUpSection: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.3,
      ease: [0.25, 0.1, 0.25, 1], // easeOut equivalent
    },
  },
};
