# 🚨 RedOps Command Center

[English](./README.md) | [繁體中文](./README.zh-TW.md)

> A cybersecurity-themed attack log monitoring dashboard built with Vue 3, TypeScript, and Tailwind CSS.

## 📋 Project Overview

RedOps Command Center is a real-time attack log monitoring system designed to showcase modern Vue 3 development practices, state management, and security-aware frontend engineering. This project demonstrates proficiency in building performant, type-safe, and visually engaging web applications.

## ✨ Key Features

### 🎯 Core Functionality

- **Real-time Log Streaming**: Mock attack logs generated continuously with realistic data
- **Virtual Scrolling**: Efficiently handles 10,000+ log entries using `@vueuse/core`
- **Advanced Filtering**: Filter logs by threat level, status, and custom search queries
- **Interactive Analytics**: Real-time charts powered by Chart.js showing attack trends and distributions

### 🔒 Security Features

- **XSS Detection & Prevention**: Built-in pattern detection for 9 common XSS attack vectors
- **DOMPurify Integration**: Automatic payload sanitization in Safe Mode
- **Safe/Raw Mode Toggle**: Switch between sanitized and raw payload display
- **Visual XSS Indicators**: Red glow animations and warning badges for detected threats

### 🎨 UI/UX Excellence

- **Cyberpunk Aesthetic**: Terminal-green color scheme with glassmorphism effects
- **Particle Background**: Dynamic canvas-based particle system with connection lines
- **Responsive Design**: Fully responsive layout optimized for desktop and mobile
- **Smooth Animations**: CSS transitions and micro-interactions throughout

### ⚡ Performance Optimizations

- **Virtual Scrolling**: Renders only visible items for optimal performance
- **Pinia State Management**: Centralized, type-safe state management
- **Auto-scroll Control**: Persistent auto-scroll state across page navigation
- **Lazy Loading**: Route-based code splitting for faster initial load

## 🛠️ Tech Stack

### Core Framework

- **Vue 3.5.24** - Composition API with `<script setup>`
- **TypeScript 5.9.3** - Full type safety across the application
- **Vite 7.2.4** - Lightning-fast build tool and dev server

### State & Routing

- **Pinia 3.0.4** - Intuitive state management
- **Vue Router 4.6.4** - Client-side routing

### UI & Styling

- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Chart.js 4.5.1** - Data visualization
- **@heroicons/vue 2.2.0** - Icon library

### Utilities

- **@vueuse/core 14.1.0** - Vue composition utilities (virtual scrolling)
- **DOMPurify 3.3.1** - XSS sanitization
- **date-fns 4.1.0** - Date formatting

## 📦 Installation

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd "RedOps Command Center (MVP)"
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🚀 Build for Production

```bash
# Type-check and build
pnpm build

# Preview production build
pnpm preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── analytics/       # Chart components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components (Sidebar, Header, etc.)
│   └── logs/            # Log display components
├── composables/         # Reusable composition functions
│   ├── useMockStream.ts # Mock data generator
│   ├── useSafeRender.ts # XSS detection & sanitization
│   └── useUISettings.ts # UI preferences
├── stores/              # Pinia stores
│   └── attackStore.ts   # Attack logs state management
├── types/               # TypeScript type definitions
│   └── attack.ts        # Attack log interfaces
├── views/               # Page components
│   ├── DashboardView.vue
│   ├── LogsView.vue
│   ├── AnalyticsView.vue
│   └── SettingsView.vue
└── router/              # Vue Router configuration
    └── index.ts
```

## 🎯 Key Technical Highlights

### 1. Virtual Scrolling Implementation

```typescript
const { list, containerProps, wrapperProps } = useVirtualList(logs, {
  itemHeight: 80,
  overscan: 5,
});
```

Handles 10,000+ items with minimal performance impact.

### 2. XSS Detection Patterns

```typescript
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /javascript:/gi,
  // ... 6 more patterns
];
```

### 3. Type-Safe State Management

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

## 🎨 Features Showcase

### Dashboard

- Real-time statistics cards
- Quick filters for threat levels
- Recent attack log stream

### Logs View

- Virtual scrolling for performance
- Auto-scroll toggle
- Full log details with timestamps

### Analytics

- Threat trend line chart (last 24 hours)
- Attack distribution pie chart
- Interactive Chart.js visualizations

### Settings

- Safe Mode toggle
- XSS test injection
- Clear logs functionality

## 🔐 Security Considerations

This project demonstrates security-aware frontend development:

- **Input Sanitization**: All user-generated content is sanitized using DOMPurify
- **XSS Detection**: Pattern-based detection alerts users to potential threats
- **Safe by Default**: Safe Mode is enabled by default
- **Visual Warnings**: Clear indicators for dangerous payloads

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Vue 3 Composition API mastery
- ✅ TypeScript integration and type safety
- ✅ State management with Pinia
- ✅ Performance optimization techniques
- ✅ Security-first frontend development
- ✅ Modern CSS with Tailwind
- ✅ Data visualization with Chart.js
- ✅ Responsive design principles

## 📝 License

This project is for educational and portfolio purposes.

## 👤 Author

**Calvin Chiu**

- GitHub: [@CalvinChiu1009](https://github.com/CalvinChiu1009)

---

**Built with ❤️ using Vue 3 + TypeScript + Tailwind CSS**
