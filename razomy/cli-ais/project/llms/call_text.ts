import ollama from "ollama";
import type {LlmContext} from './must_use_tool_llm_exception';



// ============================================================================
// 1. Abstracts
// ============================================================================

// embeddinggemma:latest      85462619ee72    621 MB    25 hours ago
// qwen3-embedding:0.6b       ac6da0dfba84    639 MB    27 hours ago
// qwen3.5:latest             6488c96fa5fa    6.6 GB    2 days ago
// qwen3:1.7b                 8f68893c685c    1.4 GB    2 weeks ago
// qwen3:0.6b                 7df6b6e09427    522 MB    2 weeks ago
// qwen2.5:1.5b               65ec06548149    986 MB    2 weeks ago
// nomic-embed-text:latest    0a109f422b47    274 MB    2 weeks ago
// all-minilm:latest          1b226e2802db    45 MB     2 weeks ago
// qwen3:4b                   359d7dd4bcda    2.5 GB    2 weeks ago

const model = 'qwen3:1.7b';

export async function callText({messages}: LlmContext) {
    const response = await ollama.chat({
            model: model,
            messages,
          });
    return response.message.content;
}
