/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
    images: {
        remotePatterns: [{ hostname: 'dapper-goldfish-182.convex.cloud' }],
    },
}

export default nextConfig
