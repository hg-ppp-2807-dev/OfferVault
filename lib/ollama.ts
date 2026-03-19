// ─── Standalone Ollama helper ─────────────────────────────────────────────────
// Simple callOllama() for the new feature modules.
// lib/groq.ts handles the original 3 modules with more sophisticated retry logic.

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2:3b";

export async function callOllama(prompt: string, options?: {
  temperature?: number;
  num_predict?: number;
}): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: options?.temperature ?? 0.4,
        num_predict: options?.num_predict ?? 512,
        num_ctx: 4096,
        repeat_penalty: 1.1,
        stop: ["### User:", "### Instructions:"],
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama error ${res.status}: ${text}`);
  }

  const rawText = await res.text();

  // Try single JSON first (non-streaming)
  try {
    const data = JSON.parse(rawText);
    if (data?.response) return data.response.trim();
  } catch { /* fall through to NDJSON */ }

  // Fallback: NDJSON streaming chunks
  let content = "";
  for (const line of rawText.split("\n").filter(Boolean)) {
    try {
      const parsed = JSON.parse(line);
      if (parsed?.response) content += parsed.response;
    } catch { /* skip */ }
  }

  if (!content.trim()) throw new Error("Empty response from Ollama");
  return content.trim();
}
