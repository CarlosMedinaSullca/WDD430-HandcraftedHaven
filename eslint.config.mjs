import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import reactPlugin from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const compat = new FlatCompat({
  baseDirectory: __dirname,
  // 💡 Important: Add a file extension for the resolver
  // to find traditional configs when using ES modules.
  resolvePluginsRelativeTo: __dirname, 
});

const eslintConfig = [
  // 2. Extend with essential configurations
  ...compat.extends(
    "next/core-web-vitals", 
    "next/typescript"
  ),
  
  // 3. Add Tailwind CSS Configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "tailwindcss": tailwindcssPlugin,
    },
    // Use the recommended Tailwind rules
    ...tailwindcssPlugin.configs.recommended, 
    rules: {
      // Your custom TypeScript rule
      "@typescript-eslint/no-explicit-any": "error",
      
      // Recommended Tailwind rule: Enforce consistent class order
      "tailwindcss/classnames-order": "warn", 
      
      // Recommended Tailwind rule: Prevent using hardcoded Tailwind utility classes in a string
      "tailwindcss/no-custom-classname": "off", // You might want this 'off' to allow non-Tailwind class names
    },
  },
  
  // 4. Add React Configuration (often needed for JSX rules not covered by Next.js defaults)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
        react: reactPlugin,
    },
    // Use the recommended React rules
    ...reactPlugin.configs.recommended,
    settings: {
        react: {
            version: "detect", // Automatically detect the React version
        },
    },
    rules: {
        // Example: Disable the rule requiring React to be imported in every file (JSX transform handles this)
        "react/react-in-jsx-scope": "off", 
        // Example: Enforce destructuring in props
        "react/destructuring-assignment": ["error", "always"],
    }
  },

  // 5. Place custom file ignores in a separate object
  {
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
