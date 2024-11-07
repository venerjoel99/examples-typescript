import {
    NodeWithScore,
    VectorStoreIndex,
} from "llamaindex";

export async function queryIndex(index: VectorStoreIndex, query: string): Promise<{ response: any; sourceNodes: NodeWithScore[] }> {
    const queryEngine = index.asQueryEngine();
    const result = await queryEngine.query({ query });
    return {
        response: result.response,
        sourceNodes: result.sourceNodes || [],
    };
}