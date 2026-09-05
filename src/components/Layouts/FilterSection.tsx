import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import defaultFilter1 from "../../assets/filter1.jpg";
import defaultFilter2 from "../../assets/filter2.jpg";
import defaultFilter3 from "../../assets/filter3.jpg";
import Button from "../Elements/Button";

interface FilterSectionProps {
  className?: string;
  weddingHashtag?: string;
  images?: string[];
  instagramFilter?: string;
}

const defaultImages = [defaultFilter1, defaultFilter2, defaultFilter3];

export default function FilterSection(props: Readonly<FilterSectionProps>) {
  const {
    className = "",
    weddingHashtag,
    images = [],
    instagramFilter,
  } = props;

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <motion.div
      className={`w-full flex flex-col justify-center items-center gap-10 ${className}`}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {weddingHashtag && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-inter tracking-tighter md:text-xl text-lg font-light transition-all duration-300">
            kindly share your moments with
          </h2>
          <h3 className="font-italiana md:text-6xl text-5xl">
            {weddingHashtag}
          </h3>
        </div>
      )}

      <div className="flex gap-5 justify-center items-center relative xl:-mt-30 lg:-mt-25 md:-mt-20 sm:-mt-15 -mt-10">
        {displayImages.slice(0, 3).map((img, idx) => (
          <img
            key={img}
            src={img}
            alt=""
            className={`w-1/4 h-1/4 md:aspect-4/3 aspect-3/4 object-cover transition-all duration-300 ${
              idx === 1 ? "mt-0" : "xl:mt-50 lg:mt-40 md:mt-30 sm:mt-20 mt-10"
            }`}
          />
        ))}
      </div>

      {instagramFilter && (
        <Button
          className="rounded-none bg-none border"
          onClick={() => window.open(instagramFilter, "_blank")}
        >
          INSTAGRAM FILTER
        </Button>
      )}
    </motion.div>
  );
}
