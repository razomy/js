import * as abstracts from '@razomy/abstracts';

/**
 * Имитация таблицы символов (Environment/Scope)
 * Генерирует уникальные ID для строковых идентификаторов.
 */
class SymbolEnvironment {
  private nextId: abstracts.translators.SymbolId = 1;
  private scopes: Map<string, abstracts.translators.SymbolId>[] = [new Map()];

  pushScope() {
    this.scopes.push(new Map());
  }

  popScope() {
    this.scopes.pop();
  }

  define(name: string): abstracts.translators.SymbolId {
    const id = this.nextId++;
    this.scopes[this.scopes.length - 1].set(name, id);
    return id;
  }

  resolve(name: string): abstracts.translators.SymbolId {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].has(name)) {
        return this.scopes[i].get(name)!;
      }
    }
    // Глобальный фолбэк
    const globalId = this.nextId++;
    this.scopes[0].set(name, globalId);
    return globalId;
  }
}

/**
 * Главный класс трансформации
 */
export class SurfaceToTransformerHir {
  private env = new SymbolEnvironment();

  public transform(node: abstracts.translators.AstNode): abstracts.translators.NodeHir {
    if (!node || !node.kind) return {kind: 'UnknownHir'};

    switch (node.kind) {

      // === VALUES & LITERALS ===
      case 'BuildInExpression': {
        const n = node as abstracts.translators.BuildInExpression;
        return {kind: 'LiteralHir', type: n.type, value: n.value} as abstracts.translators.LiteralHir;
      }

      case 'ArrayExpression': {
        const n = node as abstracts.translators.ArrayExpression;
        return {
          kind: 'ArrayHir',
          elements: n.expressions.map(e => this.transform(e))
        } as abstracts.translators.ArrayHir;
      }

      case 'ObjectExpression': {
        const n = node as abstracts.translators.ObjectExpression;
        const properties: Record<string, abstracts.translators.NodeHir> = {};
        n.expressions.forEach(prop => {
          properties[prop.identifier.name] = this.transform(prop.expression);
        });
        return {kind: 'ObjectHir', properties} as abstracts.translators.ObjectHir;
      }

      case 'ReferenceExpression': {
        const n = node as abstracts.translators.ReferenceExpression;
        return {
          kind: 'ReferenceHir',
          target: this.env.resolve(n.identifier.name)
        } as abstracts.translators.ReferenceHir;
      }

      // === OPERATIONS ===
      case 'UnaryExpression': {
        const n = node as abstracts.translators.UnaryExpression;
        return {
          kind: 'UnaryHir',
          operator: n.operator,
          operand: this.transform(n.expression)
        } as abstracts.translators.UnaryHir;
      }

      case 'BinaryExpression': {
        const n = node as abstracts.translators.BinaryExpression;
        return {
          kind: 'BinaryHir',
          operator: n.operator,
          left: this.transform(n.left),
          right: this.transform(n.right)
        } as abstracts.translators.BinaryHir;
      }

      // === FLOW CONTROL: BRANCHING (IF/SWITCH) ===
      case 'IfConditionalFlowExpression':
      case 'IfConditionalFlowStatement': {
        const n = node as abstracts.translators.IfConditionalFlowStatement;
        const branches = n.branches.map(b => ({
          condition: b.pattern ? this.transform(b.pattern) : null,
          body: this.transform(b.block)
        }));
        return {kind: 'IfHir', branches} as abstracts.translators.IfHir;
      }

      case 'SwitchConditionalFlowExpression':
      case 'SwitchConditionalFlowStatement': {
        const n = node as abstracts.translators.SwitchConditionalFlowStatement;
        const cases = n.branches.map(b => ({
          caseValue: b.pattern ? this.transform(b.pattern) : null,
          body: this.transform(b.block)
        }));
        return {kind: 'SwitchHir', target: this.transform(n.target), cases} as abstracts.translators.SwitchHir;
      }

      // === FLOW CONTROL: LOOPS ===
      case 'WhileDoLoopFlowExpression':
      case 'WhileDoLoopFlowStatement': {
        const n = node as abstracts.translators.WhileDoLoopFlowStatement;
        return {
          kind: 'LoopHir',
          loopShape: 'while',
          condition: this.transform(n.condition),
          body: this.transform(n.block)
        } as abstracts.translators.LoopHir;
      }

      case 'DoWhileLoopFlowExpression':
      case 'DoWhileLoopFlowStatement': {
        const n = node as abstracts.translators.DoWhileLoopFlowStatement;
        return {
          kind: 'LoopHir',
          loopShape: 'do_while',
          condition: this.transform(n.condition),
          body: this.transform(n.block)
        } as abstracts.translators.LoopHir;
      }

      case 'ForInLoopFlowExpression':
      case 'ForInLoopFlowStatement': {
        const n = node as abstracts.translators.ForInLoopFlowStatement;
        return {
          kind: 'LoopHir',
          loopShape: 'for_in',
          init: this.transform(n.init),
          body: this.transform(n.block)
        } as abstracts.translators.LoopHir;
      }

      case 'ForOfLoopFlowExpression':
      case 'ForOfLoopFlowStatement': {
        const n = node as abstracts.translators.ForOfLoopFlowStatement;
        return {
          kind: 'LoopHir',
          loopShape: 'for_of',
          init: this.transform(n.init),
          body: this.transform(n.block)
        } as abstracts.translators.LoopHir;
      }

      case 'ForItLoopFlowExpression':
      case 'ForItLoopFlowStatement': {
        const n = node as abstracts.translators.ForItLoopFlowStatement;
        return {
          kind: 'LoopHir',
          loopShape: 'for_it',
          init: n.init ? this.transform(n.init) : undefined,
          condition: n.condition ? this.transform(n.condition) : undefined,
          update: n.update ? this.transform(n.update) : undefined,
          body: this.transform(n.block)
        } as abstracts.translators.LoopHir;
      }

      // === CALLS & MEMBER ACCESS ===
      case 'CallExpression': {
        const n = node as abstracts.translators.CallExpression;
        const callee = n.identifier
          ? {kind: 'ReferenceHir', target: this.env.resolve(n.identifier.name)} as abstracts.translators.ReferenceHir
          : {kind: 'LiteralHir', value: null} as abstracts.translators.LiteralHir;
        return {
          kind: 'CallHir',
          callee,
          args: n.arguments_.map(a => this.transform(a))
        } as abstracts.translators.CallHir;
      }

      case 'MemberExpression': {
        const n = node as abstracts.translators.MemberExpression;
        return {
          kind: 'MemberAccessHir',
          object_: this.transform(n.object_),
          property: this.transform(n.property)
        } as abstracts.translators.MemberAccessHir;
      }

      // === BLOCKS & JUMPS ===
      case 'BlockStatement': {
        const n = node as abstracts.translators.BlockStatement;
        this.env.pushScope();
        const statements = n.declarations.map(d => this.transform(d));
        this.env.popScope();
        return {kind: 'BlockHir', statements} as abstracts.translators.BlockHir;
      }

      case 'ReturnStatement': {
        const n = node as abstracts.translators.ReturnStatement;
        return {
          kind: 'ReturnHir',
          value: n.argument ? this.transform(n.argument) : null
        } as abstracts.translators.ReturnHir;
      }

      case 'BreakGoStatement': {
        const n = node as abstracts.translators.BreakGoStatement;
        return {
          kind: 'BreakHir',
          targetLoopSymbol: n.labelIdentifier ? this.env.resolve(n.labelIdentifier.name) : undefined
        } as abstracts.translators.BreakHir;
      }

      case 'ContinueGoStatement': {
        const n = node as abstracts.translators.ContinueGoStatement;
        return {
          kind: 'ContinueHir',
          targetLoopSymbol: n.labelIdentifier ? this.env.resolve(n.labelIdentifier.name) : undefined
        } as abstracts.translators.ContinueHir;
      }

      // === ERROR HANDLING ===
      case 'TryStatement': {
        const n = node as abstracts.translators.TryStatement;
        const tryBlock = this.transform(n.block) as abstracts.translators.BlockHir;
        const catches = n.catches.map(c => {
          this.env.pushScope();
          const errorSymbol = this.env.define(c.trigger.identifier.name);
          const catchBlock = this.transform(c.block) as abstracts.translators.BlockHir;
          this.env.popScope();
          return {errorSymbol, catchBlock};
        });
        return {kind: 'TryCatchHir', tryBlock, catches} as abstracts.translators.TryCatchHir;
      }

      case 'ThrowStatement': {
        const n = node as abstracts.translators.ThrowStatement;
        return {kind: 'ThrowHir', value: this.transform(n.argument)} as abstracts.translators.ThrowHir;
      }

      // === BINDINGS (DECLARATIONS) ===
      case 'VariableBinding': {
        const n = node as abstracts.translators.VariableBinding;
        const symbolId = this.env.define(n.identifier.name);
        return {
          kind: 'BindingHir',
          symbol: symbolId,
          isShapeLevel: false,
          value: this.transform(n.expression)
        } as abstracts.translators.BindingHir;
      }

      case 'AssignBinding': {
        const n = node as abstracts.translators.AssignBinding;
        const targetSymbol = this.env.resolve(n.identifier.name);
        return {
          kind: 'AssignHir',
          target: targetSymbol,
          value: this.transform(n.expression)
        } as abstracts.translators.AssignHir;
      }

      case 'FunctionBinding': {
        const n = node as abstracts.translators.FunctionBinding;
        const symbolId = this.env.define(n.identifier.name);

        this.env.pushScope(); // Scope для параметров функции
        const params = n.parameters.map(p => this.env.define(p.identifier.name));
        const body = this.transform(n.block);
        this.env.popScope();

        const funcNode = {kind: 'FunctionHir', params, body} as abstracts.translators.FunctionHir;
        return {
          kind: 'BindingHir',
          symbol: symbolId,
          isShapeLevel: false,
          value: funcNode
        } as abstracts.translators.BindingHir;
      }

      case 'ClassBinding': {
        const n = node as abstracts.translators.ClassBinding;
        const classSymbol = this.env.define(n.identifier.name);

        this.env.pushScope(); // Scope свойств и методов класса
        const properties = n.properties.map(p => this.transform(p) as abstracts.translators.BindingHir);
        const methods = n.methods.map(m => this.transform(m) as abstracts.translators.BindingHir);
        this.env.popScope();

        const classNode = {kind: 'ClassHir', name: classSymbol, properties, methods} as abstracts.translators.ClassHir;
        return {
          kind: 'BindingHir',
          symbol: classSymbol,
          isShapeLevel: false,
          value: classNode
        } as abstracts.translators.BindingHir;
      }

      case 'PropertyBinding': {
        const n = node as abstracts.translators.PropertyBinding;
        const propSymbol = this.env.define(n.identifier.name);
        const value = n.expression ? this.transform(n.expression) : null;
        return {kind: 'BindingHir', symbol: propSymbol, isShapeLevel: false, value} as abstracts.translators.BindingHir;
      }

      // === SHAPES (TYPE DEFINITIONS) ===
      case 'AliasShapeBinding': {
        const n = node as abstracts.translators.AliasShapeBinding;
        const typeSymbol = this.env.define(n.shapeIdentifier.name);
        // В HIR типы становятся просто узлами с флагоm isShapeLevel
        const typeNode = {
          kind: 'ShapeDefinitionHir',
          baseShape: n.shape.kind
        } as abstracts.translators.ShapeDefinitionHir;
        return {
          kind: 'BindingHir',
          symbol: typeSymbol,
          isShapeLevel: true,
          value: typeNode
        } as abstracts.translators.BindingHir;
      }

      case 'InterfaceShapeBinding': {
        const n = node as abstracts.translators.InterfaceShapeBinding;
        const ifaceSymbol = this.env.define(n.shapeIdentifier.name);

        this.env.pushScope();
        // Внутренности интерфейса могут быть отрендерены как объект свойств
        const props = n.properties.map(p => {
          const sym = this.env.define(p.shapeIdentifier.name);
          return {
            kind: 'BindingHir',
            symbol: sym,
            isShapeLevel: true,
            value: {kind: 'ShapeDefinitionHir', baseShape: p.shape.kind}
          } as abstracts.translators.BindingHir;
        });
        this.env.popScope();

        const ifaceNode = {
          kind: 'ShapeDefinitionHir',
          baseShape: 'Interface',
          typeArguments: props
        } as abstracts.translators.ShapeDefinitionHir;
        return {
          kind: 'BindingHir',
          symbol: ifaceSymbol,
          isShapeLevel: true,
          value: ifaceNode
        } as abstracts.translators.BindingHir;
      }

      // === ONTOLOGY & MODULES (Fallback to generic mappings) ===
      case 'ModuleBinding':
      case 'PackageBinding': {
        const n = node as any; // generic module handling
        const modSymbol = this.env.define(n.identifier.name);
        const block = this.transform(n.block);
        return {
          kind: 'BindingHir',
          symbol: modSymbol,
          isShapeLevel: false,
          value: block
        } as abstracts.translators.BindingHir;
      }

      default:
        // Если узел не подошел (например, специфичные онтологические концепты),
        // возвращаем Unknown, чтобы не ломать дерево и сохранить обход
        console.warn(`[Transformer] Unhandled node kind: ${node.kind}`);
        return {kind: `UnknownHir_${node.kind}`} as abstracts.translators.NodeHir;
    }
  }

  private transformShape(node: abstracts.translators.AstNode): abstracts.translators.CoreShapeHir {
    switch (node.kind) {

      // 1. Примитивы
      case 'BuildInShape': {
        const n = node as abstracts.translators.BuildInShape;
        const map: Record<string, abstracts.translators.ShapePrimitiveHir['primitive']> = {
          'String': 'string', 'Number': 'float', 'Boolean': 'boolean',
          'Null': 'null', 'Undefined': 'undefined', 'Void': 'void', 'Any': 'any'
        };
        return {kind: 'ShapePrimitiveHir', isShapeLevel: true, primitive: map[n.type] || 'any'};
      }

      // 2. Ссылки на типы
      case 'ReferenceShape':
      case 'ShapeIdentifier': {
        const n = node as abstracts.translators.ShapeIdentifier;
        // В продвинутом компиляторе мы бы здесь проверили, что символ существует
        // и является типом.
        return {
          kind: 'ShapeReferenceHir',
          isShapeLevel: true,
          targetSymbol: this.env.resolve(n.name)
        };
      }

      // 3. Объекты (Превращаем в Struct)
      case 'ObjectShape': {
        const n = node as abstracts.translators.ObjectShape;
        const fields: Record<abstracts.translators.SymbolId, abstracts.translators.CoreShapeHir> = {};

        n.properties.forEach(prop => {
          const propId = this.env.define(prop.shapeIdentifier.name);
          fields[propId] = this.transformShape(prop.shape);
        });

        return {kind: 'ShapeStructHir', isShapeLevel: true, fields};
      }

      // 4. Массивы и Тьюплы
      case 'ArrayShape': {
        const n = node as abstracts.translators.ArrayShape;
        if (n.type === 'Tuple') {
          return {
            kind: 'ShapeTupleHir',
            isShapeLevel: true,
            elements: n.shapes.map(s => this.transformShape(s))
          };
        } else {
          return {
            kind: 'ShapeArrayHir',
            isShapeLevel: true,
            elementShape: this.transformShape(n.shapes[0])
          };
        }
      }

      // 5. Функции
      case 'FunctionShape': {
        const n = node as abstracts.translators.FunctionShape;
        return {
          kind: 'ShapeFunctionHir',
          isShapeLevel: true,
          parameters: n.parameters.map(p => this.transformShape(p.shape)),
          returnShape: n.return_ ? this.transformShape(n.return_.shape) : {
            kind: 'ShapePrimitiveHir',
            isShapeLevel: true,
          }
        };
      }

      // 6. Union (A | B)
      case 'UnionShape': {
        const n = node as abstracts.translators.UnionShape;
        return {
          kind: 'ShapeUnionHir',
          isShapeLevel: true,
          variants: n.shapes.map(s => this.transformShape(s))
        };
      }

      // ==========================================
      // 7. СЛОЖНАЯ ЛОГИКА ДЕШУГАРИНГА (Flattening)
      // ==========================================

      case 'IntersectionShape': {
        const n = node as abstracts.translators.IntersectionShape;
        // ИДЕЯ ДЕШУГАРИНГА: Мы не создаем узел Intersection.
        // Мы вычисляем плоскую структуру прямо здесь.
        const flatFields: Record<abstracts.translators.SymbolId, abstracts.translators.CoreShapeHir> = {};

        for (const shape of n.shapes) {
          // Рекурсивно вычисляем форму до Struct
          const resolvedShape = this.resolveToStruct(shape);
          // Сливаем поля в плоскую структуру
          Object.assign(flatFields, resolvedShape.fields);
        }

        // Возвращаем просто Struct. Сахара больше нет.
        return {kind: 'ShapeStructHir', isShapeLevel: true, fields: flatFields};
      }

      case 'ClassBinding':
      case 'InterfaceShapeBinding': {
        // Класс/Интерфейс в мире типов — это просто Struct.
        // Если у него есть extends_, мы должны "развернуть" родителей
        // и скопировать их поля в этот Struct (как в IntersectionShape).
        const n = node as abstracts.translators.ClassBinding | abstracts.translators.InterfaceShapeBinding;
        const flatFields: Record<abstracts.translators.SymbolId, abstracts.translators.CoreShapeHir> = {};

        // Разворачиваем наследование (extends)
        if (n.extends_ && n.extends_.length > 0) {
          for (const ext of n.extends_) {
            const parentStruct = this.resolveToStruct(ext);
            Object.assign(flatFields, parentStruct.fields);
          }
        }

        // Добавляем собственные поля
        n.properties.forEach(p => {
          // property binding or property shape logic
          const name = (p as any).identifier ? (p as any).identifier.name : (p as any).shapeIdentifier.name;
          const propId = this.env.define(name);
          flatFields[propId] = this.transformShape((p as any).shape || (p as any).expression);
        });

        return {kind: 'ShapeStructHir', isShapeLevel: true, fields: flatFields};
      }

      default:
        return {kind: 'ShapePrimitiveHir', isShapeLevel: true, primitive: 'any'};
    }
  }

  /**
   * Вспомогательный метод для Shape Resolution.
   * Пытается привести любой тип (Reference, Intersection) к физической структуре.
   */
  private resolveToStruct(shape: abstracts.translators.AstNode): abstracts.translators.ShapeStructHir {
    const coreShape = this.transformShape(shape);

    if (coreShape.kind === 'ShapeStructHir') {
      return coreShape;
    } else if (coreShape.kind === 'ShapeReferenceHir') {
      // В реальном компиляторе мы бы пошли в таблицу символов (env),
      // достали бы BindingHir по `coreShape.targetSymbol` и вернули бы его `value`.
      // Пока возвращаем пустую структуру заглушку.
      return {kind: 'ShapeStructHir', isShapeLevel: true, fields: {}};
    }

    throw new Error(`Cannot resolve ${shape.kind} to a Struct`);
  }
}
