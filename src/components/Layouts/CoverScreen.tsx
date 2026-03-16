import { AnimatePresence, motion } from "motion/react";

import coverImage from "../../assets/cover.jpg";
import Button from "../Elements/Button";
import Ornaments from "../Fragments/Ornaments";

interface CoverScreenProps {
  onClick?: () => void;
}

export default function CoverScreen({
  onClick = () => {},
}: Readonly<CoverScreenProps>) {
  return (
    <AnimatePresence>
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-linear-to-tr
        from-black from-10%
        via-black/80 via-40%
        to-black to-90%
        z-30"
        />

        <motion.div
          className="relative mx-auto z-50 xl:w-2/5 md:w-3/5 sm:w-4/5 w-full bg-white h-screen sm:py-10 py-20 flex flex-col justify-center sm:gap-10 gap-20 transition-all duration-300 overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.5 } },
          }}
        >
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
            }}
            transition={{ duration: 1.3 }}
          >
            <motion.img
              src={coverImage}
              alt="Cover"
              className="z-20 xl:w-1/2 lg:w-3/7 max-w-4/7 rounded-2xl shadow-xl/40 mb-10 aspect-3/4 object-cover transition-all duration-300"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 1.3 }}
            />
            <motion.h2
              className="font-inter lg:text-2xl sm:text-xl text-base font-extralight transition-all duration-300"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 1.3 }}
            >
              The Wedding Of
            </motion.h2>
            <motion.h1
              className="font-italiana lg:text-7xl sm:text-6xl text-5xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 1.3 }}
            >
              Nico & Devi
            </motion.h1>
            <motion.p
              className="font-inter lg:text-xl sm:text-lg text-base font-extralight transition-all duration-300"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 1.3 }}
            >
              24 November 2025
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center relative z-20"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 1.3 }}
          >
            <p className="font-inter font-extralight lg:text-xl sm:text-lg text-base transition-all duration-300">
              Dear, Hendra
            </p>
            <p className="font-inter font-extralight lg:text-xl sm:text-lg text-base pb-5 transition-all duration-300">
              you are invited
            </p>
            <Button onClick={onClick}>Open Full Invitation</Button>
          </motion.div>

          <motion.div
            className="absolute -top-70 right-5 z-10 pointer-events-none"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              type: "spring",
              stiffness: 120,
              mass: 3,
              damping: 12,
            }}
          >
            <Ornaments />
          </motion.div>
          <motion.div
            className="absolute -bottom-60 -left-15 z-10 pointer-events-none"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{
              type: "spring",
              stiffness: 120,
              mass: 3,
              damping: 12,
            }}
          >
            <Ornaments />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
