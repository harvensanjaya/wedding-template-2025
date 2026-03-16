import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import Bride from "../../assets/Bride.jpg";
import Groom from "../../assets/Groom.jpg";
import GroomBride from "../../assets/GroomBride.jpg";

export default function GroomBrideSection() {
  return (
    <motion.div
      className="w-full lg:h-screen flex lg:flex-row flex-col"
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="lg:flex-1">
        <img src={GroomBride} alt="" className="h-full object-cover" />
      </div>
      <div className="lg:flex-1 flex flex-col sm:h-screen h-[50%] transition-all transition-discrete duration-300">
        <div className="flex flex-1">
          <div className="flex-1 relative">
            <img
              src={Groom}
              alt=""
              className="h-full w-full absolute inset-0 object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="xl:px-10 px-5 py-15 flex flex-col md:justify-between justify-center md:gap-0 sm:gap-10 gap-5 h-full transition-all duration-300">
              <div>
                <p className="font-inter italic 2xl:text-xl md:text-lg sm:text-sm text-xs text-black/50 font-light transition-all duration-300">
                  THE GROOM
                </p>
                <p className="font-italiana 2xl:text-7xl md:text-6xl sm:text-5xl text-4xl">
                  Nico Saputra
                </p>
              </div>
              <div>
                <p className="font-inter 2xl:text-xl md:text-lg sm:text-sm text-xs text-black/50 italic font-light transition-all duration-300">
                  The son of Mr. Edward Ng <br />
                  and <br />
                  Mrs. Lainie Layardi Laij
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 ">
          <div className="flex-1">
            <div className="xl:px-10 px-5 py-15 flex flex-col h-full md:justify-between justify-center md:gap-0 sm:gap-10 gap-5 transition-all duration-300">
              <div>
                <p className="font-inter italic 2xl:text-xl md:text-lg sm:text-sm text-xs text-black/50 font-light transition-all duration-300">
                  THE BRIDE
                </p>
                <p className="font-italiana 2xl:text-7xl md:text-6xl sm:text-5xl text-4xl">
                  Devi Nicholas
                </p>
              </div>
              <div>
                <p className="font-inter 2xl:text-xl md:text-lg sm:text-sm text-xs text-black/50 italic font-light transition-all duration-300">
                  The daugther of Mr. Sukaman
                  <br />
                  and <br />
                  Mrs. Rosnie Mintan
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative min-h-0">
            <img
              src={Bride}
              alt=""
              className="h-full w-full absolute object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
