import { isMainThread, parentPort, Worker } from 'worker_threads';

// ============================================================================
// 1. КОД ВОРКЕРА (выполняется только внутри дочернего потока)
// ============================================================================
if (!isMainThread && parentPort) {
  function sendEvent (id: string, ctx: any) { return parentPort!.postMessage({ id, ctx }); }

  const ctx = {
    worker_id: process.env.worker_id ?? '1',
    progress: 0,
    external_ctx: null as any,
  };

  // 1. Отправляем начальный статус
  sendEvent('set', ctx);

  function updateCtx(event: { id: string; ctx: any }) {
    ctx.external_ctx = event.ctx;
    ctx.progress = 0.5;
    sendEvent('set', ctx);
  }

  // Слушаем ответ от родителя
  parentPort.on('message', updateCtx);

  // 2. Запрашиваем external_ctx у родителя
  sendEvent('get', ctx);

  // 3. Завершаем работу
  setTimeout(() => {
    ctx.progress = 1;
    sendEvent('set', ctx);
    parentPort!.off('message', updateCtx);
    process.exit(0); // Корректное завершение воркера
  }, 50);
}

// ============================================================================
// 2. ТЕСТЫ (выполняются в главном потоке)
// ============================================================================
if (isMainThread) {
  describe('worker_threads lifecycle', () => {
    it('должен пройти полный цикл: set(0) -> get -> set(0.5) -> set(1)', async () => {
      const events: Array<{ id: string; ctx: any }> = [];

      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(__filename, {
          env: { worker_id: 'test-worker-42' },
        });

        worker.on('message', (event: { id: string; ctx: any }) => {
          events.push(event);

          // Когда воркер запросил "get", отправляем ему данные обратно
          if (event.id === 'get') {
            worker.postMessage({
              id: 'set',
              ctx: { foo: 'bar_from_main' },
            });
          }
        });

        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });

      // ПРОВЕРКИ (Assertions)

      // 1. Проверяем последовательность сообщений от воркера
      const eventIds = events.map((e) => e.id);
      expect(eventIds).toEqual(['set', 'get', 'set', 'set']);

      // 2. Старт: прогресс 0
      expect(events[0]).toEqual({
        id: 'set',
        ctx: expect.objectContaining({
          worker_id: 'test-worker-42',
          progress: 0,
          external_ctx: null,
        }),
      });

      // 3. После получения external_ctx: прогресс 0.5
      expect(events[2]).toEqual({
        id: 'set',
        ctx: expect.objectContaining({
          progress: 0.5,
          external_ctx: { foo: 'bar_from_main' },
        }),
      });

      // 4. Финал: прогресс 1
      expect(events[3]).toEqual({
        id: 'set',
        ctx: expect.objectContaining({
          progress: 1,
          external_ctx: { foo: 'bar_from_main' },
        }),
      });
    });
  });
}
