import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [UnoCSS(), qwikCity(), qwikVite(), tsconfigPaths(), qwikReact(), splitVendorChunkPlugin()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    server: {
      port: 3333,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['@radix-ui/*']
    }
  };
});
