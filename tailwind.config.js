import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3DDC97',        // Hijau Mint
        secondary: '#4A4A4A',      // Abu-abu Tua Netral
        background: '#FFFFFF',     // Putih Bersih
        textMain: '#2C2C2C',       // Abu-abu Gelap
        textSecondary: '#B0B0B0',  // Abu-abu Muda
        accent: '#0F9D58',         // Hijau Tua Enerjik
        linkHover: '#2BBBAD',      // Biru Toska Netral
      }
    },
  },
  plugins: [],
});
