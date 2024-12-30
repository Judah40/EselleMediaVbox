/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      (module.exports = {
        async headers() {
          return [
            {
              // matching all API routes
              source: "/api/:path*",
              headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                {
                  key: "Access-Control-Allow-Methods",
                  value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                },
                {
                  key: "Access-Control-Allow-Headers",
                  value:
                    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                },
              ],
            },
          ];
        },
      }),
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
    domains: ["vbox-esselle-media-new-bucket.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
