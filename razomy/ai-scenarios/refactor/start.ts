import {predict} from "../../ai/api-run/instant/chat/tool/predict";

export function start(dirPath: string, challengePrompt: string) {
  return predict(
    "1",
    "mlx-community/gemma-4-e2b-it-4bit",
    [{"role": "user", "content": "Multiply 12234585 and 48838483920. And say answer."}],
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
    }]
  )
  // delete context
}

