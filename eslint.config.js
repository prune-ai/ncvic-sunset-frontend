import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import unicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      react,
      import: importPlugin,
      "unused-imports": unusedImports,
      unicorn,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
        noWarnOnMultipleProjects: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          paths: ["src"],
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: {
      // React plugin rules
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Using TypeScript for prop validation

      // Import plugin rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",
      "import/no-unused-modules": "off", // Can be slow, enable if needed

      // Unused imports plugin rules
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": "off", // Turn off TypeScript rule
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Unicorn plugin rules
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: [/^[A-Z]/, /\.config\.(js|ts)$/],
        },
      ],
      "unicorn/prevent-abbreviations": "off", // Can be too strict
      "unicorn/no-null": "off", // Sometimes null is needed
      "unicorn/no-array-reduce": "off", // Reduce can be useful
      "unicorn/prefer-module": "off", // Using ES modules
      "unicorn/no-useless-undefined": "off", // Sometimes explicit undefined is clearer
    },
  }
);
