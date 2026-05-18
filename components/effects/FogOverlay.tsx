"use client";

export default function FogOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Bottom fog */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "40%",
          background:
            "linear-gradient(to top, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.5) 40%, transparent 100%)",
        }}
      />
      {/* Ambient cyan glow from bottom-left */}
      <div
        className="absolute"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)",
          animation: "fog-drift 20s ease-in-out infinite",
        }}
      />
      {/* Secondary glow top-right */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          right: "-10%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(22,78,99,0.1) 0%, transparent 70%)",
          animation: "fog-drift 25s ease-in-out 5s infinite reverse",
        }}
      />
    </div>
  );
}
