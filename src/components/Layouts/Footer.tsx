import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { fadeUpSection } from "../utils/sectionAnimation";

const galleryData = [
  "https://i.pinimg.com/736x/3d/f6/fb/3df6fba4b6ec05c8a975eeed6d1efb53.jpg",
  "https://i.pinimg.com/1200x/f8/e2/34/f8e234535b136551377f2f65310c3b51.jpg",
  "https://i.pinimg.com/1200x/34/99/1b/34991bff375f528ee227f2137ec557a4.jpg",
  "https://i.pinimg.com/1200x/a0/5f/3b/a05f3bab04a91356adc14e52d9cffd49.jpg",
  "https://i.pinimg.com/1200x/95/ac/8f/95ac8f6d64113e28e8cb78e8db944cd1.jpg",
  "https://i.pinimg.com/1200x/bd/4c/e0/bd4ce06dc8c80c1d6aa9c2f1d1dc4ab1.jpg",
];

interface FooterProps {
  id?: string;
}

export default function Footer({ id = "" }: Readonly<FooterProps>) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="h-screen flex items-center justify-center text-4xl font-bold p-5"
      id={id}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="relative rounded-4xl w-full h-full overflow-hidden">
        {galleryData.map((img, index) => (
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
            <p className="md:text-base text-sm text-white font-normal font-inter flex flex-col items-center">
              Digital Invitation by
              <p className="flex items-center">
                <IoLogoInstagram /> @harvensnjaya{" "}
              </p>
              <p className="flex items-center">
                <IoLogoInstagram /> @audryan_h.n
              </p>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
