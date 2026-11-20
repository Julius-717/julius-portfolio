import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}, ${SITE.role}`;
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
          justifyContent: "space-between",
          padding: "72px",
          background: "#0b0e14",
          color: "#e6eaf2",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8591a6" }}>
          <span style={{ color: "#67d4ea" }}>~/</span>julius-gachuhi
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, color: "#a7b0c0" }}>{SITE.name}</div>
          <div style={{ fontSize: 68, fontWeight: 700, marginTop: 12, lineHeight: 1.1 }}>{SITE.role}</div>
          <div style={{ fontSize: 34, color: "#67d4ea", marginTop: 24 }}>{SITE.focus}</div>
        </div>
        <div style={{ display: "flex", height: 4, width: 160, background: "#67d4ea" }} />
      </div>
    ),
    size,
  );
}
