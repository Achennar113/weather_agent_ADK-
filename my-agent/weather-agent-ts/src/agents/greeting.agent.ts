import {LlmAgent} from "@google/adk"
import {helloagent} from "../tool/greetings.tool"

export const greetingagent = new LlmAgent({
    name:"greeting_Agent",
    model:"gemini-2.5-flash",
    description:"An agent handles greetings",
    instruction:"Only greet the user using the say_hello tool",
    tools:[helloagent]
});