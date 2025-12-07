import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      tailwindcss: tailwindcss as any,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tailwindcss.configs["flat/recommended"],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "tailwindcss/classnames-order": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  prettierConfig,
]);
