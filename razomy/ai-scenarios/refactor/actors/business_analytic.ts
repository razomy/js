// 2. Бизнес-Аналитик (Остается почти без изменений)
import * as ai from '@razomy/ai';
import * as aiAgentProject from '../../../ai-agent';

export async function businessAnalytic(task: string, parentCtx: aiAgentProject.actors.ActorContext): Promise<string> {
  console.log('📊 Бизнес-аналитик анализирует требования...');

  const ctx: aiAgentProject.actors.ActorContext = {
    tool: { ...parentCtx.tool }, // Клонируем тулы или инициализируем нужные
    llm: { messages: [], tools: [] },
  };

  ctx.llm.messages = [
    ai.sM(
      `Ты — Senior Бизнес-аналитик. Твоя задача — расписать задачу пользователя по шагам. 
      Опиши, что именно нужно сделать, какие возможны edge-cases (особые случаи). 
      Отвечай кратко, по делу, в формате Markdown.`,
    ),
    ai.uM(task),
  ];

  await aiAgentProject.think(ctx);
  return ctx.llm.messages[ctx.llm.messages.length - 1].content;
}
