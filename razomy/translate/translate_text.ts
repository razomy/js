// import { pipeline } from '@xenova/transformers';

// Кэш для хранения загруженных ИИ-моделей
// const modelsCache = new Map<string, any>();

export async function translateText(text: string, src: string, tgt: string): Promise<string> {
  // const modelName = `Xenova/opus-mt-${src}-${tgt}`;
  //
  // // Загружаем модель только 1 раз
  // if (!modelsCache.has(modelName)) {
  //     console.log(`Загрузка модели ${modelName}...`);
  //     const translator = await pipeline('translation', modelName);
  //     modelsCache.set(modelName, translator);
  // }
  //
  // const translator = modelsCache.get(modelName);
  // const result = await translator(text);
  // return result[0].translation_text;
  return '';
}
