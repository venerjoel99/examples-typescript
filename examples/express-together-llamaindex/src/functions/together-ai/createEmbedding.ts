import Together from 'together-ai';
import { togetherClient } from './utils/client';

export async function togetherCreateEmbedding(params: Together.Embeddings.EmbeddingCreateParams) {
    const response = await togetherClient.embeddings.create(params);
    return response;
}