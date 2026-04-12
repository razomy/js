import path from 'node:path';
import {runFunctionInstant} from "../run_function_instant";
import {validateArrayStringThrow} from "./validate_array_string_throw";
import {createRunner} from "../create_runner";
import {resolveFilePathOrPackageName} from "../resolve_file_path_or_package_name";

export async function start() {
  try {
    validateArrayStringThrow(process.argv.slice(2), 'terminalArgs');
    const filePathOrPackageName = process.argv[2];
    const functionName = process.argv[3];
    const rawParams = process.argv[4];

    const params = rawParams ? JSON.parse(rawParams) : [];

    const {importPath, moduleDir} = resolveFilePathOrPackageName(path.resolve(), filePathOrPackageName);
    const fileUrl = await createRunner(importPath, moduleDir);
    const dynamicModule = await import(fileUrl);

    const result = await runFunctionInstant(dynamicModule, [], functionName, params);

    console.log('__CLI_RESULT__:' + JSON.stringify({status: "success", result: result}));

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({status: "error", message}));
    process.exit(1);
  }
}
