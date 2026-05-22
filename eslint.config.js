import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "indent": ["error", 2, { "SwitchCase": 1 }],

      // semicolons required
      "@stylistic/semi": ["error", "always"],

      // double quotes
      "@stylistic/quotes": ["error", "double"],

      // trailing comma after last property (always-multiline)
      "@stylistic/comma-dangle": ["error", "always-multiline"],

      // no trailing spaces
      "@stylistic/no-trailing-spaces": "error",

      // no more than two trailing line breaks
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    },
  },
]);
