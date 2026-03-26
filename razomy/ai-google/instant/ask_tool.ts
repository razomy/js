import {
  type Part
} from '@google/genai';
import {specToTool} from "./spec_to_tool";
import {CLIENT, MODELS} from "../client";
import * as abstracts from "@razomy/abstracts";
import * as ai from "@razomy/ai";

export async function askTool(texts: string[],
                               toolSpec: abstracts.ast.FunctionDeclaration[]
) {
  const tools = [{
    functionDeclarations: toolSpec.map(specToTool)
  }];
  // Конвертируем историю сообщений в формат Gemini
  // В Gemini роли: 'user' и 'model'. Система обрабатывается отдельно или как первый user.
  const history = texts.slice(0, -1).map(m => ({
    // role: m.role === 'model' ? 'model' : 'user',
    role: 'user',
    parts: [{text: m} as Part],
  }));

  const lastMessage = texts[texts.length - 1];

  // Запуск генерации
  const result = await CLIENT.models.generateContent({
    model: MODELS.cheap,
    contents: [...history, {role: 'user', parts: [{text: lastMessage}]}],
    config: {
      tools
    }
  });

  const functionCalls = result.functionCalls;

  // Проверка: вызвал ли AI инструмент
  if (!functionCalls || functionCalls.length === 0) {
    throw new ai.MustUseToolLlmException(
      result.text!,
      'Expected at least one tool call'
    );
  }

  // Возвращаем массив вызовов (совместимо с логикой Ollama/OpenAI)
  return functionCalls.map(call => ({
    function: {
      name: call.name,
      arguments: call.args // Gemini возвращает уже распарсенный объект
    }
  }));
}

// --- ПРИМЕР ИСПОЛЬЗОВАНИЯ ---

/*
async function test() {
  const myTool: FunctionSpecification = {
    name: "get_weather",
    title: "Get Weather",
    description: "Returns weather for a city",
    parameters: [
      { name: "city", type: "string", description: "City name", defaultValue: null }
    ],
    returns: { type: "string", description: "JSON weather" },
    performance: {
        timeDataSizeComplexityFn: "O(1)",
        memoryDataSizeComplexityFn: "O(1)",
        history: []
    },
    examples: []
  };

  try {
    const calls = await callTool({
      messages: [{ role: 'user', content: 'What is the weather in London?' }],
      tools: [myTool]
    });
    console.log("Tools to call:", calls);
  } catch (e) {
    if (e instanceof MustUseToolLlmException) {
      console.log("AI just replied:", e.content);
    }
  }
}
*/
