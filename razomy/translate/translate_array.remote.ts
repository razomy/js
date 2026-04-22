import * as translateRemote from "@razomy/translate/remote";

export async function translateArray(obj: string[], fromLocale: string, toLocale: string, glossary ={}) {
  const res = [] as string[];
  for (const data of obj) {
    const translatedText = await translateRemote.translate(data, fromLocale, toLocale, glossary);
    res.push(translatedText);
  }
  return res;
}
