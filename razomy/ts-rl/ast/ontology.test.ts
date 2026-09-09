import * as abstracts from '@razomy/abstracts';

describe('Ontology Programming Syntax (Final)', () => {
  it('should parse modern programming DSL with =, == and explicit typing to AST', () => {

    const sourceText =`
// ==========================================
// 1. КОНЦЕПТЫ И СИГНАТУРЫ
// ==========================================
def Предмет
def Дверь < Предмет
def Человек < Существо
def ВходнаяДверь = Дверь
def Джон = Человек

// Модификаторы из коробки
def transitive (что: Предмет) внутри (где: Предмет)
def symmetric (кто: Человек) знаком_с (с_кем: Человек)

// ==========================================
// 2. ВЫВОД И ФАКТЫ (Inference & Facts)
// ==========================================
// Определение переменных 'к' и 'т' происходит в 'def', а используются они в 'if'
def (к: Клиент) имеет_статус VIP
  if (к) купил (т: Товар)
  and (т) цена_выше 100

// ==========================================
// 3. ПРАВИЛА (Rules & ECA)
// ==========================================
on (кто: Человек) открыть (что: Предмет) 
  if (что) заперта 
    - (что) заперта
    + (что) открыта

// 'все' и 'ни_одна' - это кванторы внутри FactPattern
on (кто: Человек) уснуть
  if все (д: Дверь) заперта
  and ни_одна (л: Лампа) включена
    + (кто) спит

// ==========================================
// 4. АГРЕГАЦИИ (Продвинутый матчинг)
// ==========================================
// Явное разделение: вычисляем выражение и сравниваем
on (кто: Игрок) купить (что: Меч)
  if count (м: Монета) внутри (кто) >= 50
    - 50 (м) внутри (кто) 
    + (что) внутри (кто)

// ==========================================
// 5. ИНВАРИАНТЫ (Законы физики/логики)
// ==========================================
// Если это состояние наступает, транзакция графа откатывается.
invariant "Дверь не может быть одновременно открытой и запертой"
  (д: Дверь) открыта
  and (д) заперта

invariant "Баланс не может быть отрицательным у VIP"
  (к: Клиент) баланс_меньше 0
  and (к) имеет_статус VIP

// ==========================================
// 6. ТЕМПОРАЛЬНАЯ ЛОГИКА
// ==========================================
// Используем суффиксы для темпоральных маркеров ('ever', 'past')
on (кто: Человек) войти_в (дом: Дом)
  if (кто) открыть (д: Дверь) [когда_либо]
  and (кто) имел_статус Враг [в_прошлом]
    + (дом) тревога
      `
    // Имитация вызова парсера
    // const ast = myOntologyParser.parse(sourceText);
    console.log(sourceText);


    const expectedAst: (abstracts.translators.ConceptType | abstracts.translators.ClauseType)[] = [

      // ==========================================
      // 1. КОНЦЕПТЫ (Этап компиляции)
      // ==========================================

      // Дверь = extends Предмет;
      // {
      //   kind: 'TaxonomyConcept',
      //   subject: { kind: 'Identifier', name: 'Дверь' },
      //   relation: 'subclass',
      //   base: { kind: 'Identifier', name: 'Предмет' }
      // } satisfies abstracts.translators.TaxonomyConcept,
      //
      // // Джон = instance Человек;
      // {
      //   kind: 'TaxonomyConcept',
      //   subject: { kind: 'Identifier', name: 'Джон' },
      //   relation: 'instance',
      //   base: { kind: 'Identifier', name: 'Человек' }
      // } satisfies abstracts.translators.TaxonomyConcept,
      //
      // // predicate открыть(кто: Человек, что: Предмет);
      // {
      //   kind: 'PredicateConcept',
      //   predicate: { kind: 'Identifier', name: 'открыть' },
      //   roles: [
      //     {
      //       semanticIdentifier: { kind: 'SemanticIdentifier', name: 'кто' },
      //       constraint: { kind: 'Identifier', name: 'Человек' }
      //     },
      //     {
      //       semanticIdentifier: { kind: 'SemanticIdentifier', name: 'что' },
      //       constraint: { kind: 'Identifier', name: 'Предмет' }
      //     }
      //   ]
      // } satisfies abstracts.translators.PredicateConcept,
      //
      // // fact заперта(цель = ВходнаяДверь);
      // {
      //   kind: 'FactConcept',
      //   predicate: { kind: 'Identifier', name: 'заперта' },
      //   isNegative: false,
      //   arguments_: [
      //     {
      //       semanticIdentifier: { kind: 'SemanticIdentifier', name: 'цель' },
      //       // Знак '=' транслируется как передача конкретного объекта через ReferenceExpression
      //       expression: { kind: 'ReferenceExpression', identifier: { kind: 'Identifier', name: 'ВходнаяДверь' } } as abstracts.translators.ReferenceExpression
      //     }
      //   ]
      // } satisfies abstracts.translators.FactConcept,
      //
      // // ==========================================
      // // 2. КЛАУЗЫ (Этап выполнения)
      // // ==========================================
      //
      // // rule instead_of action открыть(кто: Человек, что: Предмет) if fact заперта(цель == что) { ... }
      // {
      //   kind: 'RuleClause',
      //   phase: 'instead_of',
      //
      //   // triggerPattern: action открыть(кто: Человек, что: Предмет)
      //   triggerPattern: {
      //     kind: 'ActionClause',
      //     predicate: { kind: 'Identifier', name: 'открыть' },
      //     arguments_: [
      //       {
      //         role: { kind: 'SemanticIdentifier', name: 'кто' } as any,
      //         // 'кто' здесь выступает как переменная, захватывающая значение.
      //         // В вашем интерфейсе ActionClause value может быть Identifier, что идеально подходит для переменной!
      //         value: { kind: 'Identifier', name: 'кто' }
      //       },
      //       {
      //         role: { kind: 'SemanticIdentifier', name: 'что' } as any,
      //         value: { kind: 'Identifier', name: 'что' } // Переменная 'что'
      //       }
      //     ]
      //   } satisfies abstracts.translators.ActionClause,
      //
      //   // conditions: if fact заперта(цель == что)
      //   conditions: [
      //     {
      //       kind: 'FactConcept',
      //       predicate: { kind: 'Identifier', name: 'заперта' },
      //       isNegative: false,
      //       arguments_: [
      //         {
      //           semanticIdentifier: { kind: 'SemanticIdentifier', name: 'цель' },
      //           // Знак '==' компилируется в то, что мы ищем факт, где выражение совпадает с переменной 'что'
      //           expression: { kind: 'ReferenceExpression', identifier: { kind: 'Identifier', name: 'что' } } as abstracts.translators.ReferenceExpression
      //         }
      //       ]
      //     } satisfies abstracts.translators.FactConcept
      //   ],
      //
      //   blockClause: {
      //     kind: 'BlockClause',
      //     clauses: [
      //       // retract fact заперта(цель=что);
      //       {
      //         kind: 'StateTransitionClause',
      //         operation: 'retract',
      //         fact: {
      //           kind: 'FactConcept',
      //           predicate: { kind: 'Identifier', name: 'заперта' },
      //           isNegative: false,
      //           arguments_: [{
      //             semanticIdentifier: { kind: 'SemanticIdentifier', name: 'цель' },
      //             // Передаем переменную 'что'
      //             expression: { kind: 'ReferenceExpression', identifier: { kind: 'Identifier', name: 'что' } } as abstracts.translators.ReferenceExpression
      //           }]
      //         }
      //       },
      //       // assert fact открыта(цель=что);
      //       {
      //         kind: 'StateTransitionClause',
      //         operation: 'assert',
      //         fact: {
      //           kind: 'FactConcept',
      //           predicate: { kind: 'Identifier', name: 'открыта' },
      //           isNegative: false,
      //           arguments_: [{
      //             semanticIdentifier: { kind: 'SemanticIdentifier', name: 'цель' },
      //             expression: { kind: 'ReferenceExpression', identifier: { kind: 'Identifier', name: 'что' } } as abstracts.translators.ReferenceExpression
      //           }]
      //         }
      //       }
      //     ]
      //   } satisfies abstracts.translators.BlockClause
      // } satisfies abstracts.translators.RuleClause,
      //
      // // action открыть(кто=Джон, что=ВходнаяДверь);
      // {
      //   kind: 'ActionClause',
      //   predicate: { kind: 'Identifier', name: 'открыть' },
      //   arguments_: [
      //     {
      //       role: { kind: 'SemanticIdentifier', name: 'кто' } as any,
      //       // Знак '=' означает передачу значения Джон
      //       value: { kind: 'ReferenceExpression', identifier: { kind: 'Identifier', name: 'Джон' } } as abstracts.translators.ReferenceExpression
      //     },
      //     {
      //       role: { kind: 'SemanticIdentifier', name: 'что' } as any,
      //       value: { kind: 'ReferenceExpression', identifier: { kind: 'Identifier', name: 'ВходнаяДверь' } } as abstracts.translators.ReferenceExpression
      //     }
      //   ]
      // } satisfies abstracts.translators.ActionClause

    ];

    expect(expectedAst.length).toBe(6);
  });
});
