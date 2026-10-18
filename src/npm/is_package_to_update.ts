export async function isPackageToUpdate(path: string) {
  return getPackageJsonVersion(path) !== (await getPublishVersion(path));
}
