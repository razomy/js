import {Node, SymbolFlags} from 'ts-morph';

export function is_name_taken(node: Node, new_name: string): boolean {
  const flags = SymbolFlags.Value | SymbolFlags.Alias;
  const symbols = node.getSymbolsInScope(flags);
  return symbols.some(symbol => symbol.getName() === new_name);
}