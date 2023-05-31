# VST

VST (Vue Starter Template) 是一个固执己见的 `Vue 3/TypeScript` 启动模板项目.

## 特性

- [x] 基于 [Vue 3](https://cn.vuejs.org/), [Vite](https://cn.vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [pnpm](https://pnpm.io/zh/)
- [x] 使用 Tailwind CSS，基于原子化 CSS 进行快速开发
- [x] 使用 Sass 进行 CSS 预处理
- [x] 使用 Vue Router 进行路由管理
- [x] 使用 Pinia 进行全局状态管理
- [x] 使用 Axios 进行请求管理
- [ ] 使用 ESLint, Prettier, Husky, lintstaged, Code Spell Check, commitlint, editorconfig 进行前端工程化配置
- [x] 部署在 Vercel 上，零配置

## 技术栈

- [Vue 3](https://cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://cn.vitejs.dev/)
- [Sass](https://sass-lang.com/)

## 开始使用

### GitHub 模板

> EST 需要 Node 版本 >=14.16.0

[使用这个模板创建仓库](https://github.com/recallwei/vst/generate)。

### 克隆到本地

如果您更喜欢使用更干净的 Git 历史记录手动执行此操作：

```bash
npx degit recallwei/vst my-vst-app
cd my-vst-app
pnpm i
```

## 清单

- [ ] 在 `LICENSE` 中改变作者名
- [ ] 在 `package.json` 中改变配置
- [ ] 在 `.env` 中修改环境变量
- [ ] 在 `/public` 目录下更改 `favicon.ico`
- [ ] 在 `vite.config.ts` 更改主机名
- [ ] 整理 `README.md` 并删除冗余的路由

## 使用

### 安装

```bash
pnpm i
```

### 启动

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

## 部署

前往 Vercel 并选择你的仓库，模板选择 Vite，然后点击部署即可。

## 已知问题

- [ ] xxx

## 许可证

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei)
