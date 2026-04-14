import {JSDoc} from "ts-morph";

export function parseComplexity(doc: JSDoc, funcName: string) {
  const complexityTags = doc.getTags().filter((t) => t.getTagName() === 'complexity');
  if (complexityTags.length < 2) {
    throw new Error(`[Parse Error] Missing or incomplete @complexity tags (need 'time' and 'memory') in '${funcName}'`);
  }

  const result = {time: '', memory: ''};
  complexityTags.forEach((tag) => {
    const parts = tag.getCommentText()?.split(' ') || [];
    const type = parts[0];
    const formula = parts[1];

    if (!type || !formula) {
      throw new Error(`[Parse Error] Invalid @complexity format in '${funcName}'. Expected: '@complexity <time|memory> <formula>'`);
    }

    if (type === 'time') result.time = formula;
    else if (type === 'memory') result.memory = formula;
    else throw new Error(`[Parse Error] Unknown complexity type '${type}' in '${funcName}'. Expected 'time' or 'memory'`);
  });
  if (!result.time || !result.memory) {
    throw new Error(`[Parse Error] Both 'time' and 'memory' @complexity must be specified in '${funcName}'`);
  }

  return result;
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
