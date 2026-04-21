import {predict} from "./predict";
import {ifMain} from "@razomy/main";
import path from "node:path";
import * as ai from "@razomy/ai";
import {TOOL_REGISTRY} from "./tools";

export async function start(dirPath: string, challengePrompt: string) {

  const messages = [
    ai.sM(
      `Ты — Военный Senior Бизнес-аналитик.
Твоя задача — расписать задачу пользователя по шагам выполнение разработчиком в виде псевдокода. 
Опиши, что именно нужно сделать, какие возможны edge-cases (особые случаи). Какте инструмены использовать.
Отвечай кратко, по делу, в формате псевдокода.
Список доступных инструментов
${Object.keys(TOOL_REGISTRY)}
`,
    ),
    ai.uM(challengePrompt),
  ];

  const res = await predict(messages)
      console.log(res);


  // const ctx: aiScenarios.refactor.actors.ActorContext = {
  //   tool: {
  //     project: { dirPath: dirPath },
  //   },
  //   llm: {
  //     messages: [],
  //     tools: [],
  //   },
  // };
  // await aiScenarios.refactor.actors.directorCompany(challengePrompt, ctx);
  //
  //
  //
  //
  // return predict(
  //   "1",
  //   "mlx-community/gemma-4-e2b-it-4bit",
  //   [{"role": "user", "content": "Multiply 12234585 and 48838483920. And say answer."}],
  //   [{
  //     "type": "function",
  //     "function": {
  //       "name": "multiply",
  //       "description": "A function that multiplies two numbers",
  //       "parameters": {
  //         "type": "object",
  //         "properties": {
  //           "a": {"type": "number", "description": "The first number to multiply"},
  //           "b": {"type": "number", "description": "The second number to multiply"}
  //         },
  //         "required": ["a", "b"]
  //       }
  //     }
  //   }]
  // )
  // delete context
}

ifMain(import.meta.url, async () => {
  await start(path.resolve('razomy'), `
Your task is to complete project refactoring.
You need to run build command.
If it return error
 go and fix it
if there no errors
 done

If there is problem with imports
Use absolute import style like
import * as <packageName camelCase> from "<packgeName>";
import * as aiScenarios from "@razomy/ai-scenarios";
aiScenarios.refactor.actors.ActorContext
`.trim())
})
