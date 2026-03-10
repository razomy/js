import {Project} from 'ts-morph';
import {recordPerformance} from '../performance/record_performance';
import {nStringTestCasesRecordPerformance} from '@razomy/performance';
import type {FunctionSpecification} from '../function/function_specification';

export async function createDistSpecifications(project: Project, path: string, name: string) {
  const sourceFile = project.getSourceFileOrThrow(path);

  const func = sourceFile.getFunctionOrThrow(name);

  const spec = {
    name: func.getName(),
    path: '',
    title: '',
    description: '',
    parameters: [] as any[],
    returns: {
      type: func.getReturnType().getText(),
      description: '',
    },
    performance: {
      history: [],
      memoryDataSizeComplexityFn: '',
      timeDataSizeComplexityFn: '',
    },
    examples: [] as any[],
  } as FunctionSpecification;

  const jsDocs = func.getJsDocs();
  if (jsDocs.length === 0) return spec;

  const doc = jsDocs[0];

  // .getDescription() уже возвращает чистый текст без звездочек
  spec.description = doc.getDescription().trim();

  // --- Извлекаем параметры ---
  spec.parameters = func.getParameters().map((param) => {
    const name = param.getName();
    const type = param.getType().getText();

    const paramTag = doc.getTags().find((t) => t.getTagName() === 'param' && t.getText().includes(name));
    let description = '';
    if (paramTag) {
      // Используем getCommentText(), который в новых версиях ts-morph возвращает чистый текст описания
      const comment = paramTag.getCommentText();
      if (comment) {
        // Убираем дефис, если он есть (например: "- The text to convert.")
        description = comment.replace(/^-\s*/, '').trim();
      }
    }

    return {name, type, description};
  });

  // --- Извлекаем Returns ---
  const returnsTag = doc.getTags().find((t) => t.getTagName() === 'returns');
  if (returnsTag) {
    // Очищаем сырой текст от JSDoc звездочек и тега @returns
    const cleanText = returnsTag
      .getText()
      .replace(/@returns\s*/, '') // Убираем само слово @returns
      .replace(/^\s*\*\s?/gm, '') // Убираем пробелы и звездочки в начале каждой строки
      .trim();

    spec.returns.description = cleanText;
  }

  // --- Извлекаем примеры (Examples) ---
  const exampleTags = doc.getTags().filter((t) => t.getTagName() === 'example');
  exampleTags.forEach((tag) => {
    // 1. Очищаем текст тега от звездочек форматирования JSDoc
    const cleanText = tag.getText().replace(/^\s*\*\s?/gm, '');

    // 2. Ищем Markdown блок с кодом (теперь он чистый)
    const codeMatch = cleanText.match(/```[a-z]*\n([\s\S]*?)```/);

    if (codeMatch) {
      const rawCode = codeMatch[1].trim();
      const parts = rawCode.split('// =>');

      if (parts.length === 2) {
        spec.examples.push({
          code: parts[0].trim(),
          expected: parts[1].replace(/['"]/g, '').trim(),
        });
      }
    }
  });

  // --- Извлекаем complexity (Examples) ---
  const titleTags = doc.getTags().filter((t) => t.getTagName() === 'summary');
  titleTags.forEach((tag) => {
    // 1. Очищаем текст тега от звездочек форматирования JSDoc
    const cleanText = tag.getCommentText();

    if (!cleanText) {
      throw new Error('Invalid Doc no summary ' + path);
    }
    spec.title = cleanText;
  });

  const descriptionTags = doc.getTags().filter((t) => t.getTagName() === 'description');
  descriptionTags.forEach((tag) => {
    // 1. Очищаем текст тега от звездочек форматирования JSDoc
    const cleanText = tag.getCommentText();

    if (!cleanText) {
      throw new Error('Invalid Doc no description ' + path);
    }
    spec.description = cleanText;
  });

  // --- Извлекаем complexity (Examples) ---
  const complexityTags = doc.getTags().filter((t) => t.getTagName() === 'complexity');
  complexityTags.forEach((tag) => {
    // 1. Очищаем текст тега от звездочек форматирования JSDoc
    const cleanText = tag.getCommentText()?.split(' ')!;

    // 2. Ищем Markdown блок с кодом (теперь он чистый)
    const tagMatch = cleanText[0];
    const codeMatch = cleanText[1];

    if (!codeMatch || !tagMatch) {
      throw new Error('Invalid Doc no complexity ' + path);
    }
    if (tagMatch === 'time') {
      spec.performance.timeDataSizeComplexityFn = codeMatch;
      return;
    }
    if (tagMatch === 'memory') {
      spec.performance.memoryDataSizeComplexityFn = codeMatch;
      return;
    }
    throw new Error('Invalid Doc invalid complexity ' + path);
  });


  if (spec.parameters[0].type === 'string') {
    const fn = await import(path).then((c) => c[name]);
    const history = await recordPerformance(fn, nStringTestCasesRecordPerformance());
    spec.performance.history = history.exportState();
  }

  return spec;
}
