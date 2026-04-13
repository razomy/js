import {runFunctionInstant} from "./run_function_instant";
import {createRunner} from "./create_runner";
import {resolveFilePathOrPackageName} from "./resolve_file_path_or_package_name";
import path from "node:path";

function extractPathAndFunction(pathWithFunctionName: string) {
  // Check if the string contains a dot
  if (!pathWithFunctionName.includes('.')) {
    // If there is no dot, return an empty path array and the whole string as the function name
    return {
      pathArray: [],
      functionName: pathWithFunctionName
    };
  }

  // Split the string by dot
  const parts = pathWithFunctionName.split('.');

  // The last item is the function name
  const functionName = parts.pop()!;

  // The remaining items make up the path array
  const pathArray = parts;

  return {
    pathArray,
    functionName
  };
}

export interface RunRequest {
  filePathOrPackageName: string,
  pathWithFunctionName: string,
  params: string []
}

export async function resolveAndRun(filePathOrPackageName: string, pathWithFunctionName: string, params: string[]) {
  const {importPath, moduleDir} = resolveFilePathOrPackageName(
    path.resolve(),
    filePathOrPackageName
  );

  const fileUrl = await createRunner(importPath, moduleDir);
  const dynamicModule = await import(fileUrl);
  const {pathArray, functionName} = extractPathAndFunction(pathWithFunctionName)

  return await runFunctionInstant(dynamicModule, pathArray, functionName, params);

}
