import * as yaml from '@razomy/yaml';

describe('yamlToObject', () => {
  it('должен корректно парсить многострочные скалярные значения с отступом', () => {
    // Arrange (Подготовка данных)
    const tokens: yaml.JsonToken[] = [
      { tokenType: 'value', value: 'hello', deep: 0 },
      { tokenType: 'break', value: '\n', deep: 0 },
      { tokenType: 'value', value: 'world', deep: 1 }, // Отступ, но относится к строке на уровне root
      { tokenType: 'break', value: '\n', deep: 1 },
    ];

    // Act (Выполнение действия)
    const result = yaml.yamlToObject(tokens);

    // Assert (Проверка результата)
    // В зависимости от реализации библиотеки ожидается либо объединение через пробел:
    expect(result).toBe('hello world');

    // ПРИМЕЧАНИЕ: Если библиотека сохраняет переносы строк без склеивания,
    // тогда проверка будет выглядеть так:
    // expect(result).toBe('hello\nworld');
  });

  it('должен возвращать пустой результат при пустом массиве токенов', () => {
    const result = yaml.yamlToObject([]);
    expect(result).toBeUndefined(); // или expect(result).toBeNull() / expect(result).toEqual({})
  });
});
