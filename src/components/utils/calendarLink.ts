import type { WeddingEvent } from "../../types/couple";

interface CalendarEventInfo {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

function buildEventInfo(
  event: WeddingEvent,
  groomName: string,
  brideName: string,
): CalendarEventInfo | null {
  if (!event.event_date) return null;

  const startTime = event.start_time ?? "00:00:00";
  const endTime = event.end_time ?? null;

  const start = new Date(`${event.event_date}T${startTime}`);
  if (Number.isNaN(start.getTime())) return null;

  // Kalau nggak ada jam selesai, default 2 jam dari mulai
  const end = endTime
    ? new Date(`${event.event_date}T${endTime}`)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const eventLabel =
    event.event_name === "holy_matrimony"
      ? "Holy Matrimony"
      : event.event_name === "wedding_reception"
        ? "Wedding Reception"
        : event.event_name;

  return {
    title: `${groomName} & ${brideName} - ${eventLabel}`,
    description: `You're invited to the ${eventLabel} of ${groomName} & ${brideName}.`,
    location: [event.venue, event.address].filter(Boolean).join(", "),
    start,
    end,
  };
}

function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarUrl(
  event: WeddingEvent,
  groomName: string,
  brideName: string,
): string | null {
  const info = buildEventInfo(event, groomName, brideName);
  if (!info) return null;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: info.title,
    dates: `${formatDateForGoogle(info.start)}/${formatDateForGoogle(info.end)}`,
    details: info.description,
    location: info.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatDateForIcs(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function openIcsFile(
  event: WeddingEvent,
  groomName: string,
  brideName: string,
): void {
  const info = buildEventInfo(event, groomName, brideName);
  if (!info) return;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Stellar Organizer//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@stellarorganizer.com`,
    `DTSTAMP:${formatDateForIcs(new Date())}`,
    `DTSTART:${formatDateForIcs(info.start)}`,
    `DTEND:${formatDateForIcs(info.end)}`,
    `SUMMARY:${info.title}`,
    `DESCRIPTION:${info.description}`,
    `LOCATION:${info.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Navigasi langsung, TANPA attribute download
  // Ini yang bikin iOS Safari munculin "Add to Calendar" native, bukan download file
  window.location.href = url;

  // Bersihkan objek URL setelah delay, kasih waktu browser proses dulu
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
