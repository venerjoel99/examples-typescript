// Simple example to start two services in the same file
import { togetherChatCompletionBasic, getCurrentTime } from "./functions";
import { client } from "./client";

export async function services() {
    const workflowsPath = require.resolve("./workflows");
    try {
        await Promise.all([
            // Generic service with current workflows and functions
            client.startService({
                workflowsPath,
                functions: {
                    getCurrentTime,
                    // add other functions here
                },
            }),
            // Start the together service to queue function calls to the Together API with rate limiting
            // https://docs.together.ai/docs/rate-limits
            client.startService({
                taskQueue: 'together',
                functions: { togetherChatCompletionBasic },
                options: {
                    rateLimit: (60 / 60), // 60 RPM -> 1 RPS 
                },
            }),
        ]);

        console.log("Services running successfully.");
    } catch (e) {
        console.error("Failed to run services", e);
    }
}

services().catch((err) => {
    console.error("Error running services:", err);
});
