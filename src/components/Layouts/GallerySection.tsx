import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import Image1 from "../../assets/download (3).jpg";
import Image2 from "../../assets/download (4).jpg";
import Image3 from "../../assets/download (5).jpg";
import Image4 from "../../assets/download (6).jpg";
import Image5 from "../../assets/download (7).jpg";
import Image6 from "../../assets/download (8).jpg";

interface GallerySectionProps {
  className?: string;
  onOpen?: () => void;
  id?: string;
}

export default function GallerySection(props: Readonly<GallerySectionProps>) {
  const { className = "", onOpen = () => {}, id = "" } = props;

  return (
    <motion.div
      id={id}
      className={`w-full flex flex-col justify-center items-center gap-10 pt-20 ${className}`}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="font-italiana md:text-6xl text-5xl transition-all duration-300">
        GALLERY
      </h2>
      <div className="grid w-full grid-cols-6 lg:auto-rows-[400px] auto-rows-[200px]">
        <button
          className="col-span-2 w-full h-full cursor-pointer"
          onClick={onOpen}
        >
          <img src={Image1} alt="" className="w-full h-full object-cover" />
        </button>
        <button
          className="col-span-4 w-full h-full cursor-pointer"
          onClick={onOpen}
        >
          <img src={Image2} alt="" className="w-full h-full object-cover" />
        </button>
        <button
          className=" col-span-3 w-full h-full cursor-pointer"
          onClick={onOpen}
        >
          <img src={Image3} alt="" className=" w-full h-full object-cover" />
        </button>
        <button
          className="col-span-3 w-full h-full cursor-pointer"
          onClick={onOpen}
        >
          <img src={Image4} alt="" className="w-full h-full object-cover" />
        </button>
        <button
          className="col-span-4 w-full h-full cursor-pointer"
          onClick={onOpen}
        >
          <img src={Image5} alt="" className="w-full h-full object-cover" />
        </button>
        <button className="col-span-2 w-full h-full" onClick={onOpen}>
          <img src={Image6} alt="" className="w-full h-full object-cover" />
        </button>
      </div>
    </motion.div>
  );
}
