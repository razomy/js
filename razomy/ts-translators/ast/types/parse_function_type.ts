import { FunctionTypeNode } from "ts-morph";
import { parseType } from "./parse_type";
import { parseParameterDeclaration } from "../declarations/parse_parameter_declaration";
import * as abstracts from "@razomy/abstracts";

export function parseFunctionType(node: FunctionTypeNode): abstracts.translators.FunctionType {
  return {
    kind: 'FunctionType',
    parameters: node.getParameters().map(p => parseParameterDeclaration(p)) as any, //TODO:,
    return_: parseType(node.getReturnTypeNode()!),
  };
}
