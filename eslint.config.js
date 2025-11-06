import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '.*',
      '**/*.d.ts',
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: 'latest', // ECMA语法支持版本
      sourceType: 'module', // 模块化类型
      parser: tseslint.parser, // 解析器
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...eslintPluginPrettier.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'no-var': 'error',
      'no-unused-vars': 'warn',
    },
  },
]);
