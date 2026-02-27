import {WeightedMovingAverageRecorder} from './weighted_moving_average_recorder';


/**
 * Декоратор, который оборачивает функцию в измеритель
 * @param myRecorder prediction system
 * @param sizeCalculator Функция, которая принимает аргументы исходной функции и возвращает timeDataSize (наш n^2)
 * @param memoryCalculator Функция, которая принимает аргументы исходной функции и возвращает memoryDataSize (наш n^2)
 */
export function MeasureComplexity<T extends any[]>(myRecorder: WeightedMovingAverageRecorder,
                                                   sizeCalculator: (...args: T) => number,
                                                   memoryCalculator: (...args: T) => number
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: T) {
      // 1. Считаем dataSize по формуле (например, длину массива в квадрате)
      const timeDataSize = sizeCalculator(...args);
      const memoryDataSize = memoryCalculator(...args);

      // 2. Запускаем через ваш рекордер
      const record = await myRecorder.measure(timeDataSize, memoryDataSize, async () => {
        // Вызываем оригинальную функцию
        return await originalMethod.apply(this, args);
      });

      console.log(`Predicted time: ${record.prediction.timeText}`);
      console.log(`Actual time: ${record.actualTimeText}`);

      return record.result;
    };

    return descriptor;
  };
}

//
// class MyService {
//   // Говорим декоратору: возьми первый аргумент (arr), измерь его длину и возведи в квадрат
//   @MeasureComplexity((arr: number[]) => arr.length ** 2)
//   async myLongFn(arr: number[]) {
//     // Симуляция алгоритма O(n^2)
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr.length; j++) {
//         sum += arr[i] * arr[j];
//       }
//     }
//     return sum;
//   }
// Алгоритм сравнивает каждый элемент массива А с каждым элементом массива Б
// Сложность O(N * M)
// @MeasureComplexity((arrA: any[], arrB: any[]) => arrA.length * arrB.length)
// async compareTwoDatasets(arrA: any[], arrB: any[]) {
//   // ...
// }
// }