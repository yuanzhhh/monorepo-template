## 目录
- [概述](#概述)
- [工具详解](#工具详解)
  - [Git Subtree](#git-subtree)
  - [pnpm workspace](#pnpm-workspace)
  - [Turborepo](#turborepo)
- [组合优势](#组合优势)
- [实践指南](#实践指南)
- [最佳实践](#最佳实践)

## 概述

这三个工具的组合提供了一个完整的 monorepo 解决方案：
- Git Subtree：处理代码和版本管理
- pnpm workspace：处理依赖管理和模块复用
- Turborepo：处理构建优化和任务编排

## 工具详解

### Git Subtree

#### 作用
- 管理多仓库代码
- 维护独立版本历史
- 支持代码共享与同步
- 保持提交历史完整性

#### 核心命令
```bash
# 添加子项目
git subtree add --prefix packages/h5 h5-repo master

# 从子项目拉取更新
git subtree pull --prefix packages/h5 h5-repo master

# 推送更新到子项目
git subtree push --prefix packages/h5 h5-repo master
```

#### 优势
- 完整的提交历史
- 子项目可以独立维护
- 无需额外依赖
- 比 Git Submodule 更易用
- 新成员学习成本低

### pnpm workspace

#### 作用
- 统一管理项目依赖
- 处理模块间引用关系
- 优化包存储空间
- 提高依赖安装速度

#### 配置示例
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

#### 项目结构
```
root/
├── packages/
│   ├── shared/
│   │   └── package.json
│   ├── h5/
│   │   └── package.json
│   └── miniapp/
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

#### 依赖管理
```json
// packages/h5/package.json
{
  "name": "@scope/h5",
  "dependencies": {
    "@scope/shared": "workspace:*"
  }
}
```

#### 常用命令
```bash
# 安装所有依赖
pnpm install

# 给特定项目添加依赖
pnpm add axios --filter @scope/h5

# 运行特定项目命令
pnpm --filter @scope/h5 dev
```

### Turborepo

#### 作用
- 优化构建流程
- 管理任务执行顺序
- 提供智能缓存机制
- 支持并行构建

#### 配置示例
```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    }
  }
}
```

#### 构建优化
- 增量构建
- 并行执行
- 远程缓存
- 自动依赖分析

## 组合优势

### 1. 完整的生命周期覆盖
```
代码管理 (Git Subtree)
       ↓
依赖管理 (pnpm workspace)
       ↓
构建部署 (Turborepo)
```

### 2. 各司其职
- Git Subtree
  * 负责代码版本控制
  * 管理项目独立性
  * 处理代码合并和分发

- pnpm workspace
  * 处理依赖安装和更新
  * 管理模块间引用
  * 优化包存储结构

- Turborepo
  * 优化构建性能
  * 管理任务执行顺序
  * 提供缓存机制

### 3. 协同效应
- 版本控制与依赖管理的无缝集成
- 构建过程的自动优化
- 开发体验的整体提升

## 实践指南

### 1. 项目初始化
```bash
# 创建项目目录
mkdir my-monorepo && cd my-monorepo

# 初始化项目
pnpm init

# 创建工作空间配置
echo "packages:\n  - 'packages/*'" > pnpm-workspace.yaml

# 添加 Turborepo
pnpm add turbo -D -w

# 创建项目目录
mkdir -p packages/{shared,h5,miniapp}
```

### 2. 添加子项目
```bash
# 添加现有项目
git subtree add --prefix packages/h5 h5-repo master

# 或初始化新项目
cd packages/h5
pnpm init
```

### 3. 配置构建流程
```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

### 4. 日常开发流程
```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建项目
pnpm build

# 更新子项目
git subtree pull --prefix packages/h5 h5-repo master
```

## 最佳实践

### 1. 版本控制
- 使用清晰的提交信息
- 定期同步子仓库
- 避免复杂的合并冲突

### 2. 依赖管理
- 明确声明依赖关系
- 避免循环依赖
- 及时更新共享模块

### 3. 构建优化
- 合理配置缓存
- 优化构建管道
- 利用远程缓存

### 4. 团队协作
- 制定清晰的工作流程
- 统一代码规范
- 做好文档维护

### 5. 性能优化
- 使用增量构建
- 合理使用缓存
- 优化依赖结构

### 6. 注意事项
- 定期清理缓存
- 管理好访问权限
- 保持依赖更新
- 注意构建顺序

## 结论

这三个工具的组合提供了一个完整、高效的 monorepo 解决方案：
1. 完善的代码管理机制
2. 高效的依赖管理
3. 优秀的构建性能
4. 良好的开发体验

通过合理配置和使用，可以显著提升开发效率和项目维护性。