export default function Background() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>

      {/* Dot grid - full coverage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, #2a2a2a 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Fade edges so grid doesn't feel boxed */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, #000 100%)",
        }}
      />

      {/* Blob 1 - top right, indigo */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)",
          animation: "blobFloat 9s ease-in-out infinite",
          animationDelay: "0s",
        }}
      />

      {/* Blob 2 - bottom left, purple */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)",
          animation: "blobFloat 11s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />

      {/* Blob 3 - center, pink accent (subtle) */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "30%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 65%)",
          animation: "blobFloat 13s ease-in-out infinite",
          animationDelay: "-3s",
        }}
      />

      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -40px) scale(1.06); }
          66%       { transform: translate(-20px, 20px) scale(0.96); }
        }
      `}</style>
    </div>
  );
}
