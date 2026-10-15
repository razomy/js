import * as aiGoogle from '../index';

export interface StreamWithContinuationParams {
  model?: string;
  systemInstruction?: string;
  cacheName?: string;
  fallbackContext?: string;
  initialPrompt: string;
  maxTurns?: number;
  temperature?: number;
  maxOutputTokens?: number;
  onChunk: (text: string) => Promise<void> | void;
  isDone: () => boolean;
  getUnfinishedTail?: () => string;
  buildContinuationPrompt?: (tailContext: string) => string;
}

const DEFAULT_CONTINUATION_PROMPT = (tailContext: string) =>
  `You reached the output token limit before finishing.
Continue generating the output IMMEDIATELY from the exact character where you stopped.
Do NOT repeat already completed blocks.
Here is the exact tail of where you stopped:\n---\n${tailContext}\n---\nContinue:`;

/**
 * Генерирует потоковый ответ с поддержкой мульти-продолжения (Auto-Continuation).
 * Если ответ ИИ превышает лимит выходных токенов за 1 ход, функция автоматически
 * запрашивает продолжение с места обрыва, пока `isDone()` не вернет true.
 */
export async function streamWithContinuation(params: StreamWithContinuationParams): Promise<void> {
  const {
    model = aiGoogle.MODELS.cheap,
    systemInstruction,
    cacheName,
    fallbackContext,
    initialPrompt,
    maxTurns = 10,
    temperature = 0.7,
    maxOutputTokens = 65536,
    onChunk,
    isDone,
    getUnfinishedTail,
    buildContinuationPrompt = DEFAULT_CONTINUATION_PROMPT,
  } = params;

  const conversationHistory: any[] =
    cacheName || !fallbackContext
      ? [{ role: 'user', parts: [{ text: initialPrompt }] }]
      : [
          { role: 'user', parts: [{ text: fallbackContext }] },
          { role: 'model', parts: [{ text: 'Context loaded. Ready.' }] },
          { role: 'user', parts: [{ text: initialPrompt }] },
        ];

  for (let turn = 1; turn <= maxTurns; turn++) {
    const requestConfig: any = {
      responseMimeType: 'text/plain',
      temperature,
      maxOutputTokens,
    };

    if (cacheName) {
      requestConfig.cachedContent = cacheName;
    } else if (systemInstruction) {
      requestConfig.systemInstruction = systemInstruction;
    }

    let turnOutputTail = '';

    const responseStream = await aiGoogle.CLIENT.models.generateContentStream({
      model,
      contents: conversationHistory,
      config: requestConfig,
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        turnOutputTail = (turnOutputTail + chunk.text).slice(-3000);
        await onChunk(chunk.text);
      }
    }

    if (isDone()) {
      break;
    }

    const tailContext = (getUnfinishedTail ? getUnfinishedTail() : '') || turnOutputTail.slice(-1000);
    conversationHistory.push(
      { role: 'model', parts: [{ text: turnOutputTail }] },
      {
        role: 'user',
        parts: [{ text: buildContinuationPrompt(tailContext) }],
      },
    );
  }
}