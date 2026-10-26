import * as runNode from '@razomy/run/node';

export async function startIt(args: [string, string, string]): Promise<void> {
  try {
    runNode.validateArrayStringThrow(args, 'terminalArgs');
    const filePathOrPackageName = args[0];
    const pathWithFunctionName = args[1];
    const rawParams = args[2];

    const params = rawParams ? JSON.parse(rawParams) : [];

    const result = await runNode.resolveAndRun(filePathOrPackageName, pathWithFunctionName, params);

    console.log('__CLI_RESULT__:' + JSON.stringify({ status: 'success', result: result }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ status: 'error', message }));
    process.exit(1);
  }
}
