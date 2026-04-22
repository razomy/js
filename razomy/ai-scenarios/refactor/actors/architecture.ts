import * as ai from '@razomy/ai';
import * as aiScenarios from "@razomy/ai-scenarios";
import * as aiAgent from "@razomy/ai-agent";

export async function architecture(
  baPlan: string,
  parentCtx: aiScenarios.refactor.actors.ActorContext,
): Promise<aiScenarios.refactor.actors.ArchitecturePlan> {
  console.log('📐 Архитектор планирует изменения и распределяет задачи...');

  const ctx: aiScenarios.refactor.actors.ActorContext = {
    tool: { ...parentCtx.tool },
    llm: { messages: [], tools: [] },
  };

  ctx.llm.messages = [
    ai.sM(`Ты — Software Architect. У тебя есть план от Бизнес-аналитика.
      1. Твоя задача — использовать инструменты (getDirFiles), чтобы понять структуру проекта, 
     `),
    ai.uM(baPlan),
  ];
  // ctx.llm.tools = [aiScenarios.refactor.tools.TOOL_REGISTRY.getDirFiles];

  // await aiScenarios.refactor.think(ctx);
  const rawResponse = ctx.llm.messages[ctx.llm.messages.length - 1].content;

  const ctx2: aiScenarios.refactor.actors.ActorContext = {
    tool: { ...parentCtx.tool },
    llm: { messages: [], tools: [] },
  };

  ctx2.llm.messages = [
    ai.sM(`Ты — Software Architect. У тебя есть план от Бизнес-аналитика.
      1.
      ВНИМАНИЕ: Во избежание конфликтов при записи (race conditions), старайся назначать 
      ОДИН файл только ОДНОМУ разработчику (в одной задаче).

      Ты ОБЯЗАН ответить только валидным JSON объектом следующей структуры:
      {
        "globalStrategy": "Общее описание того, как мы решаем проблему",
        "tasks": [
          {
            "fileName": "путь/к/файлу.ts",
            "instructions": "Конкретное ТЗ что именно разработчик должен написать или изменить в этом файле"
          }
        ]
      }`),
    ai.uM(rawResponse),
  ];
  ctx2.llm.tools = [];

  // await aiScenarios.refactor.think(ctx2);
  const rawResponse2 = ctx2.llm.messages[ctx2.llm.messages.length - 1].content;

  return aiAgent.parsers.parseJson<aiScenarios.refactor.actors.ArchitecturePlan>(rawResponse2);
}
