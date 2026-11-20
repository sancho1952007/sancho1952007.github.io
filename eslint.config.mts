
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignore generated files and dependencies
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
    "**/.turbo/**",
    "**/next-env.d.ts",
  ]),

  // JavaScript
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // TypeScript
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript handles undefined variable checking.
      "no-undef": "off",
    },
  },

  // Bun-specific scripts
  {
    files: [
      "server.{js,ts}",
      "scripts/**/*.{js,ts}",
    ],
    languageOptions: {
      globals: {
        Bun: "readonly",
      },
    },
  },

  // React recommended rules
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Modern React JSX runtime
  {
    ...pluginReact.configs.flat["jsx-runtime"],
    files: ["**/*.{jsx,tsx}"],
  },
]);
