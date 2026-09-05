import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Elements/Button";

interface GuestQrModalProps {
  isOpen: boolean;
  guestName: string;
  qrSvg: string;
  onContinue: () => void;
}

export default function GuestQrModal(props: Readonly<GuestQrModalProps>) {
  const { isOpen, guestName, qrSvg, onContinue } = props;
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svgElement = qrContainerRef.current?.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const padding = 40;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, padding, padding);

      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `invitation-qr-${guestName.replace(/\s+/g, "-").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      });
    };
    img.src = url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-[60] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 flex flex-col items-center gap-4 relative"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
          >
            <button
              className="absolute top-3 right-3 cursor-pointer"
              onClick={onContinue}
              aria-label="Close"
            >
              <IoMdClose className="text-2xl text-black/60" />
            </button>

            <h3 className="font-italiana text-3xl text-center">Your QR Code</h3>
            <p className="text-center text-sm text-black/60 font-inter">
              Dear, {guestName}. Please save or screenshot this QR code — you'll
              need it to check in on the wedding day.
            </p>

            <div
              ref={qrContainerRef}
              className="bg-white p-4 rounded-lg border"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />

            <Button
              onClick={handleDownload}
              className="rounded-none border w-full"
            >
              DOWNLOAD QR CODE
            </Button>

            <Button
              onClick={onContinue}
              className="rounded-none border w-full bg-black text-white"
            >
              CONTINUE TO INVITATION
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
