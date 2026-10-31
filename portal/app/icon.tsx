import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The lighthouse in white on a PRIZM-blue rounded tile, like the PULSE favicon.
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
          background: "#155dfc",
          borderRadius: 7,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 21 10 9h4l1.5 12z" fill="#ffffff" />
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
