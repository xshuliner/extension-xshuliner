import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// 基础规则
const baseRules = {
  ...eslint.configs.recommended.rules,
  ...eslintPluginPrettier.configs.recommended.rules,
  ...eslintConfigPrettier.rules,
  'no-var': 'error',
  'no-unused-vars': 'warn',
};

// TypeScript 特定规则
const typescriptRules = {
  ...baseRules,
  ...tseslint.configs.recommended.rules,
  // ...tseslint.configs.recommendedTypeChecked.rules,
  // ...tseslint.configs.stylisticTypeChecked.rules,
  'no-unused-vars': 'off', // 使用 TypeScript 的 no-unused-vars 替代
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
};

// 通用配置
const commonConfig = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};

// TypeScript 解析器配置
const typescriptParserOptions = {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
};

// 插件配置
const typescriptPlugins = {
  '@typescript-eslint': tseslint.plugin,
  prettier: eslintPluginPrettier,
};

const javascriptPlugins = {
  prettier: eslintPluginPrettier,
};

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '.*',
      '**/*.d.ts',
    ],
  },
  // src 目录下的 TypeScript/TSX 文件
  {
    files: ['./src/**/*.{ts,tsx}'],
    plugins: typescriptPlugins,
    languageOptions: {
      ...commonConfig,
      parser: tseslint.parser,
      parserOptions: typescriptParserOptions,
      globals: { ...globals.browser },
    },
    rules: typescriptRules,
  },
  // src 目录下的 JavaScript 文件
  {
    files: ['./src/**/*.js'],
    plugins: javascriptPlugins,
    languageOptions: {
      ...commonConfig,
      globals: { ...globals.browser },
    },
    rules: baseRules,
  },
  // script 目录和根目录下的 TypeScript 文件
  {
    files: ['./script/**/*.ts', './*.ts'],
    plugins: typescriptPlugins,
    languageOptions: {
      ...commonConfig,
      parser: tseslint.parser,
      parserOptions: typescriptParserOptions,
      globals: { ...globals.node },
    },
    rules: typescriptRules,
  },
  // script 目录和根目录下的 JavaScript 文件
  {
    files: ['./script/**/*.js', './*.js'],
    plugins: javascriptPlugins,
    languageOptions: {
      ...commonConfig,
      globals: { ...globals.node },
    },
    rules: baseRules,
  },
]);
