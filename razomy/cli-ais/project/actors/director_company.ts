import {type ToolContext} from '../tools/execute_tool_mut';
import type {LlmContext} from '../llms/must_use_tool_llm_exception';
import {developerSolve} from './developer_solve';
import {businessAnalytic} from "./business_analytic";
import {architecture} from "./architecture";

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

// 4. Разработчик (Пишет код для ОДНОЙ конкретной задачи)
