import { ImageResponse } from "next/og";

export const alt = "Ranovate — Software House";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(120% 120% at 0% 0%, #5d0c0d 0%, #0a0a0a 55%)",
          padding: "96px",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#de1d1e" }}>●</span>
          <span style={{ marginLeft: 16 }}>Ranovate</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          Software house untuk bisnis yang ingin tumbuh
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 34,
            color: "#9ca3af",
            maxWidth: 880,
          }}
        >
          Desain UI/UX · Pengembangan Website · Otomasi AI · Konsultasi Teknis
        </div>
      </div>
    ),
    { ...size },
  );
}
