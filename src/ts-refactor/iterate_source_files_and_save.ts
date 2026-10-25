import {Project, SourceFile} from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRefactor from "@razomy/ts-refactor";

export interface IterateSourceFileState {
  project: Project;
  sourceFile: SourceFile;
}

export async function iterateSourceFilesAndSave(
  projectPath: string,
  action: abstractions.function_.Action<[IterateSourceFileState]>,
) {
  const project = new Project({
    tsConfigFilePath: projectPath + 'tsconfig.json',
    skipAddingFilesFromTsConfig: false,
  });

  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath(); // Например: "/root/packages/vue/src/index.ts"

    // Находим папку пакета (замените 'packages' на вашу корневую папку, если она другая)
    const match = filePath.match(/\/src\/([^/]+)\//);

    if (match) {
      const packageName = `@razomy/${match[1]}`; // Получаем "@razomy/vue"
      if (tsRefactor.isPackageNameSkipGeneratingPackageJsonAndReadme(packageName)) {
        continue;
      }
    }
    action({ project, sourceFile });
  }
  await project.save();
}
