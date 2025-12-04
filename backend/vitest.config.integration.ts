import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    include: ["**/*.integration-test.ts"],
    globals: true,
    root: "./",
    exclude: ["**/node_modules/**", "**/dist/**"],
    maxConcurrency: 1,
    testTimeout: 30000, // 30 seconds,
    hookTimeout: 30000, // 30 seconds
    retry: 2,
    environment: process.env.RUN_INTEGRATION ? "node" : "none",
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
