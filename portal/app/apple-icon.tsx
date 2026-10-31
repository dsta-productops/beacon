import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 24 24" fill="none">
          <g stroke="#155dfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 21 10 9h4l1.5 12z" fill="#155dfc" />
            <path d="M12 2v3.5" />
            <path d="M6.5 21h11" />
            <path d="M17 4.5 20 3M7 4.5 4 3" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
