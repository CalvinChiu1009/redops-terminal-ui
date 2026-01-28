// src/composables/useChartData.ts
import { computed } from "vue";
import type { AttackLog } from "@/types/attack";
import type { ChartData } from "chart.js";

export function useChartData(
  logs: AttackLog[],
  timeWindowSeconds: number = 60,
) {
  // --- 1. 趨勢圖資料 (Line Chart) ---
  const trendData = computed<ChartData<"line">>(() => {
    // 找出目前時間 (以 5秒 為一個區間)
    const now = Date.now();
    const timeWindow = timeWindowSeconds * 1000; // 顯示最近 60 秒
    const interval = 5 * 1000; // 每 5 秒一個點

    // 初始化 buckets (最近 12 個 5秒區間)
    const buckets = new Map<
      number,
      { critical: number; warning: number; info: number }
    >();
    const labels: string[] = [];

    // 建立時間刻度
    const startTimestamp = Math.floor((now - timeWindow) / interval) * interval;
    for (let t = startTimestamp; t <= now; t += interval) {
      buckets.set(t, { critical: 0, warning: 0, info: 0 });
      // 格式化 X 軸標籤 (HH:mm:ss)
      const date = new Date(t);
      labels.push(
        `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`,
      );
    }

    // 填入數據 (過濾掉太舊的 logs)
    // 為了效能，我們只遍歷最近的 logs (假設 logs 是按時間排序的，我們可以從後面往前找)
    // 但為了簡單起見，我們先用 filter。Phase 5 可以優化這裡。
    const recentLogs = logs.filter((log) => log.timestamp >= startTimestamp);

    recentLogs.forEach((log) => {
      // 找到對應的 bucket (向下取整)
      const bucketTime = Math.floor(log.timestamp / interval) * interval;
      const bucket = buckets.get(bucketTime);

      if (bucket) {
        if (log.level === "CRITICAL") bucket.critical++;
        else if (log.level === "WARNING") bucket.warning++;
        else bucket.info++;
      }
    });

    // 轉換成 Chart.js datasets
    const criticalData = Array.from(buckets.values()).map((b) => b.critical);
    const warningData = Array.from(buckets.values()).map((b) => b.warning);
    const infoData = Array.from(buckets.values()).map((b) => b.info);

    return {
      labels,
      datasets: [
        {
          label: "CRITICAL",
          data: criticalData,
          borderColor: "#ff0040", // Red
          backgroundColor: "rgba(255, 0, 64, 0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "WARNING",
          data: warningData,
          borderColor: "#ffcc00", // Yellow
          backgroundColor: "rgba(255, 204, 0, 0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "INFO",
          data: infoData,
          borderColor: "#00d4ff", // Blue
          backgroundColor: "rgba(0, 212, 255, 0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  });

  // --- 2. 分佈圖資料 (Doughnut Chart) ---
  const distributionData = computed<ChartData<"doughnut">>(() => {
    let success = 0;
    let blocked = 0;
    let pending = 0;

    // 這裡我們統計全部 logs，或者您也可以只統計 recentLogs
    logs.forEach((log) => {
      if (log.status === "SUCCESS") success++;
      else if (log.status === "BLOCKED") blocked++;
      else pending++;
    });

    // 計算總數和百分比
    const total = blocked + success + pending;
    const blockedPct = total > 0 ? ((blocked / total) * 100).toFixed(1) : "0.0";
    const successPct = total > 0 ? ((success / total) * 100).toFixed(1) : "0.0";
    const pendingPct = total > 0 ? ((pending / total) * 100).toFixed(1) : "0.0";

    return {
      labels: [
        `BLOCKED: ${blocked} (${blockedPct}%)`,
        `SUCCESS: ${success} (${successPct}%)`,
        `PENDING: ${pending} (${pendingPct}%)`,
      ],
      datasets: [
        {
          data: [blocked, success, pending],
          backgroundColor: [
            "rgba(0, 255, 65, 0.8)", // Green (Blocked)
            "rgba(255, 0, 64, 0.8)", // Red (Success)
            "rgba(255, 204, 0, 0.8)", // Yellow (Pending)
          ],
          borderColor: "#0d0d0d",
          borderWidth: 2,
        },
      ],
    };
  });

  return {
    trendData,
    distributionData,
  };
}
