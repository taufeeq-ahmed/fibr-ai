/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['xtpqxwmicmkcfwxmanjx.supabase.co'],
  },
};

export default nextConfig;
