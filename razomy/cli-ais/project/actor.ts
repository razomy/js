import { think } from './brain';
import { type ToolContext, tools } from './tools';
import type { LlmContext } from './llm';
import {parseJson} from './action';

export interface ActorContext {
  tool: ToolContext;
  llm: LlmContext;
}

// === НОВЫЕ ИНТЕРФЕЙСЫ ===
export interface DeveloperTask {
  fileName: string; // Файл, с которым будет работать разработчик
  instructions: string; // Подробное ТЗ для конкретного файла
}

export interface ArchitecturePlan {
  globalStrategy: string; // Общее описание решения
  tasks: DeveloperTask[]; // Массив задач для параллельной разработки
}

// 1. Директор управляет всем процессом
export async function directorCompany(challengePrompt: string, parentCtx: ActorContext) {
  console.log('👔 Директор берет задачу в работу...');

  // Шаг 1: Бизнес-анализ
  const baResult = await businessAnalytic(challengePrompt, parentCtx);

  // Шаг 2: Архитектура (создает директорию параллельных задач)
  const archPlan = await architecture(baResult, parentCtx);

  console.log(`🚀 Архитектор разбил проект на ${archPlan.tasks.length} параллельных задач.`);

  // Шаг 3: Параллельная разработка (индивидуальная задача для каждого разработчика)
  // Используем Promise.all для одновременного запуска всех разработчиков
  const developerPromises = archPlan.tasks.map((task, index) =>
    developerSolve(task, archPlan.globalStrategy, parentCtx, index + 1)
  );

  await Promise.all(developerPromises);

  console.log('✅ Проект успешно завершен!');
}

// 2. Бизнес-Аналитик (Остается почти без изменений)
async function businessAnalytic(task: string, parentCtx: ActorContext): Promise<string> {
  console.log('📊 Бизнес-аналитик анализирует требования...');

  const ctx: ActorContext = {
    tool: { ...parentCtx.tool }, // Клонируем тулы или инициализируем нужные
    llm: { messages: [], tools: [] }
  };

  ctx.llm.messages = [
    {
      role: 'system',
      content: `Ты — Senior Бизнес-аналитик. Твоя задача — расписать задачу пользователя по шагам. 
      Опиши, что именно нужно сделать, какие возможны edge-cases (особые случаи). 
      Отвечай кратко, по делу, в формате Markdown.`
    },
    { role: 'user', content: task }
  ];

  await think(ctx);
  return ctx.llm.messages[ctx.llm.messages.length - 1].content;
}

// 3. Архитектор (Возвращает структурированный JSON)
async function architecture(baPlan: string, parentCtx: ActorContext): Promise<ArchitecturePlan> {
  console.log('📐 Архитектор планирует изменения и распределяет задачи...');

  const ctx: ActorContext = {
    tool: { ...parentCtx.tool },
    llm: { messages: [], tools: [] }
  };

  ctx.llm.messages = [
    {
      role: 'system',
      content: `Ты — Software Architect. У тебя есть план от Бизнес-аналитика.
      1. Твоя задача — использовать инструменты (getDirFiles), чтобы понять структуру проекта, 
     `
    },
    { role: 'user', content: baPlan }
  ];
  ctx.llm.tools = [tools.getDirFiles];

  await think(ctx);
  const rawResponse = ctx.llm.messages[ctx.llm.messages.length - 1].content;

  const ctx2: ActorContext = {
    tool: { ...parentCtx.tool },
    llm: { messages: [], tools: [] }
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
    { role: 'user', content: rawResponse }
  ];
  ctx2.llm.tools = [];

  await think(ctx2);
  const rawResponse2 = ctx2.llm.messages[ctx2.llm.messages.length - 1].content;

  return parseJson<ArchitecturePlan>(rawResponse2);
}

// 4. Разработчик (Пишет код для ОДНОЙ конкретной задачи)
export async function developerSolve(
  task: DeveloperTask,
  globalStrategy: string,
  parentCtx: ActorContext,
  devId: number
) {
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