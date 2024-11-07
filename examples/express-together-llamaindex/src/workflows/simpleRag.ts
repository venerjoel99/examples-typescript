import { step } from "@restackio/ai/workflow";
import * as functions from "../functions";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const QuerySchema = z.object({
    query: z.string().describe("The query to ask the index."),
});

const jsonSchema = zodToJsonSchema(QuerySchema, 'Query');

export async function simpleRagWorkflow() {
    const path = "node_modules/llamaindex/examples/abramov.txt";

    const essay = await step<typeof functions>({
        taskQueue: 'together',
    }).loadEssay(path);

    const document = await step<typeof functions>({
        taskQueue: 'together',
    }).createDocument({
        text: essay,
        id_: path,
    });

    const index = await step<typeof functions>({
        taskQueue: 'together',
    }).createIndex(document);

    const { response, sourceNodes } = await step<typeof functions>({
        taskQueue: 'together',
    }).queryIndex({
        index,
        query: "What did the author do in college?",
    });

    await step<typeof functions>({
        taskQueue: 'together',
    }).outputResponse({
        response,
        sourceNodes,
    });
}