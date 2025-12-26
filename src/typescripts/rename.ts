import { Project, SyntaxKind } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "../tsconfig.json",
});

const sourceFiles = project.getSourceFiles();

for (const file of sourceFiles) {
  file.getDescendantsOfKind(SyntaxKind.Identifier).forEach(node => {
    if (node.getText() === "oldName") {
      try {
        node.rename("newName");
      } catch (e) {
      }
    }
  });
}

project.saveSync();