import * as runNode from "@razomy/run/node";

// Мокаем зависимость runNode
jest.mock('../index.node', () => ({
  resolveAndRun: jest.fn(),
}));

describe('startIt', () => {
  let consoleLogSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    // Шпионим за console.log, чтобы перехватывать вывод CLI
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Шпионим за process.exit, чтобы тест не завершал работу Jest
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it('должен успешно выполнить функцию с параметрами и вывести __CLI_RESULT__', async () => {
    const mockResult = { foo: 'bar' };
    (runNode.resolveAndRun as jest.Mock).mockResolvedValue(mockResult);

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
    (runNode.resolveAndRun as jest.Mock).mockResolvedValue(123);

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
    (runNode.resolveAndRun as jest.Mock).mockRejectedValue(new Error(errorMessage));

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
