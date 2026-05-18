"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      if (trailRef.current) {
        trailRef.current.style.left = `${trailX}px`;
        trailRef.current.style.top = `${trailY}px`;
      }

      requestAnimationFrame(animateTrail);
    };

    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(2)";
    };
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    document.addEventListener("mousemove", handleMove);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const animId = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}
