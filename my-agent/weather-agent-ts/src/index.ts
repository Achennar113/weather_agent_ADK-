import "dotenv/config";
import { Runner, InMemorySessionService } from "@google/adk";
import { weatheragent } from "./agents/weather_agent.js";

const sessionService = new InMemorySessionService();

await sessionService.createSession({
  appName: "weather_app",
  userId: "user1",
  sessionId: "session1"
});

const runner = new Runner({
  agent: weatheragent,
  appName: "weather_app",
  sessionService
});

for await (const event of runner.runAsync({
  userId: "user1",
  sessionId: "session1",
  newMessage: {
    role: "user",
    parts: [{ text: "What is the weather in London?" }]
  }
})) {
  if (event.content?.parts?.length) {
    console.log("🤖 Agent:", event.content.parts[0].text);
  }
}
