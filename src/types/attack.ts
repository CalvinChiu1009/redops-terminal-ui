// 定義威脅等級類型
export type ThreatLevel = "INFO" | "WARNING" | "CRITICAL";

// 定義攻擊狀態類型
export type AttackStatus = "BLOCKED" | "SUCCESS" | "PENDING";

// 定義攻擊日誌介面
export interface AttackLog {
  id: string;
  timestamp: number;
  source_ip: string;
  target_port: number;
  payload: string;
  level: ThreatLevel;
  status: AttackStatus;
}
