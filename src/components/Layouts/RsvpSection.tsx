import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import RsvpForm from "../Fragments/RsvpForm";

import Hero from "../../assets/hero.jpg";

interface RsvpSectionProps {
  id?: string;
}

export default function RsvpSection({ id }: Readonly<RsvpSectionProps>) {
  return (
    <motion.div
      id={id}
      className="w-full flex flex-col items-center my-30 pt-20 gap-5 md:h-auto h-screen"
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="font-italiana text-center md:text-6xl text-5xl transition-all duration-300">
        SHARE YOUR BLESSING
      </h3>
      <p className="font-inter md:text-2xl sm:text-lg text-base text-center font-light md:w-60 transition-all duration-300">
        kindly confirm & write your wishes for us
      </p>
      <div className="max-w-250 flex relative md:h-screen h-full lg:mx-20 sm:mx-10 mx-0">
        <div className="flex md:flex-row flex-col-reverse h-full ">
          <div className="lg:flex-4 flex-3"></div>
          <div className="lg:flex-5 flex-4">
            <img src={Hero} alt="" className="h-full object-cover w-full" />
          </div>
          <RsvpForm className="absolute md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-auto left-1/2 -translate-x-1/2 md:translate-x-0 shadow-2xl bottom-1/4 translate-y-1/2" />
        </div>
      </div>
    </motion.div>
  );
}
