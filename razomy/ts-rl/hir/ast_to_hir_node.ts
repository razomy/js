import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';

/**
 * Строгое извлечение базовых полей. Теперь не генерирует ID (это делает индексатор).
 */
function getBase(node: abstractions.translators.AsnType) {
  return {
    id: random.createUuid(),
    syntaxRole: node.syntaxRole,
    semanticLayer: 'semanticLayer' in node ? node.semanticLayer : 'state',
  } satisfies Partial<abstractions.translators.HirType>;
}

export function astToHirNode(node: abstractions.translators.AsnType): abstractions.translators.HirType {
  switch (node.kind) {
    // --- DATA & EXPRESSIONS ---
    case 'LiteralAsn':
      return {
        ...getBase(node),
        kind: 'LiteralHirn',
        value: node.value,
      };

    case 'TemplateAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: '+',
        operands: node.values.map(astToHirNode),
      };

    case 'SpreadAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: '...',
        operands: [astToHirNode(node.value)],
      };
    case 'UnaryAsn':
    case 'ShapingAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: node.operator,
        operands: [astToHirNode(node.value)],
      };
    case 'DeleteAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: 'delete',
        operands: [astToHirNode(node.value)],
      };
    case 'BinaryAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: node.operator,
        operands: [astToHirNode(node.left), astToHirNode(node.right)],
      };
    case 'AssignAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: '=',
        operands: [
          {
            ...getBase(node),
            kind: 'ReferenceHirn',
            target: { ...getBase(node), kind: 'LiteralHirn', value: node.identifier.name },
            property: null,
            arguments_: [],
          },
          astToHirNode(node.value),
        ],
      };

    case 'MappedAsn':
      return {
        ...getBase(node),
        kind: 'BindingHirn',
        shape: astToHirNode(node.constraint) as abstractions.translators.ReferenceHirn,
        value: astToHirNode(node.value),
        modifiers: [],
        name: null,
        doc: { description: '' },
      };

    case 'PropertyAsn':
      return {
        ...getBase(node),
        doc: { description: '' },
        kind: 'BindingHirn',
        name: node.identifier.name,
        value: node.value ? astToHirNode(node.value) : null,
        modifiers: [],
        shape: null,
      };

    case 'BlockAsn':
    case 'StyleBlockAsn':
      return {
        ...getBase(node),
        kind: 'BlockHirn',
        statements: node.statements.map(astToHirNode),
      };

    case 'IfAsn':
    case 'TernaryAsn':
      return {
        ...getBase(node),
        kind: 'MatchHirn',
        target: {
          ...getBase(node),
          kind: 'LiteralHirn',
          value: true,
        },
        branches: node.branches.map((b) => astToHirNode(b) as abstractions.translators.BranchHirn),
      };

    case 'SwitchAsn':
      return {
        ...getBase(node),
        kind: 'MatchHirn',
        target: astToHirNode(node.target),
        branches: node.branches.map((b) => astToHirNode(b) as abstractions.translators.BranchHirn),
      };

    case 'ConditionBranchAsn':
    case 'MatchBranchAsn':
      return {
        ...getBase(node),
        kind: 'BranchHirn',
        pattern: astToHirNode(node.pattern),
        value: astToHirNode(node.value),
      };
    case 'CatchAsn':
      return {
        ...getBase(node),
        kind: 'BranchHirn',
        pattern: astToHirNode(node.condition),
        value: astToHirNode(node.block),
      };

    case 'ElseBranchAsn':
    case 'DefaultBranchAsn':
      return {
        ...getBase(node),
        kind: 'BranchHirn',
        pattern: {
          ...getBase(node),
          kind: 'LiteralHirn',
          value: true,
        },
        value: astToHirNode(node.value),
      };

    case 'TryAsn':
      return {
        ...getBase(node),
        kind: 'MatchHirn',
        target: {
          ...getBase(node),
          kind: 'OperatorHirn',
          operator: 'try',
          operands: [astToHirNode(node.block)],
        },
        branches: [],
      };

    case 'DefaultCatchAsn':
    case 'FinallyAsn':
      return {
        ...getBase(node),
        kind: 'BranchHirn',
        pattern: {
          ...getBase(node),
          kind: 'LiteralHirn',
          value: node.kind === 'FinallyAsn' ? 'finally' : true,
        },
        value: astToHirNode(node.block),
      };

    // --- LOOPS ---
    case 'WhileDoAsn':
    case 'DoWhileAsn':
      return {
        ...getBase(node),
        kind: 'LoopHirn',
        condition: astToHirNode(node.condition),
        block: astToHirNode(node.block) as abstractions.translators.BlockHirn,
      };

    case 'ForInAsn':
    case 'ForItAsn': {
      let bodyHirn = astToHirNode(node.block) as abstractions.translators.BlockHirn;
      if (node.update) {
        const updateHirn = astToHirNode(node.update);
        if (bodyHirn.kind === 'BlockHirn') bodyHirn.statements.push(updateHirn);
        else
          bodyHirn = {
            ...getBase(node.block),
            kind: 'BlockHirn',
            statements: [bodyHirn, updateHirn],
          };
      }
      const loop: abstractions.translators.LoopHirn = {
        ...getBase(node),
        kind: 'LoopHirn',
        condition: node.condition ? astToHirNode(node.condition) : null,
        block: bodyHirn,
      };
      return node.init
        ? {
            ...getBase(node),
            kind: 'BlockHirn',
            statements: [astToHirNode(node.init), loop],
          }
        : loop;
    }

    case 'ForOfAsn':
      return {
        ...getBase(node),
        kind: 'BlockHirn',
        statements: [
          astToHirNode(node.init),
          {
            ...getBase(node),
            kind: 'LoopHirn',
            block: astToHirNode(node.block) as abstractions.translators.BlockHirn,
            condition: null,
          },
        ],
      };

    // --- JUMPS ---
    case 'BreakAsn':
    case 'ContinueAsn':
      return {
        ...getBase(node),
        kind: 'GoHirn',
        operator: node.kind === 'BreakAsn' ? 'break' : 'continue',
        value: node.identifier
          ? {
              ...getBase(node),
              kind: 'ReferenceHirn',
              target: { ...getBase(node), kind: 'LiteralHirn', value: node.identifier.name },
              arguments_: [],
              property: null,
            }
          : null,
      };

    case 'YieldAsn':
    case 'ReturnAsn':
    case 'ThrowAsn':
      return {
        ...getBase(node),
        kind: 'GoHirn',
        operator: node.kind.replace('Asn', '').toLowerCase() as any,
        value: node.value ? astToHirNode(node.value) : null,
      };

    // --- DECLARATIONS & ENTITIES ---
    case 'InstanceAsn':
    case 'ParameterAsn':
      return {
        ...getBase(node),
        kind: 'BindingHirn',
        name: node.identifier.name,
        modifiers: node.modifiers.map(astToHirNode),
        shape: node.shape ? (astToHirNode(node.shape) as abstractions.translators.ReferenceHirn) : null,
        value: node.value ? astToHirNode(node.value) : null,
        doc: { description: '' },
      };

    case 'LambdaAsn':
    case 'FunctionAsn':
      return {
        ...getBase(node),
        kind: 'FunctionHirn',
        fnHashId: random.createUuid(),
        name: node.kind === 'FunctionAsn' ? node.identifier.name : null,
        modifiers: node.modifiers.map(astToHirNode),
        returnShape: node.returnShape ? (astToHirNode(node.returnShape) as abstractions.translators.ReferenceHirn) : null,
        parameters: node.parameters.map((p) => astToHirNode(p) as abstractions.translators.BindingHirn),
        block: astToHirNode(node.block),
        doc: {
          description: '',
          examples: [],
          returnDescription: '',
          title: '',
        },
      };

    // --- STRUCTS ---
    case 'ModuleAsn':
      return {
        ...getBase(node),
        kind: 'StructHirn',
        name: node.identifier.name,
        doc: { description: '' },
        modifiers: [
          {
            ...getBase(node),
            kind: 'LiteralHirn',
            value: 'module',
          },
        ],
        properties: [...node.block.statements].map(astToHirNode) as abstractions.translators.BindingHirn[],
      };

    case 'ArrayAsn':
    case 'TupleAsn':
      return {
        ...getBase(node),
        kind: 'StructHirn',
        doc: { description: '' },
        name: null,
        modifiers: [],
        properties: node.values.map(astToHirNode) as abstractions.translators.BindingHirn[],
      };

    case 'ObjectAsn':
    case 'StructAsn':
    case 'InterfaceAsn':
    case 'ClassAsn':
    case 'EnumAsn':
      return {
        ...getBase(node),
        kind: 'StructHirn',
        doc: { description: '' },
        name: 'identifier' in node && node.identifier ? node.identifier.name : null,
        modifiers: 'modifiers' in node ? node.modifiers.map(astToHirNode) : [],
        properties: node.properties.map((p) => astToHirNode(p) as abstractions.translators.BindingHirn),
      };

    // --- ACCESS & INTERACTIONS ---
    case 'ReferenceAsn':
    case 'AliasAsn':
    case 'MacroCallAsn':
      return {
        ...getBase(node),
        kind: 'ReferenceHirn',
        target: { ...getBase(node), kind: 'LiteralHirn', value: node.identifier.name },
        arguments_: [],
        property: null,
      };
    case 'MemberAsn':
      return {
        ...getBase(node),
        kind: 'ReferenceHirn',
        target: astToHirNode(node.object_),
        property: astToHirNode(node.property),
        arguments_: [],
      };
    case 'ArgumentMemberAsn':
      return {
        ...getBase(node),
        kind: 'ReferenceHirn',
        target: astToHirNode(node.argument),
        property: astToHirNode(node.property),
        arguments_: [],
      };

    case 'CallAsn':
    case 'DecoratorAsn':
      return {
        ...getBase(node),
        kind: 'ReferenceHirn',
        target: node.identifier ? { ...getBase(node), kind: 'LiteralHirn', value: node.identifier.name } : null,
        arguments_: node.arguments_.map(astToHirNode),
        property: null,
      };

    case 'ImportAsn':
      return {
        ...getBase(node),
        kind: 'BindingHirn',
        modifiers: [],
        shape: null,
        doc: { description: '' },
        name: node.identifier.name,
        value: {
          ...getBase(node),
          kind: 'ReferenceHirn',
          target: { ...getBase(node), kind: 'LiteralHirn', value: 'import' },
          arguments_: [
            {
              ...getBase(node),
              kind: 'LiteralHirn',
              value: node.path,
            },
          ],
          property: null,
        },
      };

    // --- LAYERS & METADATA ---
    case 'TagAsn':
      return {
        ...getBase(node),
        kind: 'BindingHirn',
        modifiers: [],
        shape: null,
        doc: { description: '' },
        value: astToHirNode(node.value),
        name: node.identifier.name,
      };
    case 'TextAsn':
      return {
        ...getBase(node),
        kind: 'LiteralHirn',
        value: node.value,
      };
    case 'DocsAsn':
      return {
        ...getBase(node),
        kind: 'BlockHirn',
        syntaxRole: 'text',
        statements: node.block.map(astToHirNode),
      };
    case 'CommentAsn':
      return {
        ...getBase(node),
        kind: 'BlockHirn',
        syntaxRole: 'text',
        statements: [astToHirNode(node.value)],
      };
    case 'QueryAsn':
    case 'ConstraintAsn':
      return {
        ...getBase(node),
        kind: 'OperatorHirn',
        operator: node.kind === 'QueryAsn' ? 'query' : 'constraint',
        operands: [astToHirNode(node.pattern)],
      };

    default:
      return {
        ...getBase(node),
        kind: 'LiteralHirn',
        value: null,
      };
  }
}