import * as aiApi from "..";

export async function predict(data: { messages: { role: string; content: string }[] }[]): Promise<string[]> {
  const res: string[] = [];
  for (let datum of data) {
    res.push(await aiApi.instant.chat.text.predict(datum));
  }
  return res;
}
