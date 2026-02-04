//multitool_agent
import {FunctionTool, LlmAgent} from '@google/adk';
import {z} from 'zod';
import 'dotenv/config';

const weathertool= new FunctionTool({
  name:'weather_tool',
  description:'Retrives the current weather for a a given city',
  parameters:z.object({city:z.string().describe('the name of the city for which we need to fetch the weather .')}),
  execute:({city})=>
  {
    if (city.toLowerCase()=='new york')
    {
      return {status:'success',report:`the current weather in ${city} is 30 c`}
    }
    else
    {
      return {status:'error',error_message:`Weather information for ${city} is not available`}
    }
  }
})

const current_time_function=new  FunctionTool({
  name:"getCurrentTime",
  description: 'Returns the current time in a specified city.',
  parameters:z.object({
  city:z.string().describe('The name of the city to get the current time for.')
  }),
  execute:({city})=>
  {
    return {status:'success',report :`The current time in ${city} is 10:30AM .`};
  },

});

export const root_agent= new LlmAgent({
  name:"hello_time_Agent",
  model:"gemini-2.5-flash",
  description:"An agent that give the information about current time of a given city",
  instruction:`You are a helpful assistant that tells the current time in a city.Use the 'getCurrentTime' tool for this purpose. and also use  to tell the current weather condition in a given perticular city by using the weathertool `,
  tools:[current_time_function,weathertool],
});
