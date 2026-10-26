import { describe, it, expect, beforeEach, afterEach, vi, type MockInstance } from 'vitest';
import * as runNode from '@razomy/run/node';

// Мокаем зависимость runNode
vi.mock('../index.node', () => ({
  resolveAndRun: vi.fn(),
}));

describe('startIt', () => {
  let consoleLogSpy: MockInstance;
  let processExitSpy: MockInstance;

  beforeEach(() => {
    vi.clearAllMocks();

    // Шпионим за console.log, чтобы перехватывать вывод CLI
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Шпионим за process.exit, чтобы тест не завершал работу Vitest
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it('должен успешно выполнить функцию с параметрами и вывести __CLI_RESULT__', async () => {
    const mockResult = { foo: 'bar' };
    vi.mocked(runNode.resolveAndRun).mockResolvedValue(mockResult as never);

    const args: [string, string, string] = [
      './src/myModule.ts',
      'myExportedFunction',
      JSON.stringify(['arg1', 42]),
    ];

    await runNode.cli.startIt(args);

    // 1. Проверяем, что resolveAndRun вызван с распарсенным JSON
    expect(runNode.resolveAndRun).toHaveBeenCalledTimes(1);
    expect(runNode.resolveAndRun).toHaveBeenCalledWith(
      './src/myModule.ts',
      'myExportedFunction',
      ['arg1', 42]
    );

    // 2. Проверяем успешный вывод в консоль
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '__CLI_RESULT__:' + JSON.stringify({ status: 'success', result: mockResult })
    );

    // 3. process.exit НЕ должен вызываться
    expect(processExitSpy).not.toHaveBeenCalled();
  });

  it('должен передавать пустой массив [], если rawParams пустая строка', async () => {
    vi.mocked(runNode.resolveAndRun).mockResolvedValue(123 as never);

    const args: [string, string, string] = ['./src/myModule.ts', 'runWithoutArgs', ''];

    await runNode.cli.startIt(args);

    expect(runNode.resolveAndRun).toHaveBeenCalledWith(
      './src/myModule.ts',
      'runWithoutArgs',
      []
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '__CLI_RESULT__:' + JSON.stringify({ status: 'success', result: 123 })
    );
  });

  it('должен обрабатывать ошибки внутри resolveAndRun и вызывать process.exit(1)', async () => {
    const errorMessage = 'Function not found in module';
    vi.mocked(runNode.resolveAndRun).mockRejectedValue(new Error(errorMessage));

    const args: [string, string, string] = ['./src/myModule.ts', 'notFound', '[]'];

    await runNode.cli.startIt(args);

    // Проверяем, что выведена ошибка в формате JSON
    expect(consoleLogSpy).toHaveBeenCalledWith(
      JSON.stringify({ status: 'error', message: errorMessage })
    );

    // Проверяем завершение процесса с ошибкой
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it('должен падать в блок catch при некорректном JSON в rawParams', async () => {
    const args: [string, string, string] = ['./src/myModule.ts', 'myFn', '{broken json}'];

    await runNode.cli.startIt(args);

    // До вызова функции дело дойти не должно
    expect(runNode.resolveAndRun).not.toHaveBeenCalled();

    // Проверяем, что выведена ошибка синтаксиса JSON
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"status":"error"')
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
