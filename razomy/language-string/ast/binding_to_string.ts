import * as languageString from "@razomy/language-string";
import * as abstracts from "@razomy/abstracts";

/**
 * Извлекает имя узла из доступных слоёв (syntaxLayer / identifier).
 */
function getNodeName(node: abstracts.translators.HirType, fallback: string = 'anonymous'): string {
  const syntax = (node as any).syntaxLayer;
  if (syntax?.name) return syntax.name;
  if (syntax?.identifier?.name) return syntax.identifier.name;
  if (syntax?.identifier) return String(syntax.identifier);
  return (node as any).name || fallback;
}

/**
 * Извлекает описание из метаслоя / LayerHir / аннотаций.
 */
function getNodeDescription(node: abstracts.translators.HirType): string {
  const meta = (node as any).meta;
  if (meta?.description) return meta.description;

  const layer = (node as any).layer;
  if (layer?.description) return layer.description;

  const syntax = (node as any).syntaxLayer;
  if (syntax?.description) return syntax.description;

  return '';
}

export function bindingToString(
  nodes: abstracts.translators.HirType[],
  currentPath: string[] = [],
  result: languageString.FlatDeclaration[] = [],
): languageString.FlatDeclaration[] {
  for (const node of nodes) {
    if (node.kind === 'StructHir') {
      const moduleNode = node as abstracts.translators.StructHir;
      const moduleName = getNodeName(moduleNode, 'module');
      bindingToString(moduleNode.properties, [...currentPath, moduleName], result);
    } else if (node.kind === 'FunctionHir') {
      const funcNode = node as abstracts.translators.FunctionHir;
      const name = getNodeName(funcNode);
      result.push({
        node: funcNode,
        description: getNodeDescription(funcNode),
        name,
        path: [...currentPath, name],
      });
    } else if (node.kind === 'StructHir') {
      const structNode = node as abstracts.translators.StructHir;
      const name = getNodeName(structNode);
      result.push({
        node: structNode,
        description: getNodeDescription(structNode),
        name,
        path: [...currentPath, name],
      });
    } else if (node.kind === 'BindingHir') {
      const bindingNode = node as abstracts.translators.BindingHir;
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
