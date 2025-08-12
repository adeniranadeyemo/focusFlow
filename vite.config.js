import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind(),  VitePWA({
      registerType: 'prompt', // 'autoUpdate' or 'prompt'
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'FocusFlow',
        short_name: 'FocusFlow',
        description: 'A focused Pomodoro timer',
        theme_color: '#4C5FD5',
        background_color: '#F9FAFB',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/maskable-192x192.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
       workbox: {
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false, // service worker disabled in dev
      },
    })],
  server: {
    host: true,
  },
});
