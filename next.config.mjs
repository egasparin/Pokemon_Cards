/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["www.pokemon.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pokemon.com",
        port: "", // Deixe vazio se não houver uma porta específica.
        pathname: "/**", // Permite todos os caminhos do domínio.
      },
    ],
  },
};

export default nextConfig;
