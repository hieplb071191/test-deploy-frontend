/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        BACKEND_URL: process.env.BACKEND_URL
    }
};

export default nextConfig;
