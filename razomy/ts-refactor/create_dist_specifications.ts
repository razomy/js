import { Project, FunctionDeclaration, JSDoc } from 'ts-morph';
import { recordPerformance } from '../performance/record_performance';
import type { FunctionSpecification } from '../function/function_specification';
import * as performance from '@razomy/performance';

/**
 * Основная функция генерации спецификации.
 * Написана в декларативном стиле, собирает данные из функций-экстракторов.
 */
export async function createDistSpecifications(project: Project, path: string, name: string): Promise<FunctionSpecification> {
  const sourceFile = project.getSourceFileOrThrow(path);
  const func = sourceFile.getFunctionOrThrow(name);
  const funcName = func.getName() || name;

  const doc = extractValidJsDoc(func, funcName);

  const title = extractTitle(doc, funcName, path);
  const description = extractDescription(doc, funcName, path);
  const parameters = extractParameters(func, doc, funcName);
  const returns = extractReturns(func, doc, funcName);
  const examples = extractExamples(doc, funcName, path);
  const complexity = extractComplexity(doc, funcName, path);

  const history = await extractPerformanceHistory(path, funcName, parameters);

  return {
    name: funcName,
    // path: '', // В оригинале было '', возможно нужно заменить на path
    title,
    description,
    parameters,
    returns,
    performance: {
      history,
      timeDataSizeComplexityFn: complexity.time,
      memoryDataSizeComplexityFn: complexity.memory,
    },
    examples,
  };
}

// ============================================================================
// Функции-экстракторы (Декомпозиция)
// ============================================================================

function extractValidJsDoc(func: FunctionDeclaration, funcName: string): JSDoc {
  const jsDocs = func.getJsDocs();
  if (jsDocs.length === 0) {
    throw new Error(`[Parse Error] JSDoc is missing for function '${funcName}'`);
  }
  return jsDocs[0];
}

function extractTitle(doc: JSDoc, funcName: string, path: string): string {
  const titleTag = doc.getTags().find((t) => t.getTagName() === 'summary');
  const title = titleTag?.getCommentText()?.trim();

  if (!title) {
    throw new Error(`[Parse Error] Missing or empty @summary in '${funcName}' (${path})`);
  }
  return title;
}

function extractDescription(doc: JSDoc, funcName: string, path: string): string {
  const descTag = doc.getTags().find((t) => t.getTagName() === 'description');

  // Берем из тега @description, либо из основного описания JSDoc
  const description = descTag
    ? descTag.getCommentText()?.trim()
    : doc.getDescription().trim();

  if (!description) {
    throw new Error(`[Parse Error] Missing description for '${funcName}' (${path})`);
  }
  return description;
}

function extractParameters(func: FunctionDeclaration, doc: JSDoc, funcName: string) {
  const params = func.getParameters();

  return params.map((param) => {
    const name = param.getName();
    const type = param.getType().getText(param);

    // Extract the default value (if it exists)
    const defaultValue = param.getInitializer()?.getText() || null;

    const paramTag = doc.getTags().find((t) => t.getTagName() === 'param' && t.getText().includes(name));
    if (!paramTag) {
      throw new Error(`[Parse Error] Missing @param documentation for parameter '${name}' in '${funcName}'`);
    }

    const comment = paramTag.getCommentText();
    const description = comment?.replace(/^-\s*/, '').trim();

    if (!description) {
      throw new Error(`[Parse Error] Empty description for @param '${name}' in '${funcName}'`);
    }

    return {
      name,
      type,
      description,
      defaultValue
    };
  });
}

function extractReturns(func: FunctionDeclaration, doc: JSDoc, funcName: string) {
  const type = func.getReturnType().getText(func);
  const returnsTag = doc.getTags().find((t) => t.getTagName() === 'returns');

  if (!returnsTag) {
    throw new Error(`[Parse Error] Missing @returns tag in '${funcName}'`);
  }

  const description = returnsTag
    .getText()
    .replace(/@returns\s*/, '')
    .replace(/^\s*\*\s?/gm, '')
    .trim();

  if (!description) {
    throw new Error(`[Parse Error] Empty description for @returns in '${funcName}'`);
  }

  return { type, description };
}

function extractExamples(doc: JSDoc, funcName: string, path: string) {
  const exampleTags = doc.getTags().filter((t) => t.getTagName() === 'example');

  if (exampleTags.length === 0) {
    throw new Error(`[Parse Error] Missing @example tags in '${funcName}' (${path})`);
  }

  return exampleTags.map((tag) => {
    const cleanText = tag.getText().replace(/^\s*\*\s?/gm, '');
    const codeMatch = cleanText.match(/```[a-z]*\n([\s\S]*?)```/);

    if (!codeMatch) {
      throw new Error(`[Parse Error] Invalid @example format in '${funcName}'. Expected markdown code block (\`\`\`).`);
    }

    const rawCode = codeMatch[1].trim();
    const parts = rawCode.split('// =>');

    if (parts.length !== 2) {
      throw new Error(`[Parse Error] Invalid @example format in '${funcName}'. Expected '// =>' separator for expected result.`);
    }

    return {
      code: parts[0].trim(),
      expected: parts[1].replace(/['"]/g, '').trim(),
    };
  });
}

function extractComplexity(doc: JSDoc, funcName: string, path: string) {
  const complexityTags = doc.getTags().filter((t) => t.getTagName() === 'complexity');

  if (complexityTags.length < 2) {
    throw new Error(`[Parse Error] Missing or incomplete @complexity tags (need 'time' and 'memory') in '${funcName}' (${path})`);
  }

  const result = { time: '', memory: '' };

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

async function extractPerformanceHistory(path: string, name: string, parameters: any[]) {
  // Выполняем тест производительности только если функция принимает ровно 1 параметр типа string
  if (parameters.length === 1 && parameters[0].type === 'string') {
    const mod = await import(path);
    const fn = mod[name];

    if (!fn) {
      throw new Error(`[Runtime Error] Cannot import function '${name}' from ${path} for performance testing`);
    }

    const history = await recordPerformance(fn, performance.nStringTestCasesRecordPerformance());
    return history.exportState();
  }

  return [];
}
