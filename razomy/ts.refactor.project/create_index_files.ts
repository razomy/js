import {Project, SyntaxKind} from 'ts-morph';
import {tryGetJson} from '@razomy/fs.file';
import * as path from 'path';
import * as file from '@razomy/fs.file';
import {toSafeName} from '../ts.refactor';

export async function createIndexFiles(projectPath: string) {
  const project = new Project({tsConfigFilePath: projectPath + 'tsconfig.json'});

  const directories = project.getDirectories();
  for (const dir of directories) {
    if (dir.getPath().includes('node_modules')) continue;
    if (dir.getPath().includes('dist')) continue;
    if (dir.getPath().includes('bin')) continue;
    const dirPath = dir.getPath();
    const exportEntries: string[] = [];

    for (const subDir of dir.getDirectories()) {
      if (subDir.getPath().includes('node_modules')) continue;
      if (subDir.getPath().includes('dist')) continue;
      if (subDir.getPath().includes('bin')) continue;
      const safeKey = toSafeName(subDir.getBaseName());
      const childPackageJsonPath = path.join(subDir.getPath(), 'package.json');
      if (file.isExist(childPackageJsonPath)) {
        const name = tryGetJson(childPackageJsonPath).name;
        exportEntries.push(`export * as ${safeKey} from '${name}';`);
      } else {
        exportEntries.push(`export * as ${safeKey} from './${subDir.getBaseName()}';`);
      }
    }

    // 2. Files
    for (const file of dir.getSourceFiles()) {
      if (file.getFilePath().includes('node_modules')) continue;
      if (file.getFilePath().includes('dist')) continue;
      if (file.getFilePath().includes('bin')) continue;
      const baseName = file.getBaseNameWithoutExtension();
      // Skip index.ts and tests
      if (baseName === 'index' || file.getBaseName().match(/\.(spec|test)\./)) continue;

      // --- Analyze Exports ---
      const exportedDeclarations = file.getExportedDeclarations();
      let hasTypesOrClasses = false;
      const namesToExport: string[] = [];

      // Проходимся по всем экспортам, чтобы понять состав файла
      for (const [name, decls] of exportedDeclarations) {
        const decl = decls[0];
        const kind = decl.getKind();

        // Проверяем наличие Типов, Интерфейсов или Классов
        if (
          kind === SyntaxKind.ClassDeclaration ||
          kind === SyntaxKind.FunctionDeclaration ||
          kind === SyntaxKind.VariableDeclaration ||
          kind === SyntaxKind.EnumDeclaration
        ) {
          hasTypesOrClasses = true;
          namesToExport.push(name);

        } else if (
          kind === SyntaxKind.InterfaceDeclaration
          || kind === SyntaxKind.TypeAliasDeclaration) {
          hasTypesOrClasses = true;
          namesToExport.push('type ' + name);
        } else {
          namesToExport.push(name);
        }

      }

      // Если есть типы, интерфейсы или классы -> экспортируем их имена напрямую
      if (hasTypesOrClasses) {
        if (namesToExport.length > 0) {
          exportEntries.push(`export {${namesToExport.join(', ')}} from './${baseName}';`);
        }
      }
      // Иначе (только утилиты/константы) -> экспортируем как пространство имен (имя файла snake_case)
      else {
        exportEntries.push(`export * as ${baseName} from './${baseName}';`);
      }
    }

    // Only write if we have exports
    if (exportEntries.length > 0) {
      const indexContent = [
        exportEntries.join('\n'),
        '' // New line at end of file
      ].join('\n');

      const indexFilePath = `${dirPath}/index.ts`;
      project.createSourceFile(indexFilePath, indexContent, {overwrite: true});
      console.log(`[GENERATED] ${indexFilePath}`);
    }
  }

  await project.save();
}
