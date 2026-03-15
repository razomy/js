import { SourceFile } from "ts-morph";

export function getFirstLevelElementsTextFromSource(file: SourceFile): string[] {
    return file.getStatements().map(statement => statement.getText());
}
