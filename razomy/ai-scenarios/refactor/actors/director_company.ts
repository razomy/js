import * as ai from '@razomy/ai';
import * as aiScenarios from "@razomy/ai-scenarios";

export interface ActorContext {
  tool: aiScenarios.refactor.tools.ToolContext;
  llm: ai.AiLlmContext;
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
  const baResult = await aiScenarios.refactor.actors.businessAnalytic(challengePrompt, parentCtx);

  // Шаг 2: Архитектура (создает директорию параллельных задач)
  const archPlan = await aiScenarios.refactor.actors.architecture(baResult, parentCtx);

  console.log(`🚀 Архитектор разбил проект на ${archPlan.tasks.length} параллельных задач.`);

  // Шаг 3: Параллельная разработка (индивидуальная задача для каждого разработчика)
  // Используем Promise.all для одновременного запуска всех разработчиков
  const developerPromises = archPlan.tasks.map((task, index) =>
    aiScenarios.refactor.actors.developerSolve(task, archPlan.globalStrategy, parentCtx, index + 1),
  );

  await Promise.all(developerPromises);

  console.log('✅ Проект успешно завершен!');
}

// 4. Разработчик (Пишет код для ОДНОЙ конкретной задачи)
