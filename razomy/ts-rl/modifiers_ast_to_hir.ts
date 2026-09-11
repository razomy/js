import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

/**
 * Трансформация модификаторов в унифицированные атрибуты HIR
 */
export function modifiersAstToHir(ctx: tsRl.HirCtx, modifiers?: abstracts.translators.IModifierAst[]): abstracts.translators.ModifierHir[] {
    if (!modifiers) return [];
    return modifiers.map(m => {
    let type: abstracts.translators.ModifierHir['type'] = 'public';

    if (m.kind === 'ExportModifierAst') type = 'export';
    else if (m.kind === 'OverrideModifierAst') type = 'override';
    else if (m.kind === 'FunctionModifierAst') type = (m as any).operator;
    else if (m.kind === 'ParameterModifierAst') type = (m as any).operator;
    else if (m.kind === 'InstanceModifierAst') type = (m as any).operator === 'const' ? 'const' : 'mut';

    return {
      kind: 'ModifierHir',
      symbolId: ctx.createSymbol(),
      syntaxLayer: 3,
      type
    };
    });
}
