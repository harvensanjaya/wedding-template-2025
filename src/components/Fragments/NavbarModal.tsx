import { motion } from "motion/react";
import { scrollToSection } from "../utils/smoothScroll";

interface NavbarModalProps {
  onClose: () => void;
}

export default function NavbarModal({ onClose }: Readonly<NavbarModalProps>) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.ul
        className="flex flex-col gap-8 text-white text-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
      >
        {[
          { id: "hero", label: "TOP" },
          { id: "wedding", label: "THE WEDDING" },
          { id: "gallery", label: "GALLERY" },
          { id: "rsvp", label: "RSVP" },
          { id: "wishes", label: "WISHES" },
        ].map((item) => (
          <li key={item.id} className="text-center">
            <button
              onClick={() => {
                scrollToSection(item.id);
                onClose();
              }}
              className="py-2"
            >
              {item.label}
            </button>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
