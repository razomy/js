import * as aiApi from "@razomy/ai-api";

export async function predict(data: { messages: { role: string; content: string }[] }[]): Promise<string[]> {
  const res: string[] = [];
  for (let datum of data) {
    res.push(await aiApi.instant.predict(datum));
  }
  return res;
}
