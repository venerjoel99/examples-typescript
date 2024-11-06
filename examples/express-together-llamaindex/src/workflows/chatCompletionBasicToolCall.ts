import { step } from "@restackio/ai/workflow";
import * as functions from "../functions";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const MessageSchema = z.object({
    message: z.string().describe("The greeting message."),
});

const jsonSchema = zodToJsonSchema(MessageSchema, 'Message');

export async function chatCompletionBasicToolCall({ name }: { name: string }) {

    // const toolCallOutput = await step<typeof functions>({
    //     taskQueue: 'together',
    // }).togetherChatCompletionBasic({
    //     messages: [{ "role": "system", "content": "You are a helpful assistant that can access external functions. The responses from these function calls will be appended to this dialogue. Please provide responses based on the information from these function calls." },
    //     { "role": "user", "content": `Write a greeting message to ${name} with the current time` }],
    //     model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    //     tools: [{
    //         type: 'function',
    //         function: {
    //             name: 'getCurrentTime',
    //             description: 'Get the current time',
    //         },
    //     }],
    // });

    // if (!toolCallOutput) {
    //     throw new Error('No tool call output');
    // }


    // if (!toolCallOutput.choices[0]?.message?.content) {
    //     throw new Error('No content in the tool call output');
    // }
    // const parsedResponse = functions.parseToolResponse(toolCallOutput.choices[0].message.content);

    // if (parsedResponse) {
    //     const availableFunctions = {
    //         getCurrentTime: functions.getCurrentTime,
    //     };
    //     if (parsedResponse.function in availableFunctions) {
    //         const functionToCall = availableFunctions[parsedResponse.function as keyof typeof availableFunctions];
    //         let currentTime = await functionToCall();

    //         const messages = [];
    //         messages.push({
    //             role: 'tool',
    //             content: `The current time is ${currentTime}`,
    //         });
    //         let res = await step<typeof functions>({
    //             taskQueue: 'together',
    //         }).togetherChatCompletionBasic({
    //             model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    //             messages: messages as any,
    //             max_tokens: 1000,
    //             temperature: 0,
    //         });
    //     }
    // }

    // return {
    //     toolCallOutput
    // };
}