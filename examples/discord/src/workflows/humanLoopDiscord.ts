import { log, step, condition } from "@restackio/ai/workflow";
import * as functions from "../functions";

interface Input {
  channelId: string,
  botId: string
}

export async function humanLoopDiscordWorkflow(input: Input) {
  let endWorkflow = false;
  const botTag = `<@${input.botId}>`;

  
  const promptResponse = await step<typeof functions>({}).postMessageToChannel({
    messageText: `Message ${botTag} for backwards messages. Message "${botTag} STOP" to end the loop`,
    channelId: input.channelId,
  });
  let previousMessageId = promptResponse.id;


  while (!endWorkflow) {
    await new Promise(f => setTimeout(f, 1000));
    const messages = await step<typeof functions>({}).getMessagesAfterId({
      afterMessageId: previousMessageId, 
      channelId: input.channelId
    });
    for (var message of messages) {
      const content = message.content.trim();
      if (content.length === 0) {
        continue;
      } else if (content.replace(botTag, '').trim() === 'STOP') {
        endWorkflow = true;
      } else {
        const response = await step<typeof functions>({}).postReplyToMessage({
          messageText: message.content.replace(botTag, '').split('').reverse().join(''),
          channelId: input.channelId,
          messageId: message.id
        });
        previousMessageId = response.id;
      }
    }
  }

  return await step<typeof functions>({}).postMessageToChannel({
    messageText: `Goodbye!`,
    channelId: input.channelId,
  });
}
