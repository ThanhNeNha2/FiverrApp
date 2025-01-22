import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "error", // Hoặc "error" nếu bạn muốn báo lỗi
      "react/prop-types": "on",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
