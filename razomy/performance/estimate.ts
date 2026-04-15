import * as performance from "@razomy/performance";

/**
 * Get a time and RAM prediction using Weighted Moving Average (WMA).
 *
 * @param history - Records
 * @param timeDataSize - Size of the data (e.g., characters length)
 * @param memoryDataSize - Size of the data (e.g., characters length)
 * @returns Object with time and memory predictions
 */
export function estimate(history: performance.PerformanceRecord[], timeDataSize: number, memoryDataSize: number): performance.Prediction {
  if (history.length === 0) {
    return {
      timeText: 'Unknown (calibrating...)',
      timeMs: 0,
      memoryText: 'Unknown (calibrating...)',
      memoryBytes: 0,
    };
  }

  let totalTimeWeight = 0;
  let totalMemoryWeight = 0;
  let weightedTimeSum = 0;
  let weightedMemorySum = 0;

  // Рассчитываем WMA (взвешенное скользящее среднее) отдельно для времени и памяти
  for (let i = 0; i < history.length; i++) {
    const record = history[i];
    const weight = i + 1; // Чем свежее запись, тем больше вес (предполагается, что конец массива - самые новые данные)

    // Расчет для ВРЕМЕНИ
    if (record.timeDataSize > 0) {
      const timeRatio = record.time / record.timeDataSize; // мс на 1 единицу данных времени
      weightedTimeSum += timeRatio * weight;
      totalTimeWeight += weight;
    }

    // Расчет для ПАМЯТИ
    if (record.memoryDataSize > 0) {
      const memoryRatio = record.memory / record.memoryDataSize; // байт на 1 единицу данных памяти
      weightedMemorySum += memoryRatio * weight;
      totalMemoryWeight += weight;
    }
  }

  // Защита от деления на ноль, если в истории не было валидных данных
  const avgTimeRatio = totalTimeWeight > 0 ? weightedTimeSum / totalTimeWeight : 0;
  const avgMemoryRatio = totalMemoryWeight > 0 ? weightedMemorySum / totalMemoryWeight : 0;

  // Прогнозируем, умножая средний коэффициент на текущие размеры данных
  const predictedTimeMs = timeDataSize * avgTimeRatio;
  const predictedMemoryBytes = memoryDataSize * avgMemoryRatio;

  return {
    timeText: performance.formatTime(predictedTimeMs), // Убедись, что функция formatTime импортирована
    timeMs: predictedTimeMs,
    memoryText: performance.formatMemory(predictedMemoryBytes), // Убедись, что функция formatMemory импортирована
    memoryBytes: predictedMemoryBytes,
  };
}
