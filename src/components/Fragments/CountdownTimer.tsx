import { useEffect, useState } from "react";
import Button from "../Elements/Button";

interface CountdownTimerProps {
  targetMs: number;
  onOpenCalendarMenu: () => void;
  calendarMenuSlot: React.ReactNode;
}

function useCountdown(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  return timeLeft;
}

export default function CountdownTimer({
  targetMs,
  onOpenCalendarMenu,
  calendarMenuSlot,
}: Readonly<CountdownTimerProps>) {
  const { days, hours, minutes, seconds } = useCountdown(targetMs);

  return (
    <div className="w-full md:py-20 flex flex-col justify-center items-center gap-10 duration-300 transition-all">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
            {days.toString().padStart(2, "0")}
          </p>
          <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
            days
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
            {hours.toString().padStart(2, "0")}
          </p>
          <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
            hours
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
            {minutes.toString().padStart(2, "0")}
          </p>
          <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
            minutes
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-inter tracking-tight font-light md:text-7xl sm:text-6xl text-5xl italic transition-all duration-300">
            {seconds.toString().padStart(2, "0")}
          </p>
          <p className="font-inter tracking-tight md:text-2xl text-sm transition-all duration-300">
            seconds
          </p>
        </div>
      </div>

      <div className="relative">
        <Button
          className="bg-none rounded-none border"
          onClick={onOpenCalendarMenu}
        >
          SAVE THE DATE
        </Button>
        {calendarMenuSlot}
      </div>
    </div>
  );
}
