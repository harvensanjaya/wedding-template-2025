import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Elements/Button";

import bcaBankLogo from "../../assets/bcaBank.png";
import cimbBankLogo from "../../assets/cimbBank.png";

interface BlessingModalProps {
  onConfirm: () => void;
  isOpen?: boolean;
}

export default function BlessingModal(props: Readonly<BlessingModalProps>) {
  const { onConfirm = () => {}, isOpen = false } = props;

  const [bank, setBank] = useState<"cimb" | "bca" | null>("cimb");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.13 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-125  overflow-hidden sm:p-6 p-4 transition-all transition-discrete relative flex flex-col gap-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.25, 1] }}
          >
            <div className="flex flex-col items-center ">
              <h3 className="font-italiana md:text-6xl sm:text-5xl text-4xl sm:p-5 p-2 transition-all duration-300">
                SEND GIFT
              </h3>
              <p className="font-inter md:text-lg sm:text-base text-sm text-center font-light p-2 transition-all duration-300">
                with all due respect, you may share gifts to the bride and groom
                through these following methods.
              </p>
              <p className="font-inter font-light text-black/60 md:text-base text-sm text-center transition-all duration-300">
                please scan the following QR code or click ‘copy number’
              </p>
            </div>

            <div className="flex">
              <div>
                <input
                  type="radio"
                  name="bank"
                  value="yes"
                  checked={bank === "cimb"}
                  onChange={() => setBank("cimb")}
                  className="peer hidden"
                  id="bank-cimb"
                />
                <label
                  className="peer-checked:border-b-4 peer-checked:text-black text-black/50 select-none p-5 text-inter sm:text-base text-sm font-semibold duration-300 transition-all"
                  htmlFor="bank-cimb"
                >
                  CIMB Niaga
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="bank"
                  value="no"
                  checked={bank === "bca"}
                  onChange={() => setBank("bca")}
                  className="peer hidden"
                  id="bank-bca"
                />
                <label
                  className="peer-checked:border-b-4 peer-checked:text-black text-black/50 select-none p-5 text-inter sm:text-base text-sm font-semibold transition-all duration-300"
                  htmlFor="bank-bca"
                >
                  BCA
                </label>
              </div>
            </div>
            {bank === "cimb" && (
              <div className="flex flex-col items-center border-t py-5">
                <img
                  src={cimbBankLogo}
                  alt=""
                  className="max-h-16 max-w-50 object-contain"
                />
                <p className="font-inter pt-5">
                  Nico Dharmaputra - 703159863900
                </p>
              </div>
            )}
            {bank === "bca" && (
              <div className="flex flex-col items-center  border-t py-5">
                <img
                  src={bcaBankLogo}
                  alt=""
                  className="max-h-16 max-w-50 object-contain"
                />
                <p className="font-inter pt-5">
                  Nico Dharmaputra - 703159863900
                </p>
              </div>
            )}
            <Button className="bg-none rounded-none border">COPY NUMBER</Button>

            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={onConfirm}
            >
              <IoMdClose className="text-3xl text-black" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
