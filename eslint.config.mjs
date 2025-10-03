import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    //  files: ["tailwind.config.js", "tailwind.config.cjs"],
      rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-var-requires": "off"
  },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
