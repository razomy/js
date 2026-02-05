import {Node, SymbolFlags} from 'ts-morph';

export function isNameTaken(node: Node, newName: string): boolean {
  const flags = SymbolFlags.Value | SymbolFlags.Alias;
  const symbols = node.getSymbolsInScope(flags);
  return symbols.some(symbol => symbol.getName() === newName);
}