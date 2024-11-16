import { client } from "./src/client";

interface Input {
  channelId: string,
  botId: string
}

async function scheduleWorkflow(input: Input) {
  try {
    const workflowId = `${Date.now()}-HumanLoopWorkflow`;
    const runId = await client.scheduleWorkflow({
      workflowName: "humanLoopDiscordWorkflow",
      workflowId,
      input
    });
    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error("Error scheduling workflow:", error);
    process.exit(1); // Exit the process with an error code
  }
}

scheduleWorkflow({
  channelId: process.env.DISCORD_CHANNEL_ID ?? "",
  botId: process.env.DISCORD_BOT_ID ?? ""
});
