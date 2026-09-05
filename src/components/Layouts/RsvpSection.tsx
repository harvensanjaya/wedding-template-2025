import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import RsvpForm from "../Fragments/RsvpForm";

import Hero from "../../assets/hero.jpg";

interface RsvpSectionProps {
  id?: string;
  image?: string;
}

export default function RsvpSection({ id, image }: Readonly<RsvpSectionProps>) {
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
      <div className="w-full max-w-250 relative md:h-screen min-h-screen lg:mx-20 sm:mx-10 mx-0">
        <div className="flex md:flex-row flex-col-reverse h-full w-full min-h-0">
          {/* Left / Empty */}
          <div className="lg:flex-4 flex-3 min-h-0"></div>

          {/* Image */}
          <div className="lg:flex-5 flex-4 min-w-0 min-h-0">
            <img
              src={image || Hero}
              alt=""
              className="w-full h-full object-cover block"
            />
          </div>

          <RsvpForm
            className="
        absolute
        md:top-1/2 md:bottom-auto md:-translate-y-1/2
        md:left-auto
        left-1/2 -translate-x-1/2 md:translate-x-0
        shadow-2xl
        bottom-3/5 translate-y-1/2
      "
          />
        </div>
      </div>
    </motion.div>
  );
}
