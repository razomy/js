import * as run from '@razomy/run';

export async function start() {
  try {
    run.cli.validateArrayStringThrow(process.argv.slice(2), 'terminalArgs');
    const filePathOrPackageName = process.argv[2];
    const pathWithFunctionName = process.argv[3];
    const rawParams = process.argv[4];

    const params = rawParams ? JSON.parse(rawParams) : [];

    const result = await run.resolveAndRun(filePathOrPackageName, pathWithFunctionName, params);

    console.log('__CLI_RESULT__:' + JSON.stringify({ status: 'success', result: result }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ status: 'error', message }));
    process.exit(1);
  }
}
