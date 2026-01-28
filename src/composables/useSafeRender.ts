import DOMPurify from "dompurify";
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";

/**
 * Composable for safe rendering of potentially malicious payloads
 * Provides XSS detection and sanitization based on Safe Mode state
 */
export function useSafeRender() {
  const store = useAttackStore();
  const { safeMode } = storeToRefs(store);

  /**
   * XSS pattern detection
   * Detects common XSS attack patterns in payloads
   */
  const XSS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // <script> tags
    /javascript:/gi, // javascript: protocol
    /on\w+\s*=/gi, // Event handlers (onclick, onerror, etc.)
    /<iframe/gi, // <iframe> tags
    /<object/gi, // <object> tags
    /<embed/gi, // <embed> tags
    /eval\(/gi, // eval() calls
    /expression\(/gi, // CSS expression()
    /<img[^>]+src[^>]*>/gi, // <img> tags (potential onerror)
  ];

  /**
   * Check if a payload contains XSS patterns
   * @param payload - The string to check
   * @returns true if XSS pattern is detected
   */
  function isXSSPayload(payload: string): boolean {
    if (!payload || typeof payload !== "string") return false;
    return XSS_PATTERNS.some((pattern) => pattern.test(payload));
  }

  /**
   * Render payload safely based on Safe Mode state
   * - Safe Mode ON: Sanitize with DOMPurify
   * - Safe Mode OFF: Return raw payload (will be displayed in <code> tags)
   * @param payload - The payload to render
   * @returns Sanitized or raw payload
   */
  function renderPayload(payload: string): string {
    if (!payload || typeof payload !== "string") return "";

    // If Safe Mode is ON, sanitize payload
    if (safeMode.value) {
      return DOMPurify.sanitize(payload, {
        // DOMPurify 的內建參數
        ALLOWED_TAGS: [], // 白名單：除了這些標籤，其他都封殺
        ALLOWED_ATTR: [], // 白名單：除了這些屬性，其他都封殺
        KEEP_CONTENT: true, // 如果 ALLOWED_TAGS 和 ALLOWED_ATTR 都是空的，tag 會被移除，但“內容字串“會活下來
        // FORBID_TAGS: [], // 黑名單：除了這些標籤，其他都准許
        // FORBID_ATTR: [], // 黑名單：除了這些屬性，其他都准許
        // RETURN_DOM: false, // 如果為 true，DOMPurify 會返回 DOM 元素，而不是字串
        // WHOLE_DOCUMENT: false, // 如果為 true，DOMPurify 會返回整個 HTML 文件，而不是字串
      });
    }

    // 未啟用 Safe Mode，直接返回原始 payload
    // (Will be displayed in <code> tags by the component)
    return payload;
  }

  /**
   * Get a visual indicator class for XSS payloads
   * @param payload - The payload to check
   * @returns CSS class string for highlighting
   */
  function getXSSIndicatorClass(payload: string): string {
    return isXSSPayload(payload) ? "xss-detected" : "";
  }

  return {
    safeMode,
    isXSSPayload,
    renderPayload,
    getXSSIndicatorClass,
  };
}
