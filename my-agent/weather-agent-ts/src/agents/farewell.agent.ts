import { LlmAgent } from "@google/adk";
import { saygoodbye } from "../tool/farewell.tool.js";

export const farewellAgent = new LlmAgent({
  name: "farewell_agent",
  model: "gemini-2.5-flash",
  description: "Handles farewells",
  instruction: "Only say goodbye to the user using the say_goodbye tool",
  tools: [saygoodbye]
});
