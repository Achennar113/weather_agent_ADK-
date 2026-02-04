import "dotenv/config";
import express from "express";
import cors from "cors";
import { Runner, InMemorySessionService } from "@google/adk";
import { weatheragent } from "./agents/weather_agent.js";

const app = express();

app.use(cors());
app.use(express.json());


const sessionService = new InMemorySessionService();

await sessionService.createSession({
  appName: "weather_app",
  userId: "web_user",
  sessionId: "web_session"
});

const runner = new Runner({
  agent: weatheragent,
  appName: "weather_app",
  sessionService
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  let finalReply = "";

  for await (const event of runner.runAsync({
    userId: "web_user",
    sessionId: "web_session",
    newMessage: {
      role: "user",
      parts: [{ text: message }]
    }
  })) {
    if (event.content?.parts?.length) {
      finalReply = event.content.parts[0].text ?? "";
    }
  }

  res.json({ reply: finalReply });
});


app.listen(3000, () => {
  console.log("🚀 Agent server running at http://localhost:3000");
});
