import { FunctionTool }  from "@google/adk";
import { z } from "zod";

export const helloagent = new FunctionTool({
    name:"greeting_agent",
    description:"A tool to greet the user like say hello",
    parameters:z.object({name:z.string().describe("the name of the user").optional()

    }),  
    execute: async ({ name }) =>
    name ? `Hello, ${name}!` : "Hello there!"
});