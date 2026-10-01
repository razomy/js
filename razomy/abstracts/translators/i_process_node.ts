import * as abstracts from '@razomy/abstracts';

// region 0. FOUNDATION & POLICIES

/**
 * Базовый контракт сущности модели процесса.
 * Исключает визуальные координаты (BPMNDI) — логика исполнения отделена от рендеринга.
 *
 * @replaces bpmn:BaseElement
 * @replaces bpmn:FlowNode (без привязки к визуальным координатам BPMNDI)
 */
export interface IProcessNode extends abstracts.patterns.IEntity {
  /** Уникальный идентификатор узла в рамках схемы */
  id: string;
  /** Дискриминатор типа сущности для сериализации, парсинга и type narrowing */
  kind: string;
  /** Человекочитаемое имя узла */
  name?: string;
  /** Развернутое описание назначения узла */
  description?: string;
}

/**
 * Политика циклов и параллелизма (Multi-Instance / Loop).
 *
 * @replaces bpmn:StandardLoopCharacteristics (для type: 'while')
 * @replaces bpmn:MultiInstanceLoopCharacteristics (для type: 'parallel' | 'sequential')
 */
export interface IterationPolicyPn {
  /**
   * Тип итерации: параллельно по коллекции, последовательно, либо цикл do-while
   * @replaces bpmn:MultiInstanceLoopCharacteristics @isSequential="false" (parallel)
   * @replaces bpmn:MultiInstanceLoopCharacteristics @isSequential="true" (sequential)
   * @replaces bpmn:StandardLoopCharacteristics (while)
   */
  type: 'parallel' | 'sequential' | 'while';

  /**
   * JSON-путь коллекции для обхода, либо предикат для while-цикла
   * @replaces bpmn:loopDataInputRef (путь к коллекции)
   * @replaces bpmn:loopCardinality (размер выборки)
   * @replaces bpmn:loopCondition (предикат цикла)
   */
  collectionOrCondition: string;

  /**
   * Имя локальной переменной (алиас) текущего элемента в теле итерации
   * @replaces bpmn:inputDataItem (имя переменной итератора)
   */
  itemAlias?: string;

  /**
   * Условие раннего прерывания итерации (например, "approvedCount >= 3")
   * @replaces bpmn:completionCondition (кворум/ранний выход из параллельного цикла)
   */
  completionGuard?: string;
}

/**
 * Политика повторных попыток при сбоях (Fault Tolerance).
 *
 * @replaces camunda:failedJobRetryTimeCycle (интервалы перезапуска задач)
 * @replaces zeebe:retry (число ретраев и задержки)
 */
export interface RetryPolicyPn {
  /** Максимальное количество попыток (0 = без повторов) */
  maxAttempts: number;
  /** Базовый интервал между попытками в ISO-8601 (например, "PT5S") */
  interval: string;
  /** Множитель экспоненциального нарастания задержки (Backoff) */
  backoffMultiplier?: number;
  /** Ограничение типов ошибок, для которых применяется ретрай (опционально) */
  retryableErrors?: string[];
}

// endregion

// region 1. CONTEXT & DATA (ДАННЫЕ И СОСТОЯНИЕ)

/**
 * Поименованный слот данных, переменная контекста или внешнее хранилище.
 * ВАЖНО: Не является узлом графа потока управления (нельзя провести Transition в DataSlot).
 *
 * @replaces bpmn:DataObject
 * @replaces bpmn:DataObjectReference
 * @replaces bpmn:DataStore
 * @replaces bpmn:DataStoreReference (при type: 'store', isPersistent: true)
 * @replaces bpmn:Property (переменная процесса или скоупа)
 * @replaces bpmn:DataInput / bpmn:DataOutput
 */
export interface DataSlotPn extends IProcessNode {
  kind: 'DataSlotPn';
  /** Тип ресурса: локальная переменная скоупа или внешняя БД/Store */
  type: 'variable' | 'store';
  /** Значение по умолчанию (инициализация) */
  defaultValue?: any;
  /** Флаг, требующий сохранения значения между перезапусками процесса */
  isPersistent?: boolean;
}

/**
 * Декларативное правило проекции и мутации данных между узлами.
 *
 * @replaces bpmn:DataInputAssociation
 * @replaces bpmn:DataOutputAssociation
 * @replaces bpmn:Assignment
 * @replaces camunda:inputParameter / camunda:outputParameter
 * @replaces camunda:in / camunda:out (передача данных в подпроцесс)
 */
export interface DataMappingPn {
  /** Тип источника: извлечение по пути или хардкод значения */
  sourceType: 'path' | 'literal' | 'expression';
  /** JSON-путь в источнике (если path), само значение (если literal), или код (если expression) */
  source: string | any;
  /** JSON-путь во входящем контексте узла-назначения */
  targetPath: string;
  /** Стратегия применения: перезаписать поле или слить объекты (merge) */
  strategy?: 'replace' | 'merge';
}

// endregion

// region 2. TOPOLOGY (РЕБРА)

/**
 * Направленный переход потока управления (Control Flow).
 *
 * @replaces bpmn:SequenceFlow
 * @replaces bpmn:MessageFlow (если переход соединяет узлы из разных Scope/Role)
 * @replaces bpmn:Association (для ассоциации данных при наличии поля mapping)
 */
export interface TransitionPn extends IProcessNode {
  kind: 'TransitionPn';
  /** Исходная вершина графа */
  source: abstracts.patterns.IdRef<FlowNodePn>;
  /** Целевая вершина графа */
  target: abstracts.patterns.IdRef<FlowNodePn>;
  /**
   * Логическое условие перехода (Guard expression, e.g. "order.total > 100")
   * @replaces bpmn:conditionExpression (условный SequenceFlow с ромбом)
   */
  guard?: string;
  /**
   * Флаг ветки по умолчанию (выбирается, если все остальные guard == false)
   * @replaces bpmn:Activity @default / bpmn:Gateway @default (ветка с косой чертой)
   */
  isDefault?: boolean;
  /**
   * Пайплайн данных. Если определен — мутирует контекст при переходе.
   * @replaces bpmn:DataOutputAssociation на ребре перехода
   */
  mapping?: DataMappingPn[];
}

// endregion

// region 3. EXECUTION (АТОМАРНЫЕ ШАГИ И ЗАДАЧИ)

/**
 * Исполнитель шага.
 *
 * @replaces bpmn:UserTask (human)
 * @replaces bpmn:ManualTask (human)
 * @replaces bpmn:ServiceTask (service)
 * @replaces bpmn:SendTask / bpmn:ReceiveTask (service)
 * @replaces bpmn:ScriptTask (script)
 * @replaces bpmn:BusinessRuleTask (rule)
 */
export type ExecutionActor =
  | 'human'     // Пользовательская задача / UI форма (Manual / User Task)
  | 'service'   // Внешний воркер, микросервис, REST, gRPC (Service Task)
  | 'script'    // Быстрый in-memory скрипт без ожидания (Script Task)
  | 'rule';     // Бизнес-правило, DMN таблица (Business Rule Task)

/**
 * Атомарная единица работы (Task / Step).
 *
 * @replaces bpmn:Task (базовый тип задачи)
 * @replaces bpmn:UserTask (actor: 'human', action = FormKey / UI-schema)
 * @replaces bpmn:ServiceTask (actor: 'service', action = Delegate / Topic / URL)
 * @replaces bpmn:ScriptTask (actor: 'script', action = Script / Code)
 * @replaces bpmn:BusinessRuleTask (actor: 'rule', action = DMN Decision Key)
 * @replaces bpmn:ManualTask (actor: 'human', action = Instruction)
 * @replaces bpmn:SendTask (actor: 'service', отправка внешнего сообщения)
 * @replaces bpmn:ReceiveTask (активность ожидания; также выражается через EventPn)
 */
export interface StepPn extends IProcessNode {
  kind: 'StepPn';
  /** Тип исполнителя (кто или что выполняет задачу) */
  actor: ExecutionActor;
  /** Системный идентификатор действия (топик в Kafka, URL, DMN-key) */
  action: string;
  /**
   * Статические параметры или маппинг на входе в задачу
   * @replaces bpmn:ioSpecification / bpmn:dataInputAssociation
   */
  input?: DataMappingPn[];
  /**
   * Максимальное время на выполнение шага (ISO-8601, "PT30M")
   * @replaces bpmn:TimerBoundaryEvent (таймаут выполнения задачи)
   */
  timeout?: string;
  /** Политика автоматических перезапусков при сбоях */
  retry?: RetryPolicyPn;
  /**
   * Запуск нескольких экземпляров задачи (Multi-instance / Map State)
   * @replaces bpmn:MultiInstanceLoopCharacteristics
   */
  iteration?: IterationPolicyPn;
  /**
   * Граничные перехватчики (таймауты, бизнес-ошибки)
   * @replaces bpmn:BoundaryEvent (прикрепленные к границе задачи)
   */
  traps?: TrapPn[];
  /**
   * Ссылка на узел отката (Saga / Compensation). Может быть шагом или целым Scope
   * @replaces bpmn:CompensationBoundaryEvent + bpmn:Association к компенсирующей таске
   * @replaces bpmn:Activity @isForCompensation="true"
   */
  compensationRef?: abstracts.patterns.IdRef<FlowNodePn>;
}

// endregion

// region 4. EVENTS & INTERCEPTION (СОБЫТИЯ И ЛОВУШКИ)

/**
 * Канал природы события.
 *
 * @replaces bpmn:NoneEventDefinition ('none')
 * @replaces bpmn:TimerEventDefinition ('time')
 * @replaces bpmn:MessageEventDefinition ('message')
 * @replaces bpmn:ErrorEventDefinition ('error')
 * @replaces bpmn:SignalEventDefinition ('signal')
 * @replaces bpmn:TerminateEventDefinition ('terminate')
 * @replaces bpmn:EscalationEventDefinition ('escalation')
 * @replaces bpmn:CompensateEventDefinition ('compensate')
 * @replaces bpmn:ConditionalEventDefinition (выражается через channel: 'signal' + spec)
 * @replaces bpmn:CancelEventDefinition (специфичный для транзакций, выражается через 'error' / 'compensate')
 */
export type EventChannel =
  | 'none'        // Пустое событие (Blank Start / End)
  | 'time'        // Таймер (ISO Duration, Date, Cron)
  | 'message'     // Сообщение с полезной нагрузкой (извне)
  | 'error'       // Исключительная ситуация (ошибка исполнения/бизнеса)
  | 'signal'      // Внутренний Pub/Sub броадкаст
  | 'terminate'   // Жесткое завершение потока/процесса
  | 'escalation'  // Эскалация (непрерывающее оповещение наверх)
  | 'compensate'; // Команда на запуск компенсаций

/**
 * Точка ожидания, публикации или старта событий.
 * Унифицирует Start, End и Intermediate события BPMN.
 *
 * @replaces bpmn:StartEvent (direction: 'catch', isInitial: true)
 * @replaces bpmn:EndEvent (direction: 'throw')
 * @replaces bpmn:IntermediateCatchEvent (direction: 'catch', isInitial: false)
 * @replaces bpmn:IntermediateThrowEvent (direction: 'throw')
 * @replaces bpmn:LinkIntermediateEvent (выражается парой throw/catch с channel: 'signal' или как Transition)
 */
export interface EventPn extends IProcessNode {
  kind: 'EventPn';
  /** Ожидание события (catch) или его генерация (throw) */
  direction: 'catch' | 'throw';
  /** Канал природы события */
  channel: EventChannel;
  /** Является ли событие точкой входа (Start Event) */
  isInitial?: boolean;
  /** Спецификация канала: CRON-выражение, имя топика, код ошибки */
  spec?: string;
}

/**
 * Граничный перехватчик (Boundary Event) для StepPn или ScopePn.
 * Позволяет реагировать на события во время выполнения узла-владельца.
 *
 * @replaces bpmn:BoundaryEvent
 * @replaces bpmn:BoundaryEvent @cancelActivity="true" (interrupts: true)
 * @replaces bpmn:BoundaryEvent @cancelActivity="false" (interrupts: false, не прерывающий)
 */
export interface TrapPn {
  /** Ловимый канал (обычно 'time', 'error', 'message', 'escalation') */
  channel: EventChannel;
  /** Код ошибки или спецификация таймера */
  spec?: string;
  /** true = прерывает выполнение владельца; false = запускает параллельный поток */
  interrupts: boolean;
  /** Целевой узел, куда передается управление при срабатывании ловушки */
  target: abstracts.patterns.IdRef<FlowNodePn>;
}

// endregion

// region 5. ROUTING (ШЛЮЗЫ)

export type JoinStrategy = 'all' | 'one' | 'any';
export type ForkStrategy = 'all' | 'one' | 'any' | 'race';

/**
 * Узел управления потоками (Gateway).
 * Разделяет логику схождения (Converging) и расхождения (Diverging).
 *
 * @replaces bpmn:ExclusiveGateway (join: 'one', fork: 'one')
 * @replaces bpmn:ParallelGateway (join: 'all', fork: 'all')
 * @replaces bpmn:InclusiveGateway (join: 'any', fork: 'any')
 * @replaces bpmn:EventBasedGateway (fork: 'race')
 * @replaces bpmn:ComplexGateway (произвольные комбинации join/fork)
 */
export interface RouterPn extends IProcessNode {
  kind: 'RouterPn';
  /**
   * Стратегия ожидания входящих токенов (Join / Merge)
   * @replaces bpmn:GatewayDirection="Converging"
   */
  join?: JoinStrategy;
  /**
   * Стратегия распределения исходящих токенов (Fork / Split)
   * @replaces bpmn:GatewayDirection="Diverging"
   */
  fork?: ForkStrategy;
}

// endregion

// region 6. COMPOSITION & SCOPES (ФРАКТАЛЬНЫЙ КОНТЕЙНЕР)

/**
 * Фрактальный контейнер, формирующий изолированный контекст исполнения.
 * Заменяет Root Process, SubProcess, Lane (через role) и Transaction.
 *
 * @replaces bpmn:Process (корневой скоуп верхнего уровня)
 * @replaces bpmn:SubProcess (встроенный вложенный подпроцесс)
 * @replaces bpmn:Transaction (при isTransactional: true)
 * @replaces bpmn:CallActivity (при наличии externalRef)
 * @replaces bpmn:EventSubProcess (скоуп без входящих Transition, запускаемый через traps)
 * @replaces bpmn:AdHocSubProcess
 * @replaces bpmn:Lane / bpmn:Pool / bpmn:Participant (выражаются через поле role)
 */
export interface ScopePn extends IProcessNode {
  kind: 'ScopePn';
  /**
   * Зона ответственности (роль, сервис, отдел) — замена Swimlanes
   * @replaces bpmn:Lane @name / bpmn:Participant @name
   */
  role?: string;
  /**
   * Флаг Saga/Транзакции (автоматически вызывает компенсации при ошибках)
   * @replaces bpmn:Transaction
   */
  isTransactional?: boolean;
  /**
   * Делегирование выполнения во внешний независимый процесс (Call Activity)
   * @replaces bpmn:CallActivity @calledElement
   */
  externalRef?: string;
  /**
   * Граничные перехватчики (действуют на все узлы внутри скоупа)
   * @replaces bpmn:BoundaryEvent на границе SubProcess
   */
  traps?: TrapPn[];
  /**
   * Локальные переменные и хранилища (Контекст данных скоупа)
   * @replaces bpmn:Process/bpmn:SubProcess -> bpmn:Property
   */
  variables?: DataSlotPn[];
  /**
   * Дочерние исполняемые узлы потока
   * @replaces bpmn:Process/bpmn:SubProcess -> bpmn:flowElement
   */
  children: FlowNodePn[];
  /**
   * Ребра потока управления между дочерними узлами
   * @replaces bpmn:Process/bpmn:SubProcess -> bpmn:sequenceFlow
   */
  transitions: TransitionPn[];
}

// endregion

// region 7. UNIFIED NODE TYPE

/**
 * Исполняемая вершина графа (Control Flow Node).
 * ВАЖНО: DataSlotPn исключен отсюда, так как является ресурсом контекста, а не узлом графа.
 *
 * @replaces bpmn:FlowNode (объединение всех исполняемых элементов)
 */
export type FlowNodePn =
  | StepPn
  | EventPn
  | RouterPn
  | ScopePn;

// endregion
