import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    include: ["**/*.e2e-test.ts"],
    globals: true,
    root: "./",
    exclude: ["**/node_modules/**", "**/dist/**"],
    setupFiles: ["./test/setup-e2e.ts"],
    maxConcurrency: 1,
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
    },
  },
});
