import * as instant from '../instant';

export async function predict(data: { messages: { role: string; content: string }[] }[]): Promise<string[]> {
  const res: string[] = [];
  for (let datum of data) {
    res.push(await instant.predict(datum));
  }
  return res;
}
