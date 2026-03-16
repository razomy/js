// 3. Архитектор (Возвращает структурированный JSON)
import {tools} from "../tools";
import {think} from "../think";
import type {ActorContext, ArchitecturePlan} from "./director_company";
import {parseJson} from "../parsers";

export async function architecture(baPlan: string, parentCtx: ActorContext): Promise<ArchitecturePlan> {
  console.log('📐 Архитектор планирует изменения и распределяет задачи...');

  const ctx: ActorContext = {
    tool: {...parentCtx.tool},
    llm: {messages: [], tools: []}
  };

  ctx.llm.messages = [
    {
      role: 'system',
      content: `Ты — Software Architect. У тебя есть план от Бизнес-аналитика.
      1. Твоя задача — использовать инструменты (getDirFiles), чтобы понять структуру проекта, 
     `
    },
    {role: 'user', content: baPlan}
  ];
  ctx.llm.tools = [tools.getDirFiles];

  await think(ctx);
  const rawResponse = ctx.llm.messages[ctx.llm.messages.length - 1].content;

  const ctx2: ActorContext = {
    tool: {...parentCtx.tool},
    llm: {messages: [], tools: []}
  };

  ctx2.llm.messages = [
    {
      role: 'system',
      content: `Ты — Software Architect. У тебя есть план от Бизнес-аналитика.
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
      }`
    },
    {role: 'user', content: rawResponse}
  ];
  ctx2.llm.tools = [];

  await think(ctx2);
  const rawResponse2 = ctx2.llm.messages[ctx2.llm.messages.length - 1].content;

  return parseJson<ArchitecturePlan>(rawResponse2);
}
