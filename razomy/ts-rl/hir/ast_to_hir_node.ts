import * as abstracts from "@razomy/abstracts";
import * as random from "@razomy/random";

/**
 * Строгое извлечение базовых полей. Теперь не генерирует ID (это делает индексатор).
 */
function getBase(
  node: abstracts.translators.AstType,
) {
  return {
    id: random.createUuid(),
    syntaxLayer: node.syntaxLayer,
    semanticLayer: 'semanticLayer' in node ? node.semanticLayer : 1,
    prev: null,
    next: null,
    parent: null,
  };
}

export function astToHirNode(node: abstracts.translators.AstType): abstracts.translators.HirType {
  switch (node.kind) {
    // --- DATA & EXPRESSIONS ---
    case 'LiteralAst':
      return {
        ...getBase(node),
        kind: 'LiteralHir',
        value: node.value
      };

    case 'TemplateAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: '+',
        operands: node.values.map(astToHirNode)
      };

    case 'SpreadAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: '...',
        operands: [astToHirNode(node.value)]
      };
    case 'UnaryAst':
    case 'ShapingAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: node.operator,
        operands: [astToHirNode(node.value)]
      };
    case 'DeleteAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: 'delete',
        operands: [astToHirNode(node.value)]
      };
    case 'BinaryAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: node.operator,
        operands: [
          astToHirNode(node.left),
          astToHirNode(node.right)
        ]
      };
    case 'AssignAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: '=',
        operands: [
          {
            ...getBase(node),
            kind: 'ReferenceHir',
            target: {...getBase(node), kind: 'LiteralHir', value: node.identifier.name},
            property: null,
            arguments_: [],
            modifiers: []
          },
          astToHirNode(node.value)
        ]
      };

    case 'MappedAst':
      return {
        ...getBase(node),
        kind: 'BindingHir',
        shape: astToHirNode(node.constraint) as abstracts.translators.ReferenceHir,
        value: astToHirNode(node.value),
        modifiers: [],
        name: null,
        description: null
      };

    case 'PropertyAst':
      return {
        ...getBase(node),
        kind: 'BindingHir',
        description: null,
        name: node.identifier.name,
        value: astToHirNode(node.value),
        modifiers: [],
        shape: null
      };

    case 'BlockAst':
    case 'StyleBlockAst':
      return {
        ...getBase(node),
        kind: 'BlockHir',
        statements: node.statements.map(astToHirNode)
      };

    case 'IfAst':
    case 'TernaryAst':
      return {
        ...getBase(node),
        kind: 'MatchHir',
        target: {
          ...getBase(node),
          kind: 'LiteralHir',
          value: true
        },
        branches: node.branches.map(b => astToHirNode(b) as abstracts.translators.BranchHir)
      };

    case 'SwitchAst':
      return {
        ...getBase(node),
        kind: 'MatchHir',
        target: astToHirNode(node.target),
        branches: node.branches.map(b => astToHirNode(b) as abstracts.translators.BranchHir)
      };

    case 'ConditionBranchAst':
    case 'MatchBranchAst':
      return {
        ...getBase(node),
        kind: 'BranchHir',
        pattern: astToHirNode(node.pattern),
        value: astToHirNode(node.value)
      };
    case 'CatchAst':
      return {
        ...getBase(node),
        kind: 'BranchHir',
        pattern: astToHirNode(node.condition),
        value: astToHirNode(node.block)
      };

    case 'ElseBranchAst':
    case 'DefaultBranchAst':
      return {
        ...getBase(node),
        kind: 'BranchHir',
        pattern: {
          ...getBase(node),
          kind: 'LiteralHir',
          value: true
        },
        value: astToHirNode(node.value)
      };

    case 'TryAst':
      return {
        ...getBase(node),
        kind: 'MatchHir',
        target: {
          ...getBase(node),
          kind: 'OperatorHir',
          operator: 'try',
          operands: [astToHirNode(node.block)]
        },
        branches: []
      };

    case 'DefaultCatchAst':
    case 'FinallyAst':
      return {
        ...getBase(node),
        kind: 'BranchHir',
        pattern: {
          ...getBase(node),
          kind: 'LiteralHir',
          value: node.kind === 'FinallyAst' ? 'finally' : true
        },
        value: astToHirNode(node.block)
      };

    // --- LOOPS ---
    case 'WhileDoAst':
    case 'DoWhileAst':
      return {
        ...getBase(node),
        kind: 'LoopHir',
        condition: astToHirNode(node.condition),
        block: astToHirNode(node.block) as abstracts.translators.BlockHir
      };

    case 'ForInAst':
    case 'ForItAst': {
      let bodyHir = astToHirNode(node.block) as abstracts.translators.BlockHir;
      if (node.update) {
        const updateHir = astToHirNode(node.update);
        if (bodyHir.kind === 'BlockHir') bodyHir.statements.push(updateHir);
        else bodyHir = {
          ...getBase(node.block),
          kind: 'BlockHir',
          statements: [bodyHir, updateHir]
        };
      }
      const loop: abstracts.translators.LoopHir = {
        ...getBase(node),
        kind: 'LoopHir',
        condition: node.condition ? astToHirNode(node.condition) : null,
        block: bodyHir
      };
      return node.init ? ({
        ...getBase(node),
        kind: 'BlockHir',
        statements: [astToHirNode(node.init), loop]
      }) : loop;
    }

    case 'ForOfAst':
      return {
        ...getBase(node),
        kind: 'BlockHir',
        statements: [astToHirNode(node.init), {
          ...getBase(node),
          kind: 'LoopHir',
          block: astToHirNode(node.block) as abstracts.translators.BlockHir,
          condition: null
        }]
      };

    // --- JUMPS ---
    case 'BreakAst':
    case 'ContinueAst':
      return {
        ...getBase(node),
        kind: 'GoHir',
        operator: node.kind === 'BreakAst' ? 'break' : 'continue',
        value: node.identifier ? {
          ...getBase(node),
          kind: 'ReferenceHir',
          target: {...getBase(node), kind: 'LiteralHir', value: node.identifier.name},
          modifiers: [],
          arguments_: [],
          property: null
        } : null
      };

    case 'YieldAst':
    case 'ReturnAst':
    case 'ThrowAst':
      return {
        ...getBase(node),
        kind: 'GoHir',
        operator: node.kind.replace('Ast', '').toLowerCase() as any,
        value: node.value ? astToHirNode(node.value) : null
      };

    // --- DECLARATIONS & ENTITIES ---
    case 'InstanceAst':
    case 'ParameterAst':
      return {
        ...getBase(node),
        kind: 'BindingHir',
        description: null,
        name: node.identifier.name,
        modifiers: node.modifiers.map(astToHirNode),
        shape: node.shape ? astToHirNode(node.shape) as abstracts.translators.ReferenceHir : null,
        value: node.value ? astToHirNode(node.value) : null
      };

    case 'LambdaAst':
    case 'FunctionAst':
      return {
        ...getBase(node),
        kind: 'FunctionHir',
        name: node.kind === 'FunctionAst' ? node.identifier.name : null,
        modifiers: node.modifiers.map(astToHirNode),
        returnShape: node.returnShape ? astToHirNode(node.returnShape) as abstracts.translators.ReferenceHir : null,
        parameters: node.parameters.map(p => astToHirNode(p) as abstracts.translators.BindingHir),
        block: astToHirNode(node.block),
        description: null,
        title: null,
        examples: null,
      };

    // --- STRUCTS ---
    case 'ModuleAst':
      return {
        ...getBase(node),
        kind: 'StructHir',
        name: node.identifier.name,
        modifiers: [{
          ...getBase(node),
          kind: 'LiteralHir',
          value: 'module'
        }],
        properties: [
          ...node.dependencies,
          ...node.block.statements
        ].map(astToHirNode) as abstracts.translators.BindingHir[]
      };

    case 'ArrayAst':
    case 'TupleAst':
      return {
        ...getBase(node),
        kind: 'StructHir',
        name: null,
        modifiers: [],
        properties: node.values.map(astToHirNode) as abstracts.translators.BindingHir[]
      };

    case 'ObjectAst':
    case 'StructAst':
    case 'InterfaceAst':
    case 'ClassAst':
    case 'EnumAst':
      return {
        ...getBase(node),
        kind: 'StructHir',
        name: ('identifier' in node && node.identifier) ? node.identifier.name : null,
        modifiers: 'modifiers' in node ? node.modifiers.map(astToHirNode) : [],
        properties: node.properties.map(p => astToHirNode(p) as abstracts.translators.BindingHir)
      };

    // --- ACCESS & INTERACTIONS ---
    case 'ReferenceAst':
    case 'AliasAst':
    case 'MacroCallAst':
      return {
        ...getBase(node),
        kind: 'ReferenceHir',
        target: {...getBase(node), kind: 'LiteralHir', value: node.identifier.name},
        modifiers: 'modifiers' in node ? node.modifiers.map(astToHirNode) : [],
        arguments_: [],
        property: null
      };

    case 'MemberAst':
      return {
        ...getBase(node),
        kind: 'ReferenceHir',
        target: astToHirNode(node.object_),
        property: astToHirNode(node.property),
        arguments_: [],
        modifiers: []
      };
    case 'ArgumentMemberAst':
      return {
        ...getBase(node),
        kind: 'ReferenceHir',
        target: astToHirNode(node.argument),
        property: astToHirNode(node.property),
        arguments_: [],
        modifiers: []
      };

    case 'CallAst':
    case 'DecoratorAst':
      return {
        ...getBase(node),
        kind: 'ReferenceHir',
        target: node.identifier ? {...getBase(node), kind: 'LiteralHir', value: node.identifier.name} : null,
        arguments_: node.arguments_.map(astToHirNode),
        property: null,
        modifiers: []
      };

    case 'ImportAst':
      return {
        ...getBase(node),
        kind: 'BindingHir',
        modifiers: [],
        shape: null,
        name: node.identifier.name,
        description: null,
        value: {
          ...getBase(node),
          kind: 'ReferenceHir',
          target: {...getBase(node), kind: 'LiteralHir', value: 'import'},
          modifiers: [],
          arguments_: [{
            ...getBase(node),
            kind: 'LiteralHir',
            value: node.path
          }],
          property: null
        }
      };

    // --- LAYERS & METADATA ---
    case 'DocsAst':
      return {
        ...getBase(node),
        kind: 'BlockHir',
        syntaxLayer: 1,
        statements: [
          {
            ...getBase(node),
            kind: 'BindingHir',
            modifiers: [],
            description: null,
            shape: null,
            value: {...getBase(node), kind: 'LiteralHir', value: node.title},
            name: 'title'
          },
          {
            ...getBase(node),
            kind: 'BindingHir',
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.description
            },
            description: null,
            name: 'description',
            modifiers: [],
            shape: null,
          }
        ],
      };
    case 'CommentAst':
      return {
        ...getBase(node),
        kind: 'BlockHir',
        syntaxLayer: 1,
        statements: [
          {
            ...getBase(node),
            kind: 'BindingHir',
            description: null,
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.description
            },
            modifiers: [],
            shape: null,
            name: 'description'
          }
        ]
      };
    case 'FunctionDocsAst':
      return {
        ...getBase(node),
        kind: 'BlockHir',
        syntaxLayer: 1,
        statements: [
          {
            ...getBase(node),
            kind: 'BindingHir',
            modifiers: [],
            shape: null,
            description: null,
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.title
            },
            name: 'title'
          },
          {
            ...getBase(node),
            kind: 'BindingHir',
            modifiers: [],
            shape: null,
            description: null,
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.description
            },
            name: 'description'
          },
          {
            ...getBase(node),
            kind: 'BindingHir',
            modifiers: [],
            description: null,
            shape: null,
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.memoryDataSizeComplexityFn
            },
            name: 'memoryDataSizeComplexityFn'
          },
          {
            ...getBase(node),
            kind: 'BindingHir',
            modifiers: [],
            description: null,
            shape: null,
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.timeDataSizeComplexityFn
            },
            name: 'timeDataSizeComplexityFn'
          },
          {
            ...getBase(node),
            kind: 'BindingHir',
            modifiers: [],
            description: null,
            shape: null,
            value: {
              ...getBase(node),
              kind: 'LiteralHir',
              value: node.examples
            },
            name: 'examples'
          },
        ]
      };
    case 'QueryAst':
    case 'ConstraintAst':
      return {
        ...getBase(node),
        kind: 'OperatorHir',
        operator: node.kind === 'QueryAst' ? 'query' : 'constraint',
        operands: [astToHirNode(node.pattern)]
      };

    default:
      return {
        ...getBase(node),
        kind: 'LiteralHir',
        value: null
      };
  }
}
