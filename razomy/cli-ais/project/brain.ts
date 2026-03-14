import {executeToolMut} from './tools';
import type {ActorContext} from './actor';
import {callAuto} from './llm';
import {isArray} from '@razomy/array';
import {s} from './action';

export async function think(ctx: ActorContext) {
  console.log(`  [AGENT START] Задача: ...${ctx.llm.messages[ctx.llm.messages.length - 1].content}`);

  const MAX_STEPS = 10;
  let step = 0;

  while (step < MAX_STEPS) {
    try {
      step++;

      const result = await callAuto(ctx.llm)

      // Добавляем ответ ассистента в историю
      if (isArray(result)) {
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

  if (step >= MAX_STEPS) {
    console.log('\n⚠️ Агент остановлен: превышен лимит шагов.');
  }

  return ctx;
}