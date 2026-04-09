import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {mapName} from "./map_name";


export function parseTypeIdentifier(node: TsIdentifier | Node): abstracts.translators.TypeIdentifier {
  let name = node.getText();
  return {
    kind: 'TypeIdentifier',
    name:mapName(name),
  };
}
