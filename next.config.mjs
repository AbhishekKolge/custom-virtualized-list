/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ENV: 'production',
    BASE_URL:
      'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt',
  },
};

export default nextConfig;
