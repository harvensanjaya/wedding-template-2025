import { useEffect, useMemo, useState } from "react";

export type NavState = "transparent" | "solid" | "hidden";

export function useNavbarState({
  transparentIds = [],
  hiddenIds = [],
}: {
  transparentIds: string[];
  hiddenIds: string[];
}) {
  const [inHidden, setInHidden] = useState(false);
  const [inTransparent, setInTransparent] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observe = (id: string, setter: (v: boolean) => void) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => setter(entry.isIntersecting),
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    };

    hiddenIds.forEach((id) => observe(id, setInHidden));
    transparentIds.forEach((id) => observe(id, setInTransparent));

    return () => observers.forEach((o) => o.disconnect());
  }, [hiddenIds, transparentIds]);

  // ✅ DERIVED STATE (NO setState IN EFFECT)
  const navState: NavState = useMemo(() => {
    if (inHidden) return "hidden";
    if (inTransparent) return "transparent";
    return "solid";
  }, [inHidden, inTransparent]);

  return navState;
}
