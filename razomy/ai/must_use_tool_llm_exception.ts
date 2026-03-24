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
