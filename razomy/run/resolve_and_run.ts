import path from 'node:path';
import * as run from '@razomy/run';

function extractPathAndFunction(pathWithFunctionName: string) {
  // Check if the string contains a dot
  if (!pathWithFunctionName.includes('.')) {
    // If there is no dot, return an empty path array and the whole string as the function name
    return {
      pathArray: [],
      functionName: pathWithFunctionName,
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
    functionName,
  };
}

export interface RunRequest {
  filePathOrPackageName: string;
  pathWithFunctionName: string;
  params: string[];
}

export async function resolveAndRun(filePathOrPackageName: string, pathWithFunctionName: string, params: string[]) {
  const { importPath, moduleDir } = run.resolveFilePathOrPackageName(path.resolve(), filePathOrPackageName);

  const fileUrl = await run.createRunner(importPath, moduleDir);
  const dynamicModule = await import(fileUrl);
  const { pathArray, functionName } = extractPathAndFunction(pathWithFunctionName);

  return await run.runFunctionInstant(dynamicModule, pathArray, functionName, params);
}
