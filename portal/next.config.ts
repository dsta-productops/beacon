import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/flywheel/test",
        destination: "/flywheel/measure",
        permanent: true,
      },
      { source: "/walkthrough", destination: "/tutorial", permanent: true },
      {
        source: "/walkthrough-gitlab",
        destination: "/tutorial-gitlab",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
