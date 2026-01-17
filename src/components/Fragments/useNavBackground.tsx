import { useEffect, useState } from "react";

export function useNavBackground(
  transparentSections: string[],
  rootMargin = "-20% 0px -60% 0px"
) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = new Set(prev);

          entries.forEach((entry) => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
              next.add(id);
            } else {
              next.delete(id);
            }
          });

          return next;
        });
      },
      { rootMargin }
    );

    transparentSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [transparentSections, rootMargin]);

  // Solid hanya kalau TIDAK ADA hero / footer terlihat
  const isSolid = visibleSections.size === 0;

  return isSolid;
}
