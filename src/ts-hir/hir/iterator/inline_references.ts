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
 * Инлайнит ссылки (VarRefHirn) и вычисляет доступ к полям (MemberAccessHirn),
 * заменяя их на конкретные значения (LiteralHirn, StructHirn и др.).
 */
export function inlineReferences(
  root: abstractions.hir.HirnType,
): abstractions.hir.HirnType {
  const declarationsByName = new Map<string, abstractions.hir.IdentityHirnType>();
  // const inliningStack = new Set<string>();

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
      case 'VarRefHirn':
        break;
      case 'MemberAccessHirn':
        collectDeclarations(node.target);
        if (typeof node.property !== 'string') {
          collectDeclarations(node.property);
        }
        break;
      case 'CallHirn':
        collectDeclarations(node.callee!);
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
          block: node.block ? cloneNode(node.block): null
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
      case 'VarRefHirn':
        return {
          ...baseClone,
          name: node.name,
          // resolvedDeclaration: node.resolvedDeclaration,
        } as T;
      case 'MemberAccessHirn':
        return {
          ...baseClone,
          target: cloneNode(node.target),
          property: typeof node.property === 'string' ? node.property : cloneNode(node.property),
        } as T;
      case 'CallHirn':
        return {
          ...baseClone,
          callee: cloneNode(node.callee!),
          arguments_: node.arguments_.map(cloneNode),
        } as T;
    }
  }

  // Извлекает значение из объявления (для BindingHirn достает value, для StructHirn — саму структуру)
  function unwrapDeclaration(
    decl: abstractions.hir.IdentityHirnType,
  ): abstractions.hir.HirnType {
    if (decl.kind === 'BindingHirn' && decl.value !== null) {
      return cloneNode(decl.value);
    }
    return cloneNode(decl);
  }

  // 2. Обходим дерево и инлайним обращения
  function transform(node: abstractions.hir.HirnType): abstractions.hir.HirnType {
    switch (node.kind) {
      case 'LiteralHirn':
        return node;

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
          node.shape = transform(node.shape) as any;
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
          node.returnShape = transform(node.returnShape) as any;
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

      // --- Инлайнинг обращения к переменной / типу ---
      case 'VarRefHirn': {
        // const name = node.name;
        // const decl = node.resolvedDeclaration ?? declarationsByName.get(name);
        // if (decl && !inliningStack.has(name)) {
        //   inliningStack.add(name);
        //   const unwrapped = unwrapDeclaration(decl);
        //   const result = transform(unwrapped);
        //   inliningStack.delete(name);
        //   return result;
        // }
        return node;
      }

      // --- Инлайнинг обращения к свойству (BitSize.Byte -> 8) ---
      case 'MemberAccessHirn': {
        const resolvedTarget = transform(node.target);
        const resolvedProperty = typeof node.property === 'string'
          ? node.property
          : transform(node.property);

        // Если target резолвится в StructHirn, ищем свойство внутри
        if (resolvedTarget.kind === 'StructHirn') {
          let propName: string | null = null;
          if (typeof resolvedProperty === 'string') {
            propName = resolvedProperty;
          } else if (resolvedProperty.kind === 'LiteralHirn' && typeof resolvedProperty.value === 'string') {
            propName = resolvedProperty.value;
          }

          if (propName) {
            const foundProp = resolvedTarget.properties.find((p) => p.name === propName);
            if (foundProp) {
              return transform(unwrapDeclaration(foundProp));
            }
          }
        }

        node.target = resolvedTarget;
        node.property = resolvedProperty;
        return node;
      }

      // --- Рекурсивная обработка вызова ---
      case 'CallHirn': {
        node.callee = node.callee ? transform(node.callee): null;
        node.arguments_ = node.arguments_.map(transform);
        return node;
      }
    }
  }

  collectDeclarations(root);
  return transform(root);
}
