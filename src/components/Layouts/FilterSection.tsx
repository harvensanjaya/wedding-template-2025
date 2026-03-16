import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import Filter1 from "../../assets/filter1.jpg";
import Filter2 from "../../assets/filter2.jpg";
import Filter3 from "../../assets/filter3.jpg";
import Button from "../Elements/Button";

interface FilterSectionProps {
  className?: string;
}

export default function FilterSection(props: Readonly<FilterSectionProps>) {
  const { className = "" } = props;
  return (
    <motion.div
      className={`w-full flex flex-col justify-center items-center gap-10 ${className}`}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-inter tracking-tighter md:text-xl text-lg font-light transition-all duration-300">
          kindly share your moments with
        </h2>
        <h3 className="font-italiana md:text-6xl text-5xl">#NICahinDEVI</h3>
      </div>
      <div className="flex gap-5 justify-center items-center relative xl:-mt-30 lg:-mt-25 md:-mt-20 sm:-mt-15 -mt-10">
        <img
          src={Filter1}
          alt=""
          className="w-1/4 h-1/4 md:aspect-4/3 aspect-3/4 object-cover xl:mt-50 lg:mt-40 md:mt-30 sm:mt-20 mt-10 transition-all duration-300"
        />
        <img
          src={Filter2}
          alt=""
          className="w-1/4 h-1/4 md:aspect-4/3 aspect-3/4 object-cover mt-0"
        />
        <img
          src={Filter3}
          alt=""
          className="w-1/4 h-1/4 md:aspect-4/3 aspect-3/4 object-cover xl:mt-50 lg:mt-40 md:mt-30 sm:mt-20 mt-10 transition-all duration-300"
        />
      </div>

      <Button className="rounded-none bg-none border">INSTAGRAM FILTER</Button>
    </motion.div>
  );
}
