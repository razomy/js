import * as ai from "@razomy/ai";
import * as aiAgentProject from "@razomy/ai-agent-project";

export async function developerSolve(task: aiAgentProject.actors.DeveloperTask, globalStrategy: string, parentCtx: aiAgentProject.actors.ActorContext, devId: number) {
  console.log(`💻 Разработчик #${devId} приступает к файлу: ${task.fileName}...`);
  const ctx: aiAgentProject.actors.ActorContext = {
    tool: {...parentCtx.tool},
    llm: {messages: [], tools: []}
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
    )
  ];
  ctx.llm.tools = [aiAgentProject.tools.TOOL_REGISTRY.getFile, aiAgentProject.tools.TOOL_REGISTRY.setFile];
  await aiAgentProject.think(ctx);
  console.log(`✅ Разработчик #${devId} завершил работу над ${task.fileName}`);
}
