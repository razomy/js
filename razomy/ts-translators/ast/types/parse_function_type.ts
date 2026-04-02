import {FunctionTypeNode} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseTypeIdentifier} from "../base";

import {parseParameterType} from "../declarations/parse_parameter_type";

export function parseFunctionType(node: FunctionTypeNode): abstracts.translators.FunctionType {
  return {
    kind: 'FunctionType',
    parameters: node.getParameters().map(p => parseParameterType(p)),
    returnType: {
      kind: 'ReturnType',
      typeIdentifier: parseTypeIdentifier(node.getReturnTypeNode()!),
      description: ''
    },
  };
}
