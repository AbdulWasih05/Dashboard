import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
      "jest.setup.js",
      "scripts/**",
      "cypress/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
