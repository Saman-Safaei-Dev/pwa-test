import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    start_url: "/",
    short_name: "PWAM",
    name: "PWA Messenger",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    description:
      "A Progressive Web App built with Next.js & Developed by the Saman-Safaei-Dev",
    icons: [
      {
        src: "/192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
