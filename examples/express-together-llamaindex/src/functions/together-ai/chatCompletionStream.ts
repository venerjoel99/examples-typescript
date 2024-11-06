import Together from 'together-ai';
import { togetherClient } from './utils/client';

export async function chatCompletionStream(params: Together.Chat.CompletionCreateParamsStreaming) {
    const response = await togetherClient.chat.completions.create(params);
    const stream = response as AsyncIterable<Together.Chat.ChatCompletionChunk>;
    for await (const token of stream) {
        console.log(token.choices[0]?.delta?.content);
    }
}