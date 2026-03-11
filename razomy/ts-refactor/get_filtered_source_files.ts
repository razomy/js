import { Project, type SourceFile } from 'ts-morph';

/**
 * 1. Helper to get files, applying your original filters.
 */
export function getFilteredSourceFiles(project: Project, dirPath: string): SourceFile[] {
  // Get the directory, or add it if the project doesn't know about it yet
  const directory = project.getDirectory(dirPath) || project.addDirectoryAtPath(dirPath);

  return directory.getSourceFiles().filter((sourceFile) => {
    const filePath = sourceFile.getFilePath();
    const fileName = sourceFile.getBaseName();

    return (
      !filePath.includes('/dist/') &&
      !filePath.includes('/node_modules/') &&
      !fileName.endsWith('.test.ts') &&
      !fileName.startsWith('index.') &&
      fileName.endsWith('.ts')
    );
  });
}

// console.log(JSON.stringify(extracyForIo('../string-case/'), null, 2));
