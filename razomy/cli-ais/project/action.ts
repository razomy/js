import {callText, consensusCall, type LlmContext, PanicAnswerLlmException, TypedAnswerLlmException} from './llm';

// ============================================================================
// 2. PROMPT GENERATORS (Return strings / configurations)
// ============================================================================

export const u = (m: string) => ({role: 'user', content: m})
export const s = (m: string) => ({role: 'system', content: m})

export const getPanicPrompt = () =>
  [s(`If you cannot answer. Answer ONLY "panic". No extra words.`)]

export const getBoolPrompt = () =>
  [s(`You are a strict logic analyzer. Answer ONLY "true", "false", or "panic". No extra words.`)]

export const getNumberPrompt = () =>
  [s(`You are a math parser. Return ONLY a number, or "panic" if you cannot answer. No text, no explanations.`)]

export const getSwitchPrompt = (options: string[]) => {
  const optionsStr = options.map(o => `"${o}"`).join(', ');
  return [s(`Choose ONLY one option from the list: [${optionsStr}], or answer "panic" if none fit. Answer only with the exact text of the chosen option.`)];
}

export const getTaskDecomposePrompt = () =>
  [s(`Break the task into logical steps. Output strictly as a JSON array of strings like ["", "", ""], or "panic" if impossible. No extra text.`)]

export const getComposePrompt = (contexts: string[], query: string) => {
  const contextStr = contexts.map((c, i) => `Context ${i + 1}:\n${c}`).join('\n\n');
  return [
    s(`Based on the provided contexts, formulate a final, concise, and accurate answer.`),
    u(`${contextStr}\n\nTask: ${query}`)
  ];
}

// ============================================================================
// 3. VALIDATORS (Parse text, throw errors if invalid)
// ============================================================================

export const parsePanic = (text: string) => {
  if (text.toLowerCase().includes('panic')) {
    throw new PanicAnswerLlmException(text, 'Not have panic');
  }
  return;
}

export const parseBool = (text: string): boolean => {
  const match = text.match(/\b(true|false|yes|no|1|0|panic)\b/i);

  if (!match) throw new TypedAnswerLlmException(text, 'true, false or panic');

  const val = match[1].toLowerCase();
  const isYes = ['true', 'yes', '1'].includes(val);
  const isNo = ['false', 'no', '0'].includes(val);

  if (isYes && isNo) throw new TypedAnswerLlmException(text, 'Cannot contain true and false at the same time');

  if (isYes) return true;
  if (isNo) return false;

  throw new TypedAnswerLlmException(text, 'true or false');
}

export const parseNumber = (text: string): number => {
  const match = text.match(/-?\d+(\.\d+)?/g);
  if (!match) throw new TypedAnswerLlmException(text, 'A numeric value');
  if (match.length > 1) throw new TypedAnswerLlmException(text, 'Exactly one numeric value, not multiple');

  return parseFloat(match[0]);
}

export const parseSwitch = (text: string, options: string[]): string => {
  const lowerText = text.toLowerCase();
  const optionsStr = options.map(o => `"${o}"`).join(', ');

  const matchedOptions = options.filter(option => lowerText.includes(option.toLowerCase()));

  if (matchedOptions.length === 0) throw new TypedAnswerLlmException(text, `Exactly one of: ${optionsStr}`);
  if (matchedOptions.length > 1) throw new TypedAnswerLlmException(text, 'Cannot contain multiple options at the same time');

  return matchedOptions[0];
}

export const parseArray = (text: string): string[] => {
  const jsonMatch = text.match(/\[.*\]/s);
  if (!jsonMatch) throw new TypedAnswerLlmException(text, 'A valid JSON array pattern');

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new TypedAnswerLlmException(text, 'Parsable JSON string');
  }

  if (!Array.isArray(parsed)) {
    throw new TypedAnswerLlmException(text, 'JSON array, not an object');
  }

  return parsed;
}

export function parseJson<T>(text: string): T {
  try {
    const match = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    if (match) {
      return JSON.parse(match[1]);
    }
    return JSON.parse(text);
  } catch {
    throw new TypedAnswerLlmException(text,"Архитектор вернул невалидный JSON");
  }
}

// ============================================================================
// 3. Actions (Parse text, throw errors if invalid)
// ============================================================================


export async function askBool(ctx_: LlmContext): Promise<boolean> {
  const messages = [...getPanicPrompt(), ...getBoolPrompt(), ...ctx_.messages];
  return consensusCall({...ctx_, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseBool(result);
  })
}

export async function askNumber(ctx_: LlmContext): Promise<number> {
  const messages = [...getPanicPrompt(), ...getNumberPrompt(), ...ctx_.messages];
  return consensusCall({...ctx_, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseNumber(result);
  })
}

export async function askSwitch(ctx_: LlmContext, options: string[]): Promise<string> {
  const messages = [...getPanicPrompt(), ...getSwitchPrompt(options), ...ctx_.messages];
  return consensusCall({...ctx_, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseSwitch(result, options);
  })
}

export async function askTaskDecompose(ctx_: LlmContext): Promise<string[]> {
  const messages = [...getPanicPrompt(), ...getTaskDecomposePrompt(), ...ctx_.messages];
  return consensusCall({...ctx_, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseArray(result);
  })
}

export async function askCompose(ctx_: LlmContext, contexts: string[], query: string): Promise<string> {
  const messages = [...getPanicPrompt(), ...getComposePrompt(contexts, query)];
  return consensusCall({...ctx_, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return (result);
  })
}

export async function askJson(ctx_: LlmContext): Promise<string> {
  const messages = [...getPanicPrompt(), ...ctx_.messages];
  return consensusCall({...ctx_, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseJson(result);
  })
}
