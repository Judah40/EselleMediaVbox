/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["vbox-esselle-media.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
