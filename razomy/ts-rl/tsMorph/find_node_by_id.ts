import { Project, Node } from "ts-morph";

export function findNodeById(project: Project, id: string): Node | undefined {
    const lastColonIndex = id.lastIndexOf(":");
    if (lastColonIndex === -1) return undefined;
    const filePath = id.substring(0, lastColonIndex);
    const pos = parseInt(id.substring(lastColonIndex + 1), 10);
    if (isNaN(pos)) return undefined;
    const sourceFile = project.getSourceFile(filePath);
    if (!sourceFile) return undefined;
    return sourceFile.getDescendantAtPos(pos);
}
