# MCLab - Mobile Communication Lab

現代化的實驗室網站，採用 Next.js 15 + shadcn/ui 建構，提供完整的內容管理系統。

🌐 **指導教授**: [蔡子傑教授](http://www.cs.nccu.edu.tw/~ttsai/) - 國立政治大學資訊科學系

## ✨ 功能特色

### 前台功能
- **首頁**: 實驗室介紹、統計數據、最新專案展示
- **Projects 頁面**: 專案展示，支援搜尋和篩選
- **Team 頁面**: 團隊成員介紹，依角色分組展示
- **Research 頁面**: 研究方向展示

### 後台管理
- **Dashboard**: 統計總覽、快速檢視
- **Team Management**: 完整的成員 CRUD 管理
- **Projects Management**: 專案新增、編輯、刪除
- **Research Management**: 研究領域管理

### 技術亮點
- ⚡ Next.js 15 App Router
- 🎨 shadcn/ui + Tailwind CSS
- 📱 完全響應式設計
- 🌙 深色主題
- 🔒 Server Actions for Admin CRUD
- 📊 即時數據統計

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```
訪問 [http://localhost:3000](http://localhost:3000)

### 建置專案
```bash
npm run build
npm start
```

## 📁 專案結構

```
MCLab/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # 首頁
│   ├── projects/          # 專案頁面
│   ├── team/              # 團隊頁面
│   ├── research/          # 研究頁面
│   └── admin/             # 管理後台
│       ├── dashboard/
│       ├── team/
│       ├── projects/
│       └── research/
├── components/
│   ├── ui/                # shadcn/ui 組件
│   ├── layout/            # 佈局組件
│   └── admin/             # 管理組件
├── lib/
│   ├── types.ts           # TypeScript 型別定義
│   ├── data.ts            # 數據讀取函數
│   ├── utils.ts           # 工具函數
│   └── admin-actions.ts   # Admin Server Actions
├── data/                  # JSON 數據檔案
│   ├── team.json
│   ├── projects.json
│   └── research.json
└── old/                   # 舊版靜態網站備份
```

## 📝 內容管理

### 方式一：使用 Admin 介面（推薦）

1. 啟動開發伺服器：`npm run dev`
2. 訪問 [http://localhost:3000/admin](http://localhost:3000/admin)
3. 使用 UI 介面新增、編輯、刪除內容

### 方式二：直接編輯 JSON 檔案

編輯 `data/` 目錄下的 JSON 檔案：

#### team.json - 團隊成員
```json
{
  "id": "unique-id",
  "name": "姓名",
  "role": "advisor|phd|master|undergraduate|alumni",
  "email": "email@example.com",
  "bio": "簡介",
  "research": ["研究領域1", "研究領域2"],
  "links": {
    "github": "GitHub URL",
    "scholar": "Google Scholar URL",
    "website": "個人網站"
  },
  "joinedYear": 2024
}
```

#### projects.json - 專案
```json
{
  "id": "unique-id",
  "title": "專案標題",
  "author": "作者",
  "description": "專案描述",
  "link": "https://github.com/...",
  "tags": ["標籤1", "標籤2"],
  "year": 2025,
  "status": "active|completed|archived"
}
```

#### research.json - 研究領域
```json
{
  "id": "unique-id",
  "title": "研究領域標題",
  "description": "詳細描述",
  "icon": "📡",
  "keywords": ["關鍵字1", "關鍵字2"],
  "publications": 5
}
```

## 🌐 部署

### 推薦：Vercel（一鍵部署）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MCLab-NCCUCS/MCLab)

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 導入專案
3. 自動部署完成！

### 其他平台
- **Netlify**: 支援 Next.js
- **Railway**: 支援 Node.js
- **Render**: 支援 Web Services

**注意**: 由於使用了 Server Actions，**不支援** GitHub Pages 純靜態部署。

## 🎨 自訂樣式

### 顏色主題
編輯 `app/globals.css` 中的 CSS 變數：

```css
:root {
  --background: 222.2 84% 4.9%;
  --primary: 217.2 91.2% 59.8%;
  /* ... */
}
```

### Tailwind 配置
修改 `tailwind.config.ts`

## 📜 開發紀錄

此專案從純靜態 HTML 網站升級為 Next.js 15 全功能網站：

- **v1.0**: 靜態 HTML + GitHub Pages
- **v2.0**: Next.js 15 + Admin Dashboard + shadcn/ui

舊版備份於 `old/` 目錄。

## 🤝 貢獻指南

請參考 [CONTRIBUTING.md](.github/CONTRIBUTING.md) 了解：
- Git 工作流程
- Branch 命名規範
- PR 提交流程

## 📄 授權

此專案為政大資訊科學系 MCLab 實驗室專案。

## 👥 聯絡方式

- **指導教授**: 蔡子傑 (ttsai@cs.nccu.edu.tw)
- **實驗室網站**: [MCLab](https://mclab-nccucs.github.io/MCLab/)

---

使用 [Next.js](https://nextjs.org) + [shadcn/ui](https://ui.shadcn.com) 打造 ❤️
