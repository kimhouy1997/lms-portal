import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const PORT = 3000;

export default defineConfig({
  plugins: [
    react()
  ],
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
  resolve: {
      alias: {
        "@root": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@i18n": path.resolve(__dirname, "./src/i18n"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@types": path.resolve(__dirname, "./src/types"),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        "@mui/icons-material",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
      ],
    },
});