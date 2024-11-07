import {
    MetadataMode,
    NodeWithScore,
} from "llamaindex";

export async function outputResponse(response: any, sourceNodes: NodeWithScore[]): Promise<void> {
    console.log(response);
    if (sourceNodes) {
        sourceNodes.forEach((source: NodeWithScore, index: number) => {
            console.log(
                `\n${index}: Score: ${source.score} - ${source.node.getContent(MetadataMode.NONE).substring(0, 50)}...\n`,
            );
        });
    }
}