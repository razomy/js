import * as aiAgentProject from "@razomy/ai-agent-project";

// import {executeToolMut} from './tools/execute_tool_mut';
// import {callAuto} from './llms';
// import * as array from "@razomy/array";
// import * as ai from "@razomy/ai";

export async function think(ctx: aiAgentProject.actors.ActorContext) {
  // console.log(`  [AGENT START] Задача: ...${ctx.llm.messages[ctx.llm.messages.length - 1].content}`);
  //
  // const maxSteps = 10;
  // let step = 0;
  //
  // while (step < maxSteps) {
  //   try {
  //     step++;
  //
  //     const result = await callAuto(ctx.llm)
  //
  //     // Добавляем ответ ассистента в историю
  //     if (array.isArray(result)) {
  //       for (const call of result) {
  //         console.log(`  [TOOL CALL] Вызов: ${call.function.name} с аргументами:`, call.function.arguments);
  //
  //         // Твоя функция должна возвращать результат текстом/JSON
  //         const toolResult = executeToolMut(ctx.tool, call.function);
  //         ctx.llm.messages.push({
  //           role: 'tool',
  //           content: toolResult
  //         });
  //       }
  //       break;
  //     } else {
  //       ctx.llm.messages.push(ai.sM(result));
  //       console.log(`  [AGENT FINISH] Ответ: ${result}`);
  //       break;
  //     }
  //   } catch (error) {
  //     ctx.llm.messages.push(ai.sM( 'System Error executing tool: ' + error));
  //     console.error('Ошибка при работе агента:', error);
  //     break;
  //   }
  // }
  //
  // if (step >= maxSteps) {
  //   console.log('\n⚠️ Агент остановлен: превышен лимит шагов.');
  // }

  return ctx;
}
