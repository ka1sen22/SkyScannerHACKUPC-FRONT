import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',

    allowedHosts: [
      'hackupc2025.kire.ovh'
    ],

    // hmr: {
    //   host: 'hackupc2025.kire.ovh',
    //   protocol: 'ws'
    // }
  }
})
