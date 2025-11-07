/**
 * @type {import('prettier').Options}
 */
export default {
  // 基础格式化配置
  semi: true, // 语句末尾添加分号
  trailingComma: 'es5', // 在ES5中有效的地方添加尾随逗号
  singleQuote: true, // 使用单引号而不是双引号
  printWidth: 80, // 换行长度，业界标准
  tabWidth: 2, // 缩进宽度
  useTabs: false, // 使用空格而不是制表符

  // 括号配置
  bracketSpacing: true, // 在对象字面量的括号之间添加空格
  bracketSameLine: false, // 将多行JSX元素的 > 放在下一行
  arrowParens: 'avoid', // 箭头函数参数只有一个时避免括号

  // 其他配置
  quoteProps: 'as-needed', // 仅在需要时给对象属性加引号
  jsxSingleQuote: true, // 在JSX中使用单引号
  proseWrap: 'preserve', // 保持markdown等文件的原始换行
  htmlWhitespaceSensitivity: 'css', // HTML空白字符敏感度
  vueIndentScriptAndStyle: false, // Vue文件中不缩进script和style标签
  embeddedLanguageFormatting: 'auto', // 自动格式化嵌入的语言
  singleAttributePerLine: false, // 每个属性一行（现代前端项目推荐为true）

  endOfLine: 'lf',
  // 导入顺序配置 (@ianvs/prettier-plugin-sort-imports)
  // 空字符串 '' 用于在导入组之间添加空行
  // 插件会自动排序导入的 specifiers（导入项）
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '', // Empty line',
    '^@/(.*)$',
    '',
    '^[./]',
  ],
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-organize-imports',
  ],

  // 文件类型特定配置
  overrides: [
    {
      files: ['*.css', '*.scss'],
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
    {
      files: ['*.md', '*.markdown'],
      options: {
        parser: 'markdown',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      options: {
        parser: 'babel',
        semi: true,
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
        semi: true,
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.md'],
      options: {
        printWidth: 80,
        proseWrap: 'always', // Markdown正文自动换行
        tabWidth: 2,
      },
    },
    {
      files: ['*.yml'],
      options: {
        tabWidth: 2,
        singleQuote: false, // YAML文件使用双引号或不加引号
      },
    },
    {
      files: ['*.yaml'],
      options: {
        tabWidth: 2,
        singleQuote: false, // YAML文件使用双引号或不加引号
      },
    },
  ],
};
