import { FunctionTool } from "@google/adk";
import { error } from "node:console";
import { report } from "node:process";
import { z } from "zod";    

const API_KEY=process.env.OPENWEATHER_API_KEY;
export const getweather = new FunctionTool({
    name:"get_weather_agent",
    description:'get current weather fora given city',
    parameters:z.object({city:z.string().describe("The name of the city to get weather for")}),
    execute:async ({city})=>
    {
    try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`;
      const res=await fetch(url);

      if(!res.ok)
      {
        return {
            status:"error",
            error_message:`Weather details not found for ${city}`
        };
      }

      const data= await res.json();

      return{
        status:"success",
        report:`weather in ${data.name} :${data.weather[0].description}, ${data.main.temp}°C`
      };

        }catch(err:any)
        {
            return {status:"error",error_message:err.message}
        };
    }
});