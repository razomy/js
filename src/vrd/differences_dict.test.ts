import * as vrd from '@razomy/vrd';
import * as dict from '@razomy/dict';

describe('vrd.differencesDict', () => {
  interface TestCase {
    title: string;
    prev: vrd.VrdOrValue<any>;
    next: vrd.VrdOrValue<any>;
    expected: vrd.P<any>[];
  }

  const testCases: TestCase[] = [
    {
      title: 'null -> null: изменений нет',
      prev: null,
      next: null,
      expected: [],
    },
    {
      title: 'значение удалено (a -> null)',
      prev: 'a',
      next: null,
      expected: [{ type: 'removed', path: '', value: 'a' }],
    },
    {
      title: 'значение добавлено (null -> b)',
      prev: null,
      next: 'b',
      expected: [{ type: 'added', path: '', value: 'b' }],
    },
    {
      title: 'значение заменено (a -> b)',
      prev: 'a',
      next: 'b',
      expected: [{ type: 'replace', path: '', prevValue: 'a', value: 'b' }],
    },
    {
      title: 'скаляр заменен на объект (a -> { b: null })',
      prev: 'a',
      next: vrd.create({ b: null }),
      expected: [{ type: 'replace', path: '', prevValue: 'a', value: { b: null } }],
    },
    {
      title: 'объект заменен на скаляр ({ a: null } -> b)',
      prev: vrd.create({ a: null }),
      next: 'b',
      expected: [{ type: 'replace', path: '', prevValue: { a: null }, value: 'b' }],
    },
    {
      title: 'свойство удалено ({ a: null } -> {})',
      prev: vrd.create({ a: null }),
      next: vrd.create({}),
      expected: [{ type: 'removed', path: '', value: vrd.create({ a: null }) }],
    },
    {
      title: 'свойство добавлено ({} -> { b: null })',
      prev: vrd.create({}),
      next: vrd.create({ b: null }),
      expected: [{ type: 'added', path: '', value: vrd.create({ b: null }) }],
    },
    {
      title: 'одно свойство удалено, другое добавлено ({ a: null } -> { b: null })',
      prev: vrd.create({ a: null }),
      next: vrd.create({ b: null }),
      expected: [
        { type: 'removed', path: '', value: vrd.create({ a: null }) },
        { type: 'added', path: '', value: vrd.create({ b: null }) },
      ],
    },
    {
      title: 'вложенное добавление свойства ({ a: null } -> { a: { b: null } })',
      prev: vrd.create({ a: null }),
      next: vrd.create({ a: vrd.create({ b: null }) }),
      expected: [{ type: 'added', path: 'a', value: vrd.create({ b: null }) }],
    },
  ];

  test.each(testCases)('$title', ({ prev, next, expected }) => {
    const result = vrd.differencesDict([], prev, next, '');

    // 1. Стандартная проверка через тестовый фреймворк (показывает diff при ошибке)
    expect(result).toEqual(expected);

    // 2. Если у vrd специфичные прототипы и требуется сравнение именно через dict.isEqual:
    expect(dict.isEqual(result, expected)).toBe(true);
  });
});
