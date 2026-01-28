# 🚨 RedOps 指揮中心

[English](./README.md) | [繁體中文](./README.zh-TW.md)

> 使用 Vue 3、TypeScript 和 Tailwind CSS 打造的網路安全主題攻擊日誌監控儀表板

## 📋 專案概述

RedOps 指揮中心是一個即時攻擊日誌監控系統，旨在展示現代 Vue 3 開發實踐、狀態管理和安全意識的前端工程。此專案展示了構建高效能、型別安全且視覺吸引力強的 Web 應用程式的能力。

## ✨ 核心功能

### 🎯 主要功能

- **即時日誌串流**：持續生成具有真實數據的模擬攻擊日誌
- **虛擬滾動**：使用 `@vueuse/core` 高效處理 10,000+ 筆日誌條目
- **進階篩選**：依威脅等級、狀態和自訂搜尋查詢篩選日誌
- **互動式分析**：由 Chart.js 驅動的即時圖表，顯示攻擊趨勢和分布

### 🔒 安全功能

- **XSS 檢測與防禦**：內建 9 種常見 XSS 攻擊向量的模式檢測
- **DOMPurify 整合**：在安全模式下自動淨化 payload
- **安全/原始模式切換**：在淨化和原始 payload 顯示之間切換
- **視覺化 XSS 指示器**：偵測到威脅時顯示紅色光暈動畫和警告標籤

### 🎨 UI/UX 卓越性

- **賽博龐克美學**：終端機綠色配色方案搭配玻璃擬態效果
- **粒子背景**：基於 Canvas 的動態粒子系統與連接線
- **響應式設計**：針對桌面和行動裝置優化的完全響應式佈局
- **流暢動畫**：全站 CSS 過渡效果和微互動

### ⚡ 效能優化

- **虛擬滾動**：僅渲染可見項目以獲得最佳效能
- **Pinia 狀態管理**：集中式、型別安全的狀態管理
- **自動滾動控制**：跨頁面導航的持久化自動滾動狀態
- **懶加載**：基於路由的程式碼分割，加快初始載入速度

## 🛠️ 技術棧

### 核心框架

- **Vue 3.5.24** - Composition API 搭配 `<script setup>`
- **TypeScript 5.9.3** - 全應用程式型別安全
- **Vite 7.2.4** - 閃電般快速的建置工具和開發伺服器

### 狀態與路由

- **Pinia 3.0.4** - 直觀的狀態管理
- **Vue Router 4.6.4** - 客戶端路由

### UI 與樣式

- **Tailwind CSS 4.1.18** - Utility-first CSS 框架
- **Chart.js 4.5.1** - 數據視覺化
- **@heroicons/vue 2.2.0** - 圖標庫

### 工具函式庫

- **@vueuse/core 14.1.0** - Vue composition 工具（虛擬滾動）
- **DOMPurify 3.3.1** - XSS 淨化
- **date-fns 4.1.0** - 日期格式化

## 📦 安裝

### 前置需求

- Node.js 18+ 或 20+
- pnpm（推薦）或 npm

### 步驟

1. **克隆儲存庫**

   ```bash
   git clone <your-repo-url>
   cd "RedOps Command Center (MVP)"
   ```

2. **安裝依賴**

   ```bash
   pnpm install
   # 或
   npm install
   ```

3. **啟動開發伺服器**

   ```bash
   pnpm dev
   # 或
   npm run dev
   ```

4. **在瀏覽器中開啟**
   ```
   http://localhost:5173
   ```

## 🚀 生產環境建置

```bash
# 型別檢查並建置
pnpm build

# 預覽生產建置
pnpm preview
```

## 📂 專案結構

```
src/
├── components/
│   ├── analytics/       # 圖表元件
│   ├── dashboard/       # Dashboard 專用元件
│   ├── layout/          # 佈局元件（Sidebar、Header 等）
│   └── logs/            # 日誌顯示元件
├── composables/         # 可重用的 composition 函式
│   ├── useMockStream.ts # 模擬數據生成器
│   ├── useSafeRender.ts # XSS 檢測與淨化
│   └── useUISettings.ts # UI 偏好設定
├── stores/              # Pinia stores
│   └── attackStore.ts   # 攻擊日誌狀態管理
├── types/               # TypeScript 型別定義
│   └── attack.ts        # 攻擊日誌介面
├── views/               # 頁面元件
│   ├── DashboardView.vue
│   ├── LogsView.vue
│   ├── AnalyticsView.vue
│   └── SettingsView.vue
└── router/              # Vue Router 配置
    └── index.ts
```

## 🎯 關鍵技術亮點

### 1. 虛擬滾動實作

```typescript
const { list, containerProps, wrapperProps } = useVirtualList(logs, {
  itemHeight: 80,
  overscan: 5,
});
```

以最小的效能影響處理 10,000+ 個項目。

### 2. XSS 檢測模式

```typescript
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /javascript:/gi,
  // ... 另外 6 種模式
];
```

### 3. 型別安全的狀態管理

```typescript
interface AttackLog {
  id: string;
  timestamp: number;
  level: ThreatLevel;
  source_ip: string;
  target_port: number;
  payload: string;
  status: AttackStatus;
}
```

## 🎨 功能展示

### Dashboard（儀表板）

- 即時統計卡片
- 威脅等級快速篩選
- 最近攻擊日誌串流

### Logs View（日誌檢視）

- 虛擬滾動以提升效能
- 自動滾動切換
- 完整日誌詳情與時間戳記

### Analytics（分析）

- 威脅趨勢折線圖（過去 24 小時）
- 攻擊分布圓餅圖
- 互動式 Chart.js 視覺化

### Settings（設定）

- 安全模式切換
- XSS 測試注入
- 清除日誌功能

## 🔐 安全考量

此專案展示了具有安全意識的前端開發：

- **輸入淨化**：所有使用者生成的內容都使用 DOMPurify 進行淨化
- **XSS 檢測**：基於模式的檢測會向使用者警示潛在威脅
- **預設安全**：預設啟用安全模式
- **視覺警告**：為危險 payload 提供清晰的指示器

## 🎓 學習成果

此專案展示了：

- ✅ Vue 3 Composition API 精通
- ✅ TypeScript 整合與型別安全
- ✅ 使用 Pinia 進行狀態管理
- ✅ 效能優化技術
- ✅ 安全優先的前端開發
- ✅ 使用 Tailwind 的現代 CSS
- ✅ 使用 Chart.js 進行數據視覺化
- ✅ 響應式設計原則

## 📝 授權

此專案僅供教育和作品集用途。

## 👤 作者

**Calvin Chiu**

- GitHub: [@CalvinChiu1009](https://github.com/CalvinChiu1009)

---

**使用 Vue 3 + TypeScript + Tailwind CSS 用 ❤️ 打造**
