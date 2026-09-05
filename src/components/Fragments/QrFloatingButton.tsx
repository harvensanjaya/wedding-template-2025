import { IoQrCodeOutline } from "react-icons/io5";

interface QrFloatingButtonProps {
  onClick: () => void;
}

export default function QrFloatingButton({
  onClick,
}: Readonly<QrFloatingButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="fixed md:bottom-10 md:left-10 bottom-6 left-6 z-40 bg-black text-white rounded-full p-3 shadow-lg flex items-center gap-2 hover:opacity-80 transition-all duration-300 cursor-pointer"
      aria-label="Show my QR code"
    >
      <IoQrCodeOutline className="text-xl" />
      <span className="text-xs font-inter pr-1 hidden sm:inline">
        My QR Code
      </span>
    </button>
  );
}
