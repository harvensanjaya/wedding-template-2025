import { AnimatePresence, motion } from "motion/react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";

import Image from "../../assets/download (10).jpg";

interface PhotoModalProps {
  className?: string;
  onConfirm: () => void;
  isShow?: boolean;
}

export default function PhotoModal(props: Readonly<PhotoModalProps>) {
  const { onConfirm = () => {}, isShow = false } = props;

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className="bg-black/80 z-50 fixed inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full p-5 flex justify-between"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
          >
            <p className="text-white">1 / 12</p>
            <div className="flex gap-5">
              <LiaDownloadSolid className="text-2xl text-white" />
              <button className="" onClick={onConfirm}>
                <IoMdClose className="text-2xl text-white" />
              </button>
            </div>
          </motion.div>

          <div className="relative flex flex-1 justify-center items-center h-full min-h-0 py-20">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex justify-center items-center lg:mx-25 md:mx-10 mx-5 bg-black/50 p-3 rounded-full transition-all duration-300">
              <IoIosArrowBack className="text-2xl text-white" />
            </div>
            <img
              src={Image}
              alt=""
              className="max-h-full max-w-full object-cover"
            />

            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex justify-center items-center lg:mx-25 md:mx-10 mx-5 bg-black/50 p-3 rounded-full transition-all duration-300">
              <IoIosArrowForward className="text-2xl text-white" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
