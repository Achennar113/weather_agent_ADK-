import { LlmAgent } from "@google/adk";
import { getweather } from "../tool/weather.tool.js";
import { greetingagent } from "./greeting.agent.js";
import { farewellAgent } from "./farewell.agent.js";
import { modelGuardrail } from "../callback/modelGuardrail.js";
import { toolGuardrail } from "../callback/toolGuardrail.js";

export const weatheragent = new LlmAgent({
  name: "weather_agent",
  model: "gemini-2.5-flash", // router only
  description: "Main weather Agent with delegation",
  instruction: `
You are a strict router.

- Greetings → greeting_agent
- Farewells → farewell_agent
- Weather data → getweather
- Explanations / natural language → ask_openai
`,
  tools: [getweather],
  subAgents: [greetingagent, farewellAgent],
  beforeModelCallback: modelGuardrail,
  beforeToolCallback: toolGuardrail
});
