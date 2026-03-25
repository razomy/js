import {Project} from 'ts-morph';

import * as abstracts from "@razomy/abstracts";
import {getFilteredSourceFiles} from "./get_filtered_source_files";
import * as array from "@razomy/array";
import * as path from "path";
import * as tsAst from "@razomy/ts-ast";

export function getPackageSpecifications(project: Project, dirPath: string): abstracts.ast.Any[] {
  const declarations: abstracts.ast.Any[] = [];
  for (const sourceFile of getFilteredSourceFiles(project, dirPath)) {
    const functionPath = array.removeLast(path.relative(dirPath, sourceFile.getFilePath()).split('/'));
    const items = tsAst.parseSourceFile(sourceFile).items;
    for (const declaration of items) {
      declaration['functionPath'] = functionPath;
    }
    declarations.push(...items);
  }


  return declarations;
}

// ============================================================================
// Функции-экстракторы (Декомпозиция)
// ============================================================================

// async function extractPerformanceHistory(path: string, name: string, parameters: any[]) {
//   // Выполняем тест производительности только если функция принимает ровно 1 параметр типа string
//   if (parameters.length === 1 && parameters[0].type === 'string') {
//     const mod = await import(path);
//     const fn = mod[name];
//
//     if (!fn) {
//       throw new Error(`[Runtime Error] Cannot import function '${name}' from ${path} for performance testing`);
//     }
//
//     const history = await recordPerformance(fn, performance.nStringTestCasesRecordPerformance());
//     return history.exportState();
//   }
//
//   return [];
// }
