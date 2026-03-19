// ─── Safe JSON parser for Ollama responses ───────────────────────────────────

export function safeJSONParse<T = unknown>(text: string): T | null {
  // Strip markdown code fences
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // Try to extract a JSON object from the middle of the string
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch { /* fall through */ }
    }
    return null;
  }
}
