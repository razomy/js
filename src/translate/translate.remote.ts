import * as run from "@razomy/run";

export async function translate(text: string, fromLocale: string, toLocale: string, glossary = {}): Promise<string> {
  return await run.server.call(
    'razomy.translate_ai',
    'translate',
    [
      text,
      fromLocale,
      toLocale,
      glossary
    ]
  );
}

