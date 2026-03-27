import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseTypeIdentifier(node: TsIdentifier | Node): abstracts.translators.TypeIdentifier {
    return {
    kind: 'TypeIdentifier',
    name: node.getText(),
    };
}
