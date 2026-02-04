import "dotenv/config";
import readline from "node:readline/promises";
import { Runner, InMemorySessionService } from "@google/adk";
import { weatheragent } from "./agents/weather_agent.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const sessionService = new InMemorySessionService();

await sessionService.createSession({
  appName: "weather_app",
  userId: "cli_user",
  sessionId: "cli_session"
});

const runner = new Runner({
  agent: weatheragent,
  appName: "weather_app",
  sessionService
});

console.log("🤖 Weather Agent (type 'exit' to quit)\n");

while (true) {
  const input = await rl.question("You: ");
  if (input.toLowerCase() === "exit") break;

  for await (const event of runner.runAsync({
    userId: "cli_user",
    sessionId: "cli_session",
    newMessage: {
      role: "user",
      parts: [{ text: input }]
    }
  })) {
    if (event.content?.parts?.length) {
      console.log("Agent:", event.content.parts[0].text);
    }
  }
}

rl.close();
