import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { tailwindCssObfuscatorVite } from "tailwindcss-obfuscator/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    tailwindCssObfuscatorVite({
      prefix: "tw-",
    }),
  ],
  build: {
    sourcemap: false,
  },
});
