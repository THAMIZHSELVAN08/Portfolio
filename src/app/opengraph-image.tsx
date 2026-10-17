import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
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
          backgroundColor: "#111112",
          color: "#f0f0f0",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(17, 17, 18,0.55)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#ea0044",
                border: "2px solid rgba(17, 17, 18,0.35)",
              }}
            />
            {site.location}
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(17, 17, 18,0.45)",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 600,
              letterSpacing: -4,
              lineHeight: 1,
              maxWidth: 900,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#ea0044",
                padding: "10px 22px",
                borderRadius: 999,
                fontSize: 30,
                fontWeight: 500,
              }}
            >
              {site.role}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(17, 17, 18,0.6)",
          }}
        >
          <div>{site.email}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            github.com/THAMIZHSELVAN08
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
