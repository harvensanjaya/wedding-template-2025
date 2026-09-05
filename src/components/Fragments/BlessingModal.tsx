import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import type { BankAccount } from "../../types/couple";
import Button from "../Elements/Button";

interface BlessingModalProps {
  onConfirm: () => void;
  isOpen?: boolean;
  gifts?: BankAccount[];
}

function BlessingModalContent({
  onConfirm,
  gifts,
}: {
  onConfirm: () => void;
  gifts: BankAccount[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const selectedBank = gifts[selectedIndex];

  const handleCopy = () => {
    if (!selectedBank) return;

    navigator.clipboard.writeText(selectedBank.account_number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
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
          please scan the following QR code or click 'copy number'
        </p>
      </div>

      {gifts.length === 0 ? (
        <p className="text-center text-black/50 py-5">
          No gift information available.
        </p>
      ) : (
        <>
          <div className="flex overflow-x-auto">
            {gifts.map((giftBank, index) => (
              <div key={`${giftBank.bank_name}-${index}`}>
                <input
                  type="radio"
                  name="bank"
                  checked={selectedIndex === index}
                  onChange={() => setSelectedIndex(index)}
                  className="peer hidden"
                  id={`bank-${index}`}
                />
                <label
                  className="peer-checked:border-b-4 peer-checked:text-black text-black/50 select-none p-5 text-inter sm:text-base text-sm font-semibold duration-300 transition-all cursor-pointer whitespace-nowrap"
                  htmlFor={`bank-${index}`}
                >
                  {giftBank.bank_name}
                </label>
              </div>
            ))}
          </div>

          {selectedBank && (
            <div className="flex flex-col items-center border-t py-5">
              {selectedBank.bank_logo && (
                <img
                  src={selectedBank.bank_logo}
                  alt={selectedBank.bank_name ?? "Bank logo"}
                  className="max-h-16 max-w-50 object-contain"
                />
              )}
              <p className="font-inter pt-5">
                {selectedBank.account_holder_name} -{" "}
                {selectedBank.account_number}
              </p>
            </div>
          )}

          <Button
            className="bg-none rounded-none border"
            onClick={handleCopy}
            disabled={!selectedBank}
          >
            {copied ? "COPIED!" : "COPY NUMBER"}
          </Button>
        </>
      )}

      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={onConfirm}
      >
        <IoMdClose className="text-3xl text-black" />
      </button>
    </motion.div>
  );
}

export default function BlessingModal(props: Readonly<BlessingModalProps>) {
  const { onConfirm = () => {}, isOpen = false, gifts = [] } = props;

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
          <BlessingModalContent
            key={isOpen ? "open" : "closed"}
            onConfirm={onConfirm}
            gifts={gifts}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
