import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";

interface PhotoModalProps {
  className?: string;
  onConfirm: () => void;
  isShow?: boolean;
  photos?: string[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function PhotoModal(props: Readonly<PhotoModalProps>) {
  const {
    onConfirm = () => {},
    isShow = false,
    photos = [],
    currentIndex = 0,
    onIndexChange = () => {},
  } = props;

  const total = photos.length;
  const currentPhoto = photos[currentIndex];

  const goPrev = useCallback(() => {
    if (total === 0) return;
    onIndexChange((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onIndexChange]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    onIndexChange((currentIndex + 1) % total);
  }, [currentIndex, total, onIndexChange]);

  // Navigasi pakai keyboard (panah kiri/kanan, Esc buat close)
  useEffect(() => {
    if (!isShow) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") onConfirm();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isShow, goPrev, goNext, onConfirm]);

  const handleDownload = async () => {
    if (!currentPhoto) return;

    try {
      const response = await fetch(currentPhoto);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = currentPhoto.split("/").pop() ?? "photo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback kalau fetch gagal (misal CORS) — buka di tab baru
      window.open(currentPhoto, "_blank");
    }
  };

  if (!isShow || total === 0) return null;

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
            <p className="text-white">
              {currentIndex + 1} / {total}
            </p>
            <div className="flex gap-5">
              <button onClick={handleDownload} className="cursor-pointer">
                <LiaDownloadSolid className="text-2xl text-white" />
              </button>
              <button onClick={onConfirm} className="cursor-pointer">
                <IoMdClose className="text-2xl text-white" />
              </button>
            </div>
          </motion.div>

          <div className="relative flex flex-1 justify-center items-center h-full min-h-0 py-20">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 flex justify-center items-center lg:mx-25 md:mx-10 mx-5 bg-black/50 p-3 rounded-full transition-all duration-300 cursor-pointer z-10"
              onClick={goPrev}
            >
              <IoIosArrowBack className="text-2xl text-white" />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentPhoto}
                alt=""
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 flex justify-center items-center lg:mx-25 md:mx-10 mx-5 bg-black/50 p-3 rounded-full transition-all duration-300 cursor-pointer z-10"
              onClick={goNext}
            >
              <IoIosArrowForward className="text-2xl text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
