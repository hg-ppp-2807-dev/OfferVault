// ─── Ollama LLM client (drop-in replacement for Groq) ────────────────────────
// Ollama REST API at http://localhost:11434
// Make sure Ollama is running: `ollama serve`
// Pull the model: `ollama pull llama3.2:3b`

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";

export const GROQ_MODEL =
  process.env.OLLAMA_MODEL ?? "llama3.2:3b";

// ─── Convert messages array → plain prompt string ────────────────────────────
// llama3.2:3b's chat template causes premature EOS when the first turn has
// only a system message. Using /api/generate with a raw prompt avoids this.
function messagesToPrompt(
  messages: { role: "system" | "user" | "assistant"; content: string }[]
): string {
  return (
    messages
      .map((m) => {
        if (m.role === "system") return `### Instructions:\n${m.content}`;
        if (m.role === "user") return `### User:\n${m.content}`;
        return `### Assistant:\n${m.content}`;
      })
      .join("\n\n") + "\n\n### Assistant:\n"
  );
}

// ─── Core completion call via /api/generate ───────────────────────────────────
export async function groqChat(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  const prompt = messagesToPrompt(messages);

  const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: GROQ_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: options.temperature ?? 0.7,
        num_predict: options.max_tokens ?? 1024,
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

  let content: string | undefined;

  // Try single JSON parse first (non-streaming response)
  try {
    const data = JSON.parse(rawText);
    content = data?.response;
  } catch {
    // Fallback: NDJSON line-by-line (streaming chunks)
    const lines = rawText.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed?.response) content = (content ?? "") + parsed.response;
      } catch { /* skip malformed lines */ }
    }
  }

  if (!content?.trim()) {
    console.error("[ollama] Raw response:", rawText.slice(0, 500));
    throw new Error("Empty response from Ollama");
  }

  return content.trim();
}

// ─── JSON extraction helper ───────────────────────────────────────────────────
export async function groqJSON<T>(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<T> {
  const raw = await groqChat(messages, {
    ...options,
    max_tokens: options.max_tokens ?? 3000,
  });

  // Strip markdown code fences if present
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // Try extracting a JSON object from anywhere in the string
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as T;
    throw new Error(
      `Failed to parse Ollama JSON response: ${cleaned.slice(0, 200)}`
    );
  }
}
