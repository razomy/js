// 2. Бизнес-Аналитик (Остается почти без изменений)
import * as ai from '@razomy/ai';
import * as aiScenarios from "@razomy/ai-scenarios";

export async function businessAnalytic(task: string, parentCtx: aiScenarios.refactor.actors.ActorContext): Promise<string> {
  console.log('📊 Бизнес-аналитик анализирует требования...');

  const ctx: aiScenarios.refactor.actors.ActorContext = {
    tool: { ...parentCtx.tool },
    llm: { messages: [], tools: [] },
  };

  ctx.llm.messages = [
    ai.sM(
      `Ты — Senior Бизнес-аналитик. Твоя задача — расписать задачу пользователя по шагам. 
Опиши, что именно нужно сделать, какие возможны edge-cases (особые случаи). 
Отвечай кратко, по делу, в формате Markdown.
`,
    ),
    ai.uM(task),
  ];

  // await aiScenarios.refactor.think(ctx);
  return ctx.llm.messages[ctx.llm.messages.length - 1].content;
}


