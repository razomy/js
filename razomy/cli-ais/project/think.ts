import {executeToolMut} from './tools/execute_tool_mut';
import type {ActorContext} from './actors/director_company';
import {callAuto} from './llms';
import {s} from './llms';
import * as array from "@razomy/array";

export async function think(ctx: ActorContext) {
  console.log(`  [AGENT START] Задача: ...${ctx.llm.messages[ctx.llm.messages.length - 1].content}`);

  const maxSteps = 10;
  let step = 0;

  while (step < maxSteps) {
    try {
      step++;

      const result = await callAuto(ctx.llm)

      // Добавляем ответ ассистента в историю
      if (array.isArray(result)) {
        for (const call of result) {
          console.log(`  [TOOL CALL] Вызов: ${call.function.name} с аргументами:`, call.function.arguments);

          // Твоя функция должна возвращать результат текстом/JSON
          const toolResult = executeToolMut(ctx.tool, call.function);
          ctx.llm.messages.push({
            role: 'tool',
            content: toolResult
          });
        }
        break;
      } else {
        ctx.llm.messages.push(s(result));
        console.log(`  [AGENT FINISH] Ответ: ${result}`);
        break;
      }
    } catch (error) {
      ctx.llm.messages.push({
        role: 'system', // Лучше использовать system для ошибок, 'error' не стандартная роль
        content: 'System Error executing tool: ' + error
      });
      console.error('Ошибка при работе агента:', error);
      break;
    }
  }

  if (step >= maxSteps) {
    console.log('\n⚠️ Агент остановлен: превышен лимит шагов.');
  }

  return ctx;
}