/**
 * beforeToolCallback (TypeScript ADK)
 * Blocks weather tool for Paris
 */
export function toolGuardrail(context: any): any | null {
  const { tool, args } = context;

  if (
    tool?.name === "get_weather" &&
    args?.city?.toLowerCase() === "paris"
  ) {
    return {
      status: "error",
      error_message: "Weather access for Paris is blocked by policy."
    };
  }

  return null; // allow tool execution
}
