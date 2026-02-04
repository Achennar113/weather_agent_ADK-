import { FunctionTool } from "@google/adk";

export const saygoodbye= new FunctionTool({
    name:"say_goodbye",
    description:"A tool to bid farewell to the user",
    parameters:{},
    execute:async ()=>
    "Goodbye! Have a great day!"
});