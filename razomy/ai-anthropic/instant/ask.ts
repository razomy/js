import * as main from '@razomy/main';
import * as aiAnthropic from '@razomy/ai-anthropic';

export async function ask(texts: string[]) {
  const result = await aiAnthropic.CLIENT.messages.create({
    model: aiAnthropic.MODELS.expensive,
    max_tokens: 20_000,
    messages: texts.map((i) => ({ content: i, role: 'user' })),
  });
  return result.content[0]['text'];
}

main.ifMain(import.meta.url, async () => {
  console.log(await ask(['say hello']));
});
