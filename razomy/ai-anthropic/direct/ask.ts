import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function ask(req: string) {
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content:
          'What should I search for to find the latest developments in renewable energy?'
      }
    ]
  });
  console.log(msg);
}