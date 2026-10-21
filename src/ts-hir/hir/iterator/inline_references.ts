import * as abstractions from '@razomy/abstractions';

function isIdentityHirn(
  node: abstractions.hir.HirnType,
): node is abstractions.hir.IdentityHirnType {
  return (
    node.kind === 'BindingHirn' ||
    node.kind === 'FunctionHirn' ||
    node.kind === 'ModuleHirn' ||
    node.kind === 'StructHirn'
  );
}

/**
 * Полностью удаляет ВСЕ узлы ReferenceHirn из дерева,
 * заменяя их на LiteralHirn, StructHirn и другие конкретные типы.
 */
export function inlineReferences(
  root: abstractions.hir.HirnType,
): abstractions.hir.HirnType {
  const declarationsByName = new Map<string, abstractions.hir.IdentityHirnType>();
  const inliningStack = new Set<string>();

  // 1. Собираем все объявления (StructHirn, BindingHirn, FunctionHirn) по их имени
  function collectDeclarations(node: abstractions.hir.HirnType): void {
    if (!node) return;

    if (isIdentityHirn(node) && node.name !== null && node.name.length > 0) {
      declarationsByName.set(node.name, node);
    }

    switch (node.kind) {
      case 'OperatorHirn':
        node.operands.forEach(collectDeclarations);
        break;
      case 'BranchHirn':
        collectDeclarations(node.pattern);
        collectDeclarations(node.value);
        break;
      case 'MatchHirn':
        collectDeclarations(node.target);
        node.branches.forEach(collectDeclarations);
        break;
      case 'GoHirn':
        if (node.value) collectDeclarations(node.value);
        break;
      case 'LoopHirn':
        if (node.condition) collectDeclarations(node.condition);
        collectDeclarations(node.block);
        break;
      case 'BlockHirn':
        node.statements.forEach(collectDeclarations);
        break;
      case 'ModuleHirn':
        node.statements.forEach(collectDeclarations);
        break;
      case 'StructHirn':
        node.properties.forEach(collectDeclarations);
        break;
      case 'FunctionHirn':
        node.parameters.forEach(collectDeclarations);
        if (node.block) collectDeclarations(node.block);
        break;
      case 'BindingHirn':
        if (node.shape) collectDeclarations(node.shape);
        if (node.value) collectDeclarations(node.value);
        break;
      case 'ReferenceHirn':
        if (node.target) collectDeclarations(node.target);
        if (node.property) collectDeclarations(node.property);
        node.arguments_.forEach(collectDeclarations);
        break;
    }
  }

  // Глубокое клонирование узла
  function cloneNode<T extends abstractions.hir.HirnType>(node: T): T {
    const baseClone = {
      ...node,
      children: node.children ? [...node.children] : [],
    };

    switch (node.kind) {
      case 'LiteralHirn':
        return { ...baseClone } as T;
      case 'OperatorHirn':
        return { ...baseClone, operands: node.operands.map(cloneNode) } as T;
      case 'BranchHirn':
        return {
          ...baseClone,
          pattern: cloneNode(node.pattern),
          value: cloneNode(node.value),
        } as T;
      case 'MatchHirn':
        return {
          ...baseClone,
          target: cloneNode(node.target),
          branches: node.branches.map(cloneNode),
        } as T;
      case 'GoHirn':
        return {
          ...baseClone,
          value: node.value ? cloneNode(node.value) : null,
        } as T;
      case 'LoopHirn':
        return {
          ...baseClone,
          condition: node.condition ? cloneNode(node.condition) : null,
          block: cloneNode(node.block),
        } as T;
      case 'BlockHirn':
        return {
          ...baseClone,
          statements: node.statements.map(cloneNode),
        } as T;
      case 'BindingHirn':
        return {
          ...baseClone,
          modifiers: { ...node.modifiers },
          doc: { ...node.doc },
          shape: node.shape ? cloneNode(node.shape) : null,
          value: node.value ? cloneNode(node.value) : null,
        } as T;
      case 'FunctionHirn':
        return {
          ...baseClone,
          modifiers: { ...node.modifiers },
          doc: {
            ...node.doc,
            examples: node.doc.examples.map((ex) => ({ ...ex })),
          },
          parameters: node.parameters.map(cloneNode),
          returnShape: node.returnShape ? cloneNode(node.returnShape) : null,
          block: node.block ? cloneNode(node.block) : null,
        } as T;
      case 'StructHirn':
        return {
          ...baseClone,
          modifiers: { ...node.modifiers },
          doc: { ...node.doc },
          properties: node.properties.map(cloneNode),
        } as T;
      case 'ModuleHirn':
        return {
          ...baseClone,
          modifiers: { ...node.modifiers },
          doc: { ...node.doc },
          statements: node.statements.map(cloneNode),
        } as T;
      case 'ReferenceHirn':
        return {
          ...baseClone,
          target: node.target ? cloneNode(node.target) : null,
          property: node.property ? cloneNode(node.property) : null,
          arguments_: node.arguments_.map(cloneNode),
        } as T;
    }
  }

  // Извлекает значение из объявления (для BindingHirn достает его value, для StructHirn — сам StructHirn)
  function unwrapDeclaration(
    decl: abstractions.hir.IdentityHirnType,
  ): abstractions.hir.HirnType {
    if (decl.kind === 'BindingHirn' && decl.value !== null) {
      return cloneNode(decl.value);
    }
    return cloneNode(decl);
  }

  // Пытается найти декларацию по имени в LiteralHirn и вернуть её реальный узел
  function resolveLiteralByName(
    lit: abstractions.hir.LiteralHirn,
  ): abstractions.hir.HirnType {
    if (typeof lit.value === 'string') {
      const decl = declarationsByName.get(lit.value);
      if (decl && !inliningStack.has(lit.value)) {
        inliningStack.add(lit.value);
        const unwrapped = unwrapDeclaration(decl);
        const result = transform(unwrapped);
        inliningStack.delete(lit.value);
        return result;
      }
    }
    return lit;
  }

  // 2. Обходим всё дерево и УДАЛЯЕМ ReferenceHirn
  function transform(node: abstractions.hir.HirnType): abstractions.hir.HirnType {
    switch (node.kind) {
      case 'LiteralHirn':
        return resolveLiteralByName(node);

      case 'OperatorHirn':
        node.operands = node.operands.map(transform);
        return node;

      case 'BranchHirn':
        node.pattern = transform(node.pattern);
        node.value = transform(node.value);
        return node;

      case 'MatchHirn':
        node.target = transform(node.target);
        node.branches = node.branches.map(
          (b) => transform(b) as abstractions.hir.BranchHirn,
        );
        return node;

      case 'GoHirn':
        if (node.value) node.value = transform(node.value);
        return node;

      case 'LoopHirn':
        if (node.condition) node.condition = transform(node.condition);
        node.block = transform(node.block) as abstractions.hir.BlockHirn;
        return node;

      case 'BlockHirn':
        node.statements = node.statements.map(transform);
        return node;

      case 'BindingHirn':
        if (node.shape) {
          node.shape = transform(node.shape) as abstractions.hir.ReferenceHirn;
        }
        if (node.value) {
          node.value = transform(node.value);
        }
        return node;

      case 'FunctionHirn':
        node.parameters = node.parameters.map(
          (p) => transform(p) as abstractions.hir.BindingHirn,
        );
        if (node.returnShape) {
          node.returnShape = transform(
            node.returnShape,
          ) as abstractions.hir.ReferenceHirn;
        }
        if (node.block) {
          node.block = transform(node.block);
        }
        return node;

      case 'StructHirn':
        node.properties = node.properties.map(
          (prop) => transform(prop) as abstractions.hir.IdentityHirnType,
        );
        return node;

      case 'ModuleHirn':
        node.statements = node.statements.map(
          (stmt) => transform(stmt) as abstractions.hir.IdentityHirnType,
        );
        return node;

      case 'ReferenceHirn': {
        // Рекурсивно резолвим target и property (уничтожая вложенные ReferenceHirn)
        const resolvedTarget = node.target ? transform(node.target) : null;
        const resolvedProperty = node.property ? transform(node.property) : null;

        // 1. Если есть обращение к свойству (например, BitSize.Byte или BitSize.Long)
        if (resolvedTarget && resolvedProperty) {
          // Если target превратился в StructHirn, ищем свойство внутри него
          if (
            resolvedTarget.kind === 'StructHirn' &&
            resolvedProperty.kind === 'LiteralHirn' &&
            typeof resolvedProperty.value === 'string'
          ) {
            const propName = resolvedProperty.value;
            const foundProp = resolvedTarget.properties.find(
              (p) => p.name === propName,
            );
            if (foundProp) {
              // Нашли свойство (например, Byte -> возвращаем LiteralHirn 8)
              return transform(unwrapDeclaration(foundProp));
            }
          }

          // Если свойство не найдено (например, Long нет в BitSize),
          // всё равно УДАЛЯЕМ ReferenceHirn и возвращаем сам LiteralHirn свойства ("Long")
          return resolvedProperty;
        }

        // 2. Если свойства нет (просто ссылка на тип или переменную) —
        // УДАЛЯЕМ ReferenceHirn и возвращаем разрезолвленный target (StructHirn или LiteralHirn)
        if (resolvedTarget) {
          return resolvedTarget;
        }

        // 3. Fallback, если ReferenceHirn был совсем пустым
        return {
          prev : null,
          next: null,
          id: '',
          syntaxRole: node.syntaxRole,
          semanticLayer: node.semanticLayer,
          kind: 'LiteralHirn',
          value: '',
          parent: node.parent,
          children: [],
        };
      }
    }
  }

  collectDeclarations(root);
  return transform(root);
}
