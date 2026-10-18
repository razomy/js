import ollama from 'ollama';

const ollamaEmbeddingModel = 'embeddinggemma';

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await ollama.embeddings({
      model: ollamaEmbeddingModel,
      prompt: text,
    });
    return response.embedding;
  } catch (e) {
    console.error(text);
    throw e;
  }
}
