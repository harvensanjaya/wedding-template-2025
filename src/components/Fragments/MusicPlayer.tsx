import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";

interface MusicPlayerProps {
  className?: string;
  songUrl?: string;
  songTitle?: string;
  songArtist?: string;
}

export default function MusicPlayer({
  className,
  songUrl,
  songTitle,
  songArtist,
}: Readonly<MusicPlayerProps>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!songTitle && !songArtist) return;

    // show text
    const showTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 1200);

    // hide text again
    const hideTimer = setTimeout(() => {
      setIsExpanded(false);
    }, 5200); // 1.2s + 4s

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [songTitle, songArtist]);

  if (!songUrl) return null;

  const label = [songTitle, songArtist].filter(Boolean).join(" - ");

  return (
    <>
      <audio ref={audioRef} src={songUrl} autoPlay></audio>
      <div
        className={`fixed z-50 flex items-center justify-center ${className}`}
      >
        <motion.div
          layout
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-fit h-fit rounded-full bg-black text-white shadow-lg flex items-center justify-center gap-2 p-1"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-2 rounded-full bg-white/10 text-white text-xl cursor-pointer"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <IoPause /> : <IoPlay />}
          </motion.button>

          <AnimatePresence>
            {isExpanded && label && (
              <motion.p
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap font-inter text-xs pr-3"
              >
                <i>{label}</i>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
