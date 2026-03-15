import  {type Tool} from 'ollama';


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

export interface Message {
  role: string,
  content: string
}

export interface LlmContext {
  messages: Message[],
  tools: Tool[],
}


// ============================================================================
// 1. EXCEPTIONS
// ============================================================================

/**
 * LLm do not use tool
 */
export class MustUseToolLlmException extends Error {
  constructor(public actualResult: string, public expectedResult: string) {
    super(`LLM Panic. Expected: ${expectedResult}, Actual: ${actualResult}`);
    this.name = 'MustUseToolLlmException';
  }
}

export class MaxAttemptLlmException extends Error {
  constructor(public actualResult: string, public expectedResult: string) {
    super(`Max attempts reached. Expected: ${expectedResult}, Actual: ${actualResult}`);
    this.name = 'MaxAttemptLlmException';
  }
}

/**
 * LLm cannot handle request
 */
export class PanicAnswerLlmException extends Error {
  constructor(public actualResult: string, public expectedResult: string) {
    super(`LLM Panic. Expected: ${expectedResult}, Actual: ${actualResult}`);
    this.name = 'PanicAnswerLlmException';
  }
}

/**
 * Invalid return type
 */
export class TypedAnswerLlmException extends Error {
  constructor(public actualResult: string, public expectedResult: string) {
    super(`Invalid type. Expected: ${expectedResult}, Actual: ${actualResult}`);
    this.name = 'TypedAnswerLlmException';
  }
}

/**
 * Invalid return type
 */
export class ToolExecuteLlmException extends Error {
  constructor(public actualResult: string, public expectedResult: string) {
    super(`Invalid type. Expected: ${expectedResult}, Actual: ${actualResult}`);
    this.name = 'ToolExecuteLlmException';
  }
}


// ============================================================================
// 1. API
// ============================================================================

// ============================================================================
// 1. CORE LLM FUNCTIONS
// ============================================================================


// export async function ask_three_different_ways_with_different_temperatures(): Promise<string> {
//   const results = await Promise.all([
//     askLLM(prompt, 'Provide a creative answer'),
//     askLLM(prompt, 'Provide a strict analytical answer'),
//     askLLM(prompt, 'Describe the main essence briefly')
//   ]);
//
//   return await compose(results, prompt);
// }
