import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { TOKENS } from "@/lib/design-tokens";

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
          background: TOKENS.bg,
          color: TOKENS.fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", height: 10, width: "100%", backgroundImage: TOKENS.gradientPrimary }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: TOKENS.subtle, fontFamily: "monospace" }}>
            <span style={{ color: TOKENS.accent }}>~/</span>julius-gachuhi
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 38, color: TOKENS.muted }}>{SITE.name}</div>
            <div style={{ fontSize: 68, fontWeight: 700, marginTop: 12, lineHeight: 1.1 }}>{SITE.role}</div>
            <div style={{ fontSize: 32, color: TOKENS.accent, marginTop: 24, fontFamily: "monospace" }}>{SITE.focus}</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: TOKENS.subtle }}>juliusgachuhi.com</div>
        </div>
      </div>
    ),
    size,
  );
}
