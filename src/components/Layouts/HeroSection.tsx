import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import Hero from "../../assets/hero.jpg";

interface HeroSectionProps {
  id?: string;
}

export default function HeroSection({ id = "" }: Readonly<HeroSectionProps>) {
  return (
    <motion.div
      className="w-full h-screen flex md:flex-row flex-col relative"
      id={id}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="font-italiana lg:text-6xl md:text-5xl sm:text-4xl text-3xl transition-all duration-300">
          The Wedding of
        </h2>
        <h1 className="font-italiana lg:text-8xl md:text-7xl sm:text-6xl text-5xl transition-all duration-300">
          Nico Saputra
        </h1>
        <p className="font-italiana lg:text-8xl md:text-7xl sm:text-6xl text-5xl transition-all duration-300">
          &
        </p>
        <h1 className="font-italiana lg:text-8xl md:text-7xl sm:text-6xl text-5xl transition-all duration-300">
          Devi Natalia
        </h1>
        <p className="font-inter lg:text-2xl md:text-lg hidden md:flex lg:mt-20 mt-10 duration-300 transition-all font-extralight">
          24 November 2024
        </p>
      </div>

      <div className="flex-1 min-h-0 relative">
        <img
          src={Hero}
          alt=""
          className="h-full w-full object-cover brightness-60"
        />
        <p className="font-inter md:hidden absolute bottom-4 left-1/2 -translate-1/2 z-10 flex text-base text-white font-extralight duration-300 transition-all">
          24 November 2024
        </p>
      </div>

      {/* <div className="absolute lg:w-30 md:w-25 w-20 aspect-square rounded-full border-2 top-1/2 left-1/2 -translate-1/2 transition-all duration-300 "></div> */}
    </motion.div>
  );
}
