import * as aiGoogle from '@razomy/ai-google';

export interface CreateCacheOptions {
  model?: string;
  systemInstruction?: string;
  cachedText: string;
  ttl?: string;
}

/**
 * Создает кэш контекста в Google AI (возвращает null или выбрасывает ошибку при неудаче, например если токенов < 32k)
 */
export async function createSafe(options: CreateCacheOptions): Promise<string | undefined> {
  const {
    model = aiGoogle.MODELS.cheap,
    systemInstruction,
    cachedText,
    ttl = '7200s',
  } = options;

  try {
    const cache = await aiGoogle.CLIENT.caches.create({
      model,
      config: {
        systemInstruction: systemInstruction!,
        contents: [{ role: 'user', parts: [{ text: cachedText }] }],
        ttl,
      },
    });
    return cache.name;
  } catch (err: any) {
    console.warn(`⚠️ Кэш не создан (${err?.message || err}). Используется прямая передача контекста.`);
    return undefined;
  }
}
