# extension-xshuliner

> 一款基于 React + TypeScript + Vite +
> CRXJS 打造的多端浏览器扩展，覆盖 Popup、Side Panel、Options、New
> Tab、DevTools、Content Script 与 Background，旨在提供高效优雅的日常工作体验。

- React 19 · Vite 6 · TypeScript 5.9 · Tailwind CSS 4
- 基于 `@crxjs/vite-plugin` 的多平台 Manifest 管线（Chrome / Edge / Firefox /
  Safari）
- WebExtension Polyfill 驱动，支持 Badge、Side
  Panel、Port、WebRequest 等浏览器能力

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Runtime Surfaces](#runtime-surfaces)
- [Environment & Manifest](#environment--manifest)
- [Quality Tooling](#quality-tooling)
- [Release & Versioning](#release--versioning)
- [FAQ](#faq)
- [License](#license)

## Features

- **多实例界面**：Popup / Side Panel / Options / New Tab / DevTools / Content
  Script 全覆盖。
- **背景态自动化**：`src/background/index.ts`
  中集中管理 badge、tab 事件、Port 与 WebRequest 回调。
- **跨环境打包**：`WEBENV`（uat/prod）与
  `PLATFORM`（chrome/edge/firefox/safari）双维度出包。
- **模块化 Manifest**：`script/manifests` 提供平台差异化配置，统一由
  `defineManifest` 聚合。
- **共享内核**：`src/common` 存放组件、工具、kits（如
  `BackgroundEventManager`、`GlobalManager`）。
- **Tailwind + 自定义 UI 组件**：`XButton`、`XNavHeader`、`XPageCore`
  等组合快速搭建界面。

## Tech Stack

- React 19 + React Router DOM 7
- Vite 6 with `@crxjs/vite-plugin`
- TypeScript 5.9 & `@types/webextension-polyfill`
- Tailwind CSS 4（`src/tailwind.css`）
- ESLint 9 · Prettier 3 · CSpell · Husky · lint-staged

## Project Structure

```
.
├── public/                # 静态资源（icon、字体）
├── script/                # Manifest 定义、平台差异、工具方法
├── src/
│   ├── background/        # Background service worker
│   ├── content/           # Content Script 入口
│   ├── popup|options|...  # 多个 UI surface（含 App.tsx + main.tsx）
│   ├── devtools/          # DevTools 面板 + React Router
│   ├── common/            # 组件、kits、utils、页面
│   └── assets/            # 静态资源
├── vite.config.ts         # Vite + CRXJS 配置，包含 outDir 策略
├── package.json           # 脚本、依赖、Lint & Release 配置
└── dist/                  # 构建产物（按平台/环境分文件夹）
```

## Getting Started

### Prerequisites

- Node.js ≥ 18.18
- pnpm ≥ 10（已在 `packageManager` 声明）

### Install

```bash
pnpm install
```

### Development

```bash
# 默认：Chrome + UAT
pnpm dev

```

开发模式下，CRXJS 会自动启动 Vite Dev Server，并注入扩展入口。

### Build

```bash
pnpm build          # prod / chrome
pnpm build:uat      # uat / chrome
pnpm build:prod     # prod / chrome
```

构建产物位于 `dist/extension-xshuliner-<platform>-<version>[-<webenv>]`。

### Preview

```bash
pnpm preview
```

### Load Extension (Chrome)

1. 打开 `chrome://extensions`
2. 打开「开发者模式」
3. 选择「加载已解压的扩展程序」
4. 选择对应 dist 子目录（示例：`dist/extension-xshuliner-chrome-0.0.1-uat`）

## Runtime Surfaces

- **Background**：集中处理安装、Badge、Tabs、Runtime Port、WebRequest 等事件。
- **Content Script**：`src/content/index.tsx`
  作为注入入口，可与 Background/Popup 通信。
- **Popup / Options / Side Panel / New Tab**：每个目录内包含独立的 `App.tsx` 与
  `main.tsx`。
- **DevTools**：`src/devtools` 提供单独的 React 路由与页面示例（Home、Demo）。

所有界面共享 `src/common` 中的组件、工具与状态管理。

## Environment & Manifest

- `WEBENV`: `uat | prod`，用于区分资源域或接口。
- `PLATFORM`: `chrome | edge | firefox | safari`，驱动差异化 manifest。
- `NODE_ENV`: 由 Vite 接管，默认 `production`。

`script/manifest.config.ts` 会根据 `PLATFORM` 选择对应的 manifest 片段，再与
`manifest.base`
合并，确保在多平台之间共享核心配置并允许差异化字段（如权限、browser_specific_settings）。

## Quality Tooling

```bash
pnpm lint           # tsc --noEmit + eslint + prettier + cspell
pnpm lint:eslint
pnpm lint:prettier
pnpm lint:cspell
```

- Husky 在 `prepare` 阶段自动安装 Git Hook
- lint-staged 覆盖 TS/JS/JSON/CSS/HTML/MD 等常见文件
- Commitizen + Commitlint 约束提交规范

## Release & Versioning

- 使用 `standard-version` 进行语义化版本管理：`pnpm release`
- 输出的 changelog/版本号将与 `package.json` 同步

## FAQ

- **如何自定义 Manifest 权限？**  
  在 `script/manifests/manifest.<platform>.ts` 中修改对应字段，再重新构建。
- **如何接入后端接口？**  
  使用 `src/common/kits/FetchManager.ts` 提供的封装或在 `GlobalManager`
  中统一调度。
- **是否可以扩展更多 Surface？**  
  参照现有目录（例如 `src/popup`）复制结构，并在 manifest 中启用入口。

## License

未声明许可证，默认保留所有权利。如需开源请在此处补充授权信息。
