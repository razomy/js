import * as abstractions from '@razomy/abstractions';

export function toYaml(nodes: abstractions.structure.KeyValueArray<string, string>, indentLevel = 0, indentSize = 2) {
  const currentIndent = ' '.repeat(indentLevel * indentSize);
  const lines: string[] = [];

  for (const item of nodes) {
    let [key, value] = item;

    // 1. Проверка: если ключ пустой — пропускаем узел
    if (key === null || key === undefined || (typeof key === 'string' && key.trim() === '')) {
      continue;
    }

    // 3. Если значение — пустой узел (без тела)
    if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
      lines.push(`${key}`.prefixLinesAndSkipEmpty(currentIndent));
      continue;
    }

    const valStr = String(value);
    const isNewLine = valStr.includes('\n') || valStr.endsWith(':');
    const break_ = isNewLine ? ':\n' : ': ';
    const childIndent = ' '.repeat((indentLevel + 1) * indentSize);
    const breakIndent = isNewLine ? childIndent : currentIndent;

    // 2. Если значение — дочерний массив (рекурсия)
    if (Array.isArray(value)) {
      const children = toYaml(value, 0, indentSize);
      lines.push(
        `${key.prefixLinesAndSkipEmpty(currentIndent)}${break_}${children.prefixLinesAndSkipEmpty(breakIndent)}`,
      );
    } else {
      lines.push(
        `${key.prefixLinesAndSkipEmpty(currentIndent)}${break_}${valStr.prefixLinesAndSkipEmpty(breakIndent)}`,
      );
    }
  }

  return lines.join('\n\n');
}
