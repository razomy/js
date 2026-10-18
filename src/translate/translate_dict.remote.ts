import * as dictRecursive from "@razomy/dict-recursive";
import * as translateRemote from "@razomy/translate/remote";

export async function translateDict<T>(obj: T, fromLocale: string, toLocale: string) {
  const records = dictRecursive.flat(obj as Record<string, string>);
  const res = {};
  for (const key in records) {
    const textToTranslate = records[key];
    const translatedText = await translateRemote.translate(textToTranslate, fromLocale, toLocale);
    dictRecursive.setByPathMut(res, key, translatedText);
  }
  return res as T;
}

