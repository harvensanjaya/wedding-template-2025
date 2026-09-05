import { motion } from "motion/react";
import { fadeUpSection } from "../utils/sectionAnimation";

import type { BankAccount } from "../../types/couple";
import Button from "../Elements/Button";

interface SendGiftSectionProps {
  onOpen?: () => void;
  gifts?: BankAccount[];
}

export default function SendGiftSection(props: Readonly<SendGiftSectionProps>) {
  const { onOpen = () => {} } = props;
  return (
    <motion.div
      className="w-full py-10 bg-linear-to-tr from-black from-10% via-black/80 via-40% to-black to-90% flex justify-center"
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-300 w-300 mx-10 flex md:flex-row flex-col items-center justify-center gap-5 text-white md:text-left text-center">
        <div className="flex flex-col flex-2 md:gap-0 gap-5 md:items-start items-center transition-all duration-300">
          <h3 className="font-italiana md:text-6xl text-5xl transition-all duration-300">
            SHARE YOUR BLESSING
          </h3>
          <p className="font-inter font-light md:text-xl sm:text-lg text-base transition-all duration-300">
            with all due respect, you may share gifts to the bride and groom.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Button className="rounded-none bg-none border" onClick={onOpen}>
            SEND GIFT NOW
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
