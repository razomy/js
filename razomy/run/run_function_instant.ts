function getByPath(tree: any, pathArray: string[]) {
  return pathArray.reduce((currentLevel, keyOrIndex) => {
    if (currentLevel === null || typeof currentLevel === 'undefined') {
      return undefined;
    }
    return currentLevel[keyOrIndex];
  }, tree);
}

export async function runFunctionInstant<M>(
  packageImport: Promise<M>,
  functionPath: string[],
  functionName: keyof M,
  arguments_: any[],
) {
  const packageModule = await packageImport;
  const fn = getByPath(packageModule, [...functionPath, functionName as string]) as (...s: any[]) => any;

  if (typeof fn !== 'function') {
    throw new Error(`Function ${functionName as string} not found`);
  }

  return fn(...arguments_);
}
