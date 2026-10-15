import * as aiGoogle from '../index';

/**
 * Безопасно удаляет кэш с серверов Google AI
 */
export async function deleteSafe(cacheName?: string): Promise<void> {
  if (!cacheName) return;
  try {
    await aiGoogle.CLIENT.caches.delete({ name: cacheName });
  } catch (err) {
    console.warn(`⚠️ Не удалось удалить кэш ${cacheName}:`, err);
  }
}