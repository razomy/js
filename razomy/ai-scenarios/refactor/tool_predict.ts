import type {AiMessage} from "@razomy/ai";
import * as ai from '@razomy/ai';

export async function predict(messages: AiMessage[], tools) {
  return await ai.apiRun.instant.chat.tool.predict(
    null,
    'mlx-community/gemma-4-e2b-it-4bit',
    messages,
    tools
  )
}

// @ts-ignore
function test_predict() {
  predict([{sender: 'user', type: 'text', content: "Say hello world!"}], [])
    .then(messages => {
      console.log(messages);
    });
}

// @ts-ignore
function test_predict_tool() {
  predict(
    [{"sender": "user", type: 'text', "content": "Multiply 12234585 and 48838483920. And say answer."}],
    [{
      "type": "function",
      "function": {
        "name": "multiply",
        "description": "A function that multiplies two numbers",
        "parameters": {
          "type": "object",
          "properties": {
            "a": {"type": "number", "description": "The first number to multiply"},
            "b": {"type": "number", "description": "The second number to multiply"}
          },
          "required": ["a", "b"]
        }
      }
    }])
    .then(messages => {
      console.log(messages);
    });
}
