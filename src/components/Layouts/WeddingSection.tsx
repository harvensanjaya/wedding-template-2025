import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CountdownTimer from "../Fragments/CountdownTimer";
import { buildGoogleCalendarUrl, openIcsFile } from "../utils/calendarLink";
import { fadeUpSection } from "../utils/sectionAnimation";

import WeddingRingIcon from "../../assets/wedding-ring.png";
import type { WeddingEvent } from "../../types/couple";
import Button from "../Elements/Button";

interface WeddingSectionProps {
  className?: string;
  id?: string;
  events?: WeddingEvent[];
  groomName?: string;
  brideName?: string;
}

function getEventLabel(eventName: string): string {
  const knownLabels: Record<string, string> = {
    holy_matrimony: "HOLY MATRIMONY",
    wedding_reception: "WEDDING RECEPTION",
  };
  return knownLabels[eventName] ?? eventName.replace(/_/g, " ").toUpperCase();
}

function formatDotDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} . ${month} . ${year}`;
}

function formatTime(timeStr: string | null): string {
  if (!timeStr) return "";
  const [hourStr, minuteStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = minuteStr ?? "00";
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}.${minute} ${period}`;
}

function getCountdownEvent(events: WeddingEvent[]): WeddingEvent | null {
  return (
    events.find((e) => e.save_date) ?? events.find((e) => e.event_date) ?? null
  );
}

function getCountdownTargetMs(events: WeddingEvent[]): number | null {
  const target =
    events.find((e) => e.save_date) ?? events.find((e) => e.event_date) ?? null;

  if (!target?.event_date) return null;

  const timePart = target.start_time ?? "00:00:00";
  const dateTime = new Date(`${target.event_date}T${timePart}`);
  return Number.isNaN(dateTime.getTime()) ? null : dateTime.getTime();
}

export default function WeddingSection(props: Readonly<WeddingSectionProps>) {
  const {
    className = "",
    id = "",
    events = [],
    groomName = "",
    brideName = "",
  } = props;

  const countdownEvent = getCountdownEvent(events);
  const countdownTargetMs = getCountdownTargetMs(events);

  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowCalendarMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGoogleCalendar = () => {
    if (!countdownEvent) return;
    const url = buildGoogleCalendarUrl(countdownEvent, groomName, brideName);
    if (url) window.open(url, "_blank");
    setShowCalendarMenu(false);
  };

  const handleDownloadIcs = () => {
    if (!countdownEvent) return;
    openIcsFile(countdownEvent, groomName, brideName);
    setShowCalendarMenu(false);
  };

  const headerEvent =
    events.find((e) => e.event_name === "holy_matrimony") ?? events[0];

  return (
    <motion.div
      id={id}
      className={`w-full flex flex-col justify-center items-center gap-20 pt-20 ${className}`}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-italiana md:text-6xl text-5xl transition-all duration-300">
          THE WEDDING
        </h2>
        {headerEvent?.event_date && (
          <p className="font-inter font-extralight md:text-xl sm:text-lg text-base tracking-tighter transition-all duration-300">
            {formatDotDate(headerEvent.event_date)}
          </p>
        )}
      </div>

      {events.length > 0 && (
        <div className="w-full flex justify-center items-center">
          <div className="flex md:flex-row flex-col md:gap-10 gap-20 items-center justify-center transition-all transition-discrete duration-300 mx-20">
            {events.map((event) => (
              <div
                key={`${event.event_name}-${event.event_date}`}
                className="relative transition-all duration-300"
              >
                <div className="md:w-24 w-20 aspect-square rounded-b-full bg-[#d9d9d9] flex justify-center items-center absolute left-1/2 -translate-1/2 top-0 transition-all duration-300">
                  <img
                    src={WeddingRingIcon}
                    alt=""
                    className="opacity-40 md:w-13 w-10 transition-all duration-300 scale-x-[-1]"
                  />
                </div>
                <div className="h-full flex flex-col justify-center items-center shadow-[0px_4px_22px_3px_rgba(0,0,0,0.1)] md:gap-8 gap-5 transition-all duration-300">
                  <h3 className="font-italiana md:text-5xl text-4xl text-black/50 text-center mx-15 md:mt-25 mt-15 transition-all duration-300">
                    {getEventLabel(event.event_name)}
                  </h3>
                  <div className="flex flex-col justify-center items-center w-full font-inter text-base tracking-tighter">
                    {event.venue && (
                      <h4 className="font-medium md:text-xl text-lg duration-300 transition-all">
                        {event.venue}
                      </h4>
                    )}
                    {event.address && (
                      <p className="font-light md:text-lg text-base w-1/2 text-center transition-all duration-300">
                        {event.address}
                      </p>
                    )}
                    {(event.start_time || event.end_time) && (
                      <p className="font-medium md:text-lg text-base text-black/50 mt-3 transition-all duration-300">
                        {formatTime(event.start_time)}
                        {event.end_time
                          ? ` - ${formatTime(event.end_time)}`
                          : ""}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 md:mb-25 mb-10">
                    {event.map_link && (
                      <Button
                        className="bg-none rounded-none border duration-300 transition-all"
                        onClick={() => window.open(event.map_link!, "_blank")}
                      >
                        OPEN MAPS
                      </Button>
                    )}
                    {event.live_link && (
                      <Button
                        className="bg-none rounded-none border duration-300 transition-all"
                        onClick={() => window.open(event.live_link!, "_blank")}
                      >
                        WATCH LIVE
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {countdownTargetMs && (
        <CountdownTimer
          targetMs={countdownTargetMs}
          onOpenCalendarMenu={() => setShowCalendarMenu((prev) => !prev)}
          calendarMenuSlot={
            showCalendarMenu ? (
              <div ref={menuRef}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border shadow-lg z-20 min-w-50"
                >
                  <button
                    onClick={handleGoogleCalendar}
                    className="w-full text-left px-4 py-3 text-sm font-inter hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    Google Calendar
                  </button>
                  <button
                    onClick={handleDownloadIcs}
                    className="w-full text-left px-4 py-3 text-sm font-inter hover:bg-black/5 transition-colors border-t cursor-pointer"
                  >
                    <span className="block">Apple / Outlook</span>
                    <span className="block text-xs text-black/40">
                      Opens directly on iPhone, downloads file on other devices
                    </span>
                  </button>
                </motion.div>
              </div>
            ) : null
          }
        />
      )}
    </motion.div>
  );
}
