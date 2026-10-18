export function nStringTestCasesRecordPerformance() {
  const pattern = 'fooBar baz_qux-123 ';
  return [
    // 0,
    // 10,
    100, 1_000, 10_000,
  ].map((size) => ({
    // Упрощаем: используем одно поле dataSize
    timeDataSize: size,
    memoryDataSize: size,
    args: [pattern.repeat(size)] as [string],
  }));
}
