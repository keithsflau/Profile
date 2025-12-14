# GitHub Upload Instructions

## 已完成的工作

✅ **所有更改已提交到本地 Git 仓库**

## 推送到 GitHub 的步骤

### 1. 如果还没有配置远程仓库：

```powershell
# 添加你的 GitHub 仓库地址
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 或者使用 SSH
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 2. 设置主分支（如果还没有）：

```powershell
git branch -M main
```

### 3. 推送到 GitHub：

```powershell
# 首次推送
git push -u origin main

# 之后的推送
git push
```

### 4. 或者使用提供的脚本：

```powershell
powershell -ExecutionPolicy Bypass -File commit-and-push.ps1
```

## 本次提交包含的内容

1. **修复了构建脚本** (`build-all-apps.ps1`)
   - 移除了导致解析错误的 emoji 字符
   - 修复了中文路径的编码问题
   - 添加了错误处理

2. **更新了所有 Dashboard**
   - Primary School dashboard
   - Biology dashboard (添加了 13 个应用)
   - Primary Chinese dashboard (添加了 2 个应用)

3. **为所有应用添加了 Visit Counter**
   - 24 个 Biology apps
   - 2 个 Primary Chinese apps

4. **修复了逻辑错误**
   - allopatric-speciation: 修复了重复的 setPopB 调用
   - gel-electrophoresis: 修复了变量命名错误

5. **验证了学术准确性**
   - cellular-respiration: ATP 计算正确
   - photosynthesis: 添加了注释说明
   - energy-flow: 10% 规则实现正确

6. **创建了构建脚本和文档**
   - build-all-apps.ps1
   - build-all.js
   - BUILD_ALL.md
   - 其他文档文件

## 注意事项

- 如果 GitHub 仓库还不存在，请先在 GitHub 上创建一个新仓库
- 确保你有推送权限
- 如果使用 HTTPS，可能需要输入 GitHub 用户名和密码/令牌
- 如果使用 SSH，确保已配置 SSH 密钥
