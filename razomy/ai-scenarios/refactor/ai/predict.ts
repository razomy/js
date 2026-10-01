import * as ai from '@razomy/ai';
import * as aiHuggingface from '@razomy/ai-huggingface';

export async function predict(messages: ai.AiMessage[]) {
  return await aiHuggingface.apiRun.instant.chat.logic.predict(null, 'mlx-community/gemma-4-e2b-it-4bit', messages)
}

// @ts-ignore
function testPredict() {
  predict([{sender: 'user', type: 'text', content: "Say hello world!"}])
    .then(messages => {
      console.log(messages);
    });
}
