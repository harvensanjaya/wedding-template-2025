import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import WeddingRingIcon from "../../assets/wedding-ring.png";
import Button from "../Elements/Button";

interface WeddingSectionProps {
  className?: string;
  id?: string;
}

export default function WeddingSection(props: Readonly<WeddingSectionProps>) {
  const { className = "", id = "" } = props;

  return (
    <motion.div
      id={id}
      className={`w-full flex flex-col justify-center items-center gap-20 pt-20 ${className}`}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-italiana md:text-6xl text-5xl transition-all duration-300">
          THE WEDDING
        </h2>
        <p className="font-inter font-extralight md:text-xl sm:text-lg text-base tracking-tighter transition-all duration-300">
          24 . November . 2025
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="flex md:flex-row flex-col md:gap-10 gap-20 items-center justify-center transition-all transition-discrete duration-300 mx-20">
          <div className="relative transition-all duration-300">
            <div className="md:w-24 w-20 aspect-square rounded-b-full bg-[#d9d9d9] flex justify-center items-center absolute left-1/2 -translate-1/2 top-0 transition-all duration-300">
              <img
                src={WeddingRingIcon}
                alt=""
                className="opacity-40 md:w-13 w-10 transition-all duration-300 scale-x-[-1]"
              />
            </div>
            <div className="h-full flex flex-col justify-center items-center shadow-[0px_4px_22px_3px_rgba(0,0,0,0.1)] md:gap-8 gap-5 transition-all duration-300">
              <h3 className="font-italiana md:text-5xl text-4xl text-black/50 text-center mx-15 md:mt-25 mt-15 transition-all duration-300">
                HOLY MATRIMONY
              </h3>
              <div className="flex flex-col justify-center items-center w-full font-inter text-base tracking-tighter">
                <h4 className="font-medium md:text-xl text-lg duration-300 transition-all">
                  Canisius Catholic Chopel Menteng
                </h4>
                <p className="font-light md:text-lg text-base w-1/2 text-center transition-all duration-300">
                  Jl. Menteng Raya no. 64, Central Jakarta
                </p>
                <p className="font-medium md:text-lg text-base text-black/50 mt-3 transition-all duration-300">
                  12.30 PM
                </p>
              </div>
              <Button className="bg-none rounded-none border md:mb-25 mb-10 duration-300 transition-all">
                OPEN MAPS
              </Button>
            </div>
          </div>
          <div className="relative transition-all duration-300">
            <div className="md:w-24 w-20 aspect-square rounded-b-full bg-[#d9d9d9] flex justify-center items-center absolute left-1/2 -translate-1/2 top-0 transition-all duration-300">
              <img
                src={WeddingRingIcon}
                alt=""
                className="opacity-40 md:w-13 w-10 transition-all duration-300 scale-x-[-1]"
              />
            </div>
            <div className="h-full flex flex-col justify-center items-center shadow-[0px_4px_22px_3px_rgba(0,0,0,0.1)] md:gap-8 gap-5 transition-all duration-300">
              <h3 className="font-italiana md:text-5xl text-4xl text-black/50 text-center mx-15 md:mt-25 mt-15 transition-all duration-300">
                HOLY MATRIMONY
              </h3>
              <div className="flex flex-col justify-center items-center w-full font-inter text-base tracking-tighter">
                <h4 className="font-medium md:text-xl text-lg duration-300 transition-all">
                  Canisius Catholic Chopel Menteng
                </h4>
                <p className="font-light md:text-lg text-base w-1/2 text-center transition-all duration-300">
                  Jl. Menteng Raya no. 64, Central Jakarta
                </p>
                <p className="font-medium md:text-lg text-base text-black/50 mt-3 transition-all duration-300">
                  12.30 PM
                </p>
              </div>
              <Button className="bg-none rounded-none border md:mb-25 mb-10 duration-300 transition-all">
                OPEN MAPS
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:py-20 flex flex-col justify-center items-center gap-10 duration-300 transition-all">
        <div className="flex gap-5 items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
              00
            </p>
            <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
              days
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
              00
            </p>
            <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
              hours
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
              00
            </p>
            <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
              minutes
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
              00
            </p>
            <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
              seconds
            </p>
          </div>
        </div>
        <Button className="bg-none rounded-none border">SAVE THE DATE</Button>
      </div>
    </motion.div>
  );
}
