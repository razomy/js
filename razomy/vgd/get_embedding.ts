import ollama from 'ollama';

const ollamaEmbeddingModel = 'embeddinggemma';

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await ollama.embeddings({
    model: ollamaEmbeddingModel,
    prompt: text,
  });
  return response.embedding;
}
