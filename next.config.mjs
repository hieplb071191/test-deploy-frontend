/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    }
};

export default nextConfig;
