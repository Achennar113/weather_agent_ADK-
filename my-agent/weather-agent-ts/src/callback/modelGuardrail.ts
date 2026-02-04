/**
 * beforeModelCallback (TypeScript ADK)
 * Blocks model call if user message contains "BLOCK"
 */
export function modelGuardrail(context: any): any | null {
  const contents = context?.llmRequest?.contents ?? [];

  const lastMessage =
    contents[contents.length - 1]?.parts?.[0]?.text ?? "";

  if (lastMessage.toUpperCase().includes("BLOCK")) {
    return {
      content: {
        role: "model",
        parts: [
          {
            text: "Request blocked by safety guardrail."
          }
        ]
      }
    };
  }

  return null; // allow model call
}
