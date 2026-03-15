import { think } from "../think";
import { tools } from "../tools/execute_tool_mut";
import type {ActorContext, DeveloperTask} from './director_company';

export async function developerSolve(task: DeveloperTask, globalStrategy: string, parentCtx: ActorContext, devId: number) {
    console.log(`💻 Разработчик #${devId} приступает к файлу: ${task.fileName}...`);
    const ctx: ActorContext = {
            tool: { ...parentCtx.tool },
            llm: { messages: [], tools: [] }
          };
    ctx.llm.messages = [
    {
      role: 'system',
      content: `Ты — Senior Developer. Твоя цель — выполнить свою часть работы в рамках большой задачи.
      
      Глобальная стратегия проекта: 
      ${globalStrategy}
      
      ТВОЯ ИНДИВИДУАЛЬНАЯ ЗАДАЧА:
      Целевой файл: ${task.fileName}
      Инструкция: ${task.instructions}

      Используй инструменты getFile (чтобы прочитать текущий код) и setFile (чтобы сохранить изменения).
      Сделай только свою часть работы.`
    }
    ];
    ctx.llm.tools = [tools.getFile, tools.setFile];
    await think(ctx);
    console.log(`✅ Разработчик #${devId} завершил работу над ${task.fileName}`);
}
