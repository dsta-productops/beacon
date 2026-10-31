import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <g stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 21 10 9h4l1.5 12z" fill="#155dfc" />
            <path d="M12 2v3.5" />
            <path d="M17 4.5 20 3M7 4.5 4 3" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
