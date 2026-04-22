import * as ai from '@razomy/ai';
import * as aiScenarios from "@razomy/ai-scenarios";

export async function developerSolve(
  task: aiScenarios.refactor.actors.DeveloperTask,
  globalStrategy: string,
  parentCtx: aiScenarios.refactor.actors.ActorContext,
  devId: number,
) {
  console.log(`💻 Разработчик #${devId} приступает к файлу: ${task.fileName}...`);
  const ctx: aiScenarios.refactor.actors.ActorContext = {
    tool: { ...parentCtx.tool },
    llm: { messages: [], tools: [] },
  };
  ctx.llm.messages = [
    ai.sM(`Ты — Senior Developer. Твоя цель — выполнить свою часть работы в рамках большой задачи.

Глобальная стратегия проекта: 
${globalStrategy}

ТВОЯ ИНДИВИДУАЛЬНАЯ ЗАДАЧА:
Целевой файл: ${task.fileName}
Инструкция: ${task.instructions}

Используй инструменты getFile (чтобы прочитать текущий код) и setFile (чтобы сохранить изменения).
Сделай только свою часть работы.`
),
  ];
  ctx.llm.tools = [aiScenarios.refactor.tools.TOOL_REGISTRY.getFile, aiScenarios.refactor.tools.TOOL_REGISTRY.setFile];
  await aiScenarios.refactor.think(ctx);
  console.log(`✅ Разработчик #${devId} завершил работу над ${task.fileName}`);
}
