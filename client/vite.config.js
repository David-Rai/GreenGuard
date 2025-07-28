import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true, // ✅ allows Vite to listen on 0.0.0.0 (all interfaces)
    strictPort: false,
    hmr: {
      host: 'franklin-considers-release-see.trycloudflare.com',
      protocol: 'wss', // ✅ correct if you're tunneling using HTTPS (Cloudflare)
    }
  }
  ,
  plugins: [
    tailwindcss(),
  ],
})


