export const smoothScrollTo = (targetY: number, duration = 1000) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime: number | null = null;

  const easeInOut = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const time = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeInOut(time);

    window.scrollTo(0, startY + diff * eased);

    if (time < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 20; // offset navbar height

  smoothScrollTo(y, 1000);
};
