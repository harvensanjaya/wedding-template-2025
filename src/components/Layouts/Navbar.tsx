import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavbarState } from "../Fragments/useNavbarState";
import { useScrollSpy } from "../Fragments/useScrollSpy";
import { scrollToSection } from "../utils/smoothScroll";

import { IoMdClose } from "react-icons/io";
import { TbMenu3 } from "react-icons/tb";
import NavbarModal from "../Fragments/NavbarModal";

const SECTIONS = [
  { id: "wedding", label: "THE WEDDING" },
  { id: "gallery", label: "GALLERY" },
  { id: "rsvp", label: "RSVP" },
  { id: "wishes", label: "WISHES" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));
  const navState = useNavbarState({
    transparentIds: ["hero"],
    hiddenIds: ["footer"],
  });

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 h-fit transition-all duration-300
      ${navState !== "transparent" ? "bg-black" : "bg-transparent"}
    `}
        animate={{
          y: navState === "hidden" ? -100 : 0,
          opacity: navState === "hidden" ? 0 : 1,
        }}
      >
        <div className='flex justify-center items-center w-full max-w-250 mx-auto'>
          <div className='flex-1 text-white font-italiana text-2xl px-5'>
            Nico & Devi
          </div>
          <ul className='flex-1 md:flex hidden font-inter gap-10 justify-end text-base text-white '>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className={`p-2 py-4 cursor-pointer ${
                    activeId === s.id ? "border-b-2 border-b-white" : "border-0"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <button className='md:p-0 p-5' onClick={() => setShowMenu(!showMenu)}>
            {showMenu === true ? (
              <IoMdClose className='text-white md:hidden text-2xl ' />
            ) : (
              <TbMenu3 className='text-white md:hidden text-2xl ' />
            )}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {showMenu && navState !== "hidden" && (
          <NavbarModal onClose={() => setShowMenu(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
