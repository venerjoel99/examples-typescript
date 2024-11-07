import { VectorStoreIndex, Document } from "llamaindex";

export async function createIndex(document: Document): Promise<VectorStoreIndex> {
    return await VectorStoreIndex.fromDocuments([document]);
  }