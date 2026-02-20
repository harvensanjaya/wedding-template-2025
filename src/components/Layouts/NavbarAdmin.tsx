import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface NavbarAdminProps {
  active: string;
  onChange: (value: string) => void;
}

export default function NavbarAdmin({
  active,
  onChange,
}: Readonly<NavbarAdminProps>) {
  const [show, setShow] = useState(false);
  const menuItems = [
    { label: "RSVP Detail", value: "rsvp" },
    { label: "Groom & Bride Section", value: "bride-groom" },
    { label: "Gallery Section", value: "gallery" },
  ];
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-1/2 -translate-x-1/2 transition-all duration-300 rounded-xl flex items-center justify-end z-50 my-5 sm:px-10 px-5 sm:w-125 w-full"
    >
      <motion.button
        onClick={() => setShow(!show)}
        className="rounded-full w-10 h-10 flex items-center justify-center bg-black cursor-pointer"
        animate={{ rotate: show ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <MdKeyboardArrowDown size={24} className="text-white" />
      </motion.button>

      {/* CUSTOM SMALL MODAL */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute sm:right-10 right-5 mt-45 bg-black shadow-lg rounded-3xl p-5 pr-10 w-fit z-20"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.25 } },
              }}
              className="flex flex-col gap-1"
            >
              {menuItems.map((item) => (
                <li key={item.value}>
                  <button
                    onClick={() => {
                      onChange(item.value);
                      setShow(false);
                    }}
                    className={`block w-full text-left py-1 rounded-md transition-all duration-200 text-xs font-inter cursor-pointer text-white ${
                      active === item.value ? "opacity-40" : "hover:opacity-40"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
