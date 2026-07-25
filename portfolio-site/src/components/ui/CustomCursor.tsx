"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const springX = useSpring(followerX, { damping: 28, stiffness: 400, mass: 0.3 });
  const springY = useSpring(followerY, { damping: 28, stiffness: 400, mass: 0.3 });

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("data-cursor") === "pointer";

      setHovered(!!interactive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handlePointerOver);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
          marginLeft: hovered ? -4 : -3,
          marginTop: hovered ? -4 : -3,
          borderRadius: "50%",
          background: "var(--accent, #00c896)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease",
        }}
      />

      {/* Outer Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          marginLeft: hovered ? -24 : -16,
          marginTop: hovered ? -24 : -16,
          borderRadius: "50%",
          border: hovered ? "1px solid rgba(0, 200, 150, 0.4)" : "1px solid rgba(255, 255, 255, 0.18)",
          background: hovered ? "rgba(0, 200, 150, 0.08)" : "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        }}
      />
    </>
  );
}
