import js from "@eslint/js";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended, // Standard JS rules
  next.coreWebVitals, // Next.js best practices
  prettier, // Prettier rules
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      tailwindcss,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
    settings: {
      tailwindcss: {
        callees: ["cn"],
        config: "./tailwind.config.js",
      },
      next: {
        rootDir: ["./"],
      },
    },
  },
];

