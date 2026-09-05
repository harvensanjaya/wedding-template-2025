import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoLogoInstagram } from "react-icons/io";
import type { GalleryRow } from "../../types/couple";
import { fadeUpSection } from "../utils/sectionAnimation";

interface FooterProps {
  id?: string;
  gallery?: GalleryRow[];
}

export default function Footer({
  id = "",
  gallery = [],
}: Readonly<FooterProps>) {
  const [current, setCurrent] = useState<number>(0);

  const photos = gallery.flatMap((row) => row.photos);

  useEffect(() => {
    if (photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <motion.div
      className="h-screen flex items-center justify-center text-4xl font-bold"
      id={id}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="relative w-full h-full overflow-hidden bg-black">
        {photos.map((img, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${img})` }}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col w-full h-full items-center justify-between">
          <div className="flex flex-col justify-end items-center flex-1 gap-5 ">
            <h1 className="font-inter md:text-7xl text-6xl text-white transition-all duration-300">
              Thank <span className="text-white/50">You</span>
            </h1>

            <p className="font-inter font-light text-white md:text-xl text-lg w-1/2 text-center transition-all duration-300">
              for being part of our lives and supporting us through our journey.
            </p>

            <p className="font-inter font-light text-white md:text-xl text-lg w-1/2 text-center transition-all duration-300">
              we were so blessed to have you celebrate and be a part of our
              wedding day.
            </p>

            <p className="font-inter font-light text-white md:text-xl text-lg transition-all duration-300">
              see you!
            </p>
          </div>

          <div className="flex w-full justify-center items-end flex-row bg-linear-to-b from-10% from-black/0 to-black to-60% p-10 h-75">
            <div className="md:text-base text-sm text-white font-normal font-inter flex flex-col items-center">
              Digital Invitation by
              <a
                className="flex items-center"
                href="https://www.instagram.com/harvensnjaya/"
                target="_blank"
              >
                <IoLogoInstagram /> @harvensnjaya{" "}
              </a>
              <a
                className="flex items-center"
                href="https://www.instagram.com/audryan_h.n/"
                target="_blank"
              >
                <IoLogoInstagram /> @audryan_h.n
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
