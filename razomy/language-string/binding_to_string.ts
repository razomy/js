import * as languageString from './';
import type {
  HirType,
  ModuleHir,
  FunctionHir,
  StructHir,
  BindingHir,
} from '@razomy/abstracts/translators';

/**
 * Извлекает имя узла из доступных слоёв (syntaxLayer / identifier).
 */
function getNodeName(node: HirType, fallback: string = 'anonymous'): string {
  const syntax = (node as any).syntaxLayer;
  if (syntax?.name) return syntax.name;
  if (syntax?.identifier?.name) return syntax.identifier.name;
  if (syntax?.identifier) return String(syntax.identifier);
  return (node as any).name || fallback;
}

/**
 * Извлекает описание из метаслоя / LayerHir / аннотаций.
 */
function getNodeDescription(node: HirType): string {
  const meta = (node as any).meta;
  if (meta?.description) return meta.description;

  const layer = (node as any).layer;
  if (layer?.description) return layer.description;

  const syntax = (node as any).syntaxLayer;
  if (syntax?.description) return syntax.description;

  return '';
}

export function bindingToString(
  nodes: HirType[],
  currentPath: string[] = [],
  result: languageString.FlatDeclaration[] = [],
): languageString.FlatDeclaration[] {
  for (const node of nodes) {
    if (node.kind === 'ModuleHir') {
      const moduleNode = node as ModuleHir;
      const moduleName = getNodeName(moduleNode, 'module');
      bindingToString(moduleNode.block.statements, [...currentPath, moduleName], result);
    } else if (node.kind === 'FunctionHir') {
      const funcNode = node as FunctionHir;
      const name = getNodeName(funcNode);
      result.push({
        node: funcNode,
        description: getNodeDescription(funcNode),
        name,
        path: [...currentPath, name],
      });
    } else if (node.kind === 'StructHir') {
      const structNode = node as StructHir;
      const name = getNodeName(structNode);
      result.push({
        node: structNode,
        description: getNodeDescription(structNode),
        name,
        path: [...currentPath, name],
      });
    } else if (node.kind === 'BindingHir') {
      const bindingNode = node as BindingHir;
      // Внешние импорты (dependency binding) пропускаем в документации
      if (bindingNode.externalSource) {
        continue;
      }
      const name = getNodeName(bindingNode);
      result.push({
        node: bindingNode,
        description: getNodeDescription(bindingNode),
        name,
        path: [...currentPath, name],
      });
    } else if (node.kind === 'BlockHir') {
      bindingToString((node as any).statements || [], currentPath, result);
    }
  }

  return result;
}
