import { Project, type SourceFile } from 'ts-morph';

/**
 * 1. Helper to get files recursively using built-in ts-morph methods.
 */
export function getFilteredSourceFiles(project: Project, dirPath: string): SourceFile[] {
  // Get the directory, or add it if the project doesn't know about it yet
  const directory = project.getDirectory(dirPath) || project.addDirectoryAtPath(dirPath);

  // getDescendantSourceFiles() automatically traverses all subdirectories recursively
  return directory.getDescendantSourceFiles().filter((sourceFile) => {
    const filePath = sourceFile.getFilePath();
    const fileName = sourceFile.getBaseName();

    return (
      !filePath.includes('/tmp/') &&
      !filePath.includes('/dist/') &&
      !filePath.includes('/node_modules/') &&
      !fileName.endsWith('.test.ts') &&
      !fileName.startsWith('index.') &&
      fileName.endsWith('.ts')
    );
  });
}
