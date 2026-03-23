import {models} from '../client';
import {client} from "../client";
import * as main from "@razomy/main";

export async function ask(texts: string[]) {
  const result = await client.messages.create({
    model: models.expensive,
    max_tokens: 20_000,
    messages: texts.map(i => ({content: i, role: 'user'})),
  });
  return result.content[0]['text'];
}

main.ifMain(import.meta.url, async () => {
  console.log(await ask(['say hello']));
})
