/**
 * Extracts plain text from a PDF Buffer using pdf-parse.
 * Must only be called from server-side code (API routes / Server Components).
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import so it never runs on the client bundle
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text.trim();
}

/**
 * Converts an uploaded File (Web API) to a Node.js Buffer.
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Rough word-count for display purposes.
 */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
