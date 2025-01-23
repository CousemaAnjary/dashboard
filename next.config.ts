import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Fornisseur d'images
    domains: [
      "avatars.githubusercontent.com", //GitHub avatar
      "lh3.googleusercontent.com", //Google avatar
      "cdn.discordapp.com", //Discord avatar
      "pbs.twimg.com", //Twitter avatar
    ],

  },
}

export default nextConfig;

