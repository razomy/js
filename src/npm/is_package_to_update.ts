import * as npm from "@razomy/npm";

export async function isPackageToUpdate(path: string) {
  const localVersion = npm.getPackageJsonVersion(path);
  const remoteVersion = await npm.getPublishVersion(path);
  return localVersion !== remoteVersion
}
