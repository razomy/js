// То, как факт хранится в памяти движка
interface RuntimeFact {
  predicate: string; // "заперта", "открыть", "внутри"
  args: Record<string, string | number>; // роли: { theme: 'ВходнаяДверь' }
}

class KnowledgeGraph {
  public facts: RuntimeFact[] = [];

  // Добавить факт (+)
  assert(predicate: string, args: Record<string, any>) {
    this.facts.push({predicate, args});
  }

  // Удалить факт (-)
  retract(predicate: string, args: Record<string, any>) {
    this.facts = this.facts.filter(f =>
      !(f.predicate === predicate && this.deepEqual(f.args, args))
    );
  }

  deepEqual<T>(actual: T, expected: T): void {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(`\nAssertion Failed:\nExpected: ${expectedStr}\nReceived: ${actualStr}`);
    }
  }
}

type Context = Record<string, any>;

class QueryEngine {
  constructor(private graph: KnowledgeGraph) {
  }

  /**
   * Ищет факты по шаблону. Возвращает массив возможных контекстов.
   */
  match(
    patternPred: string,            // "заперта"
    patternArgs: Record<string, string>, // { theme: "?что" } (переменные начинаем с "?")
    currentContext: Context
  ): Context[] {
    const results: Context[] = [];

    // Перебираем все факты в базе
    for (const fact of this.graph.facts) {
      if (fact.predicate !== patternPred) continue;

      let isMatch = true;
      let newContext = {...currentContext};

      // Проверяем аргументы факта
      for (const [role, value] of Object.entries(patternArgs)) {
        if (value.startsWith('?')) {
          const varName = value.substring(1); // "?что" -> "что"

          // Если переменная уже привязана к чему-то (например, мы ищем "что" = ВходнаяДверь)
          if (newContext[varName]) {
            if (newContext[varName] !== fact.args[role]) {
              isMatch = false;
              break; // Противоречие!
            }
          } else {
            // Если переменная свободна, биндим её к факту!
            newContext[varName] = fact.args[role];
          }
        } else {
          // Хардкод значение (например число 100)
          if (value !== fact.args[role]) {
            isMatch = false;
            break;
          }
        }
      }

      if (isMatch) results.push(newContext);
    }

    return results;
  }
}


class RuleEngine {
  constructor(
    private graph: KnowledgeGraph,
    private query: QueryEngine,
    private rulesAST: any[] // Загруженные 'on' правила из твоего AST
  ) {
  }

  // Выполняем действие (do)
  dispatchAction(actionPred: string, actionArgs: Record<string, string>) {
    // 1. Ищем правила, которые реагируют на это действие
    for (const rule of this.rulesAST) {
      if (rule.trigger.predicate !== actionPred) continue;

      // 2. Матчим триггер (кто: Джон, что: ВходнаяДверь) -> создаем начальный контекст
      let contexts = this.query.match(
        rule.trigger.predicate,
        rule.trigger.args,
        {}
      );

      // Если контекст пустой, значит триггер не подошел
      if (contexts.length === 0) continue;

      // 3. Проверяем условия (if) для каждого найденного контекста
      for (const condition of rule.conditions) {
        let newContexts: Context[] = [];

        // Datalog cascading: каждое условие расширяет варианты
        for (const ctx of contexts) {
          const matches = this.query.match(condition.predicate, condition.args, ctx);
          newContexts.push(...matches);
        }
        contexts = newContexts; // Обновляем возможные варианты
      }

      // 4. Применяем мутации (+/-) для всех выживших контекстов
      for (const validCtx of contexts) {
        for (const mutation of rule.mutations) {
          // Заменяем переменные "?что" на реальные значения ("ВходнаяДверь")
          const resolvedArgs = this.resolveArgs(mutation.args, validCtx);

          if (mutation.operation === 'assert') {
            this.graph.assert(mutation.predicate, resolvedArgs);
            console.log(`+ Добавлен факт: ${mutation.predicate}`, resolvedArgs);
          } else if (mutation.operation === 'retract') {
            this.graph.retract(mutation.predicate, resolvedArgs);
            console.log(`- Удален факт: ${mutation.predicate}`, resolvedArgs);
          }
        }
      }
    }
  }

  // Вспомогательная: подставляет значения из { что: "ВходнаяДверь" } в аргументы мутации
  private resolveArgs(args: Record<string, string>, ctx: Context) {
    const resolved: Record<string, any> = {};
    for (const [k, v] of Object.entries(args)) {
      resolved[k] = v.startsWith('?') ? ctx[v.substring(1)] : v;
    }
    return resolved;
  }
}

function example() {

  const graph = new KnowledgeGraph();
  const query = new QueryEngine(graph);

// Инициализация базы знаний (Из AST 'fact')
  graph.assert("заперта", {theme: "ВходнаяДверь"});
  graph.assert("тип", {subject: "ВходнаяДверь", object: "Дверь"});

// Настраиваем движок
  const rulesAst = [
    {
      trigger: {predicate: "открыть", args: {actor: "?кто", theme: "?что"}},
      conditions: [
        {predicate: "заперта", args: {theme: "?что"}}
      ],
      mutations: [
        {operation: "retract", predicate: "заперта", args: {theme: "?что"}},
        {operation: "assert", predicate: "открыта", args: {theme: "?что"}}
      ]
    }
  ];

  const engine = new RuleEngine(graph, query, rulesAst);

// ИГРОК ДЕЛАЕТ ДЕЙСТВИЕ
  engine.dispatchAction("открыть", {actor: "Джон", theme: "ВходнаяДверь"});

// В консоли будет:
// - Удален факт: заперта { theme: 'ВходнаяДверь' }
// + Добавлен факт: открыта { theme: 'ВходнаяДверь' }
}
