import { type FunctionDeclaration, Project, SourceFile, TypeFormatFlags } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import * as stringCase from "@razomy/string-case";
import * as tsRefactor from "@razomy/ts-refactor";

export interface ExtensionConfig {
  name: string;             // 'string' | 'array'
  pkgType: 'string' | 'array';
  targetObject: string;     // 'String' | 'Array'
  targetPrototype: string;  // 'String' | 'Array<T>'
}

interface FunctionMeta {
  name: string;
  jsDoc: string;
  genericStr: string;
  firstParamType: string;
  isFirstParamRest: boolean;
  remainingParamsDecl: string[];
  remainingParamsNames: string[];
  returnType: string;
  sourceFile: SourceFile;
}

export async function generateAllExtensions(projectPath: string, sourcePath: string, extensions: ExtensionConfig[]) {
  const tsConfigPath = path.resolve(projectPath, 'tsconfig.json');
  console.log(`Initializing global project at ${tsConfigPath}...`);

  const project = new Project({ tsConfigFilePath: tsConfigPath });
  const allFiles = project.getSourceFiles();

  for (const ext of extensions) {
    console.log(`\nProcessing @razomy/${ext.name}`);

    const packageDir = path.resolve(projectPath, `${sourcePath}/${ext.name}`).replace(/\\/g, '/');

    const packageFiles = allFiles.filter(file => {
      const filePath = file.getFilePath();
      return filePath.startsWith(packageDir + '/') &&
        !filePath.endsWith('prototype.ts') &&
        !filePath.endsWith('class.ts') &&
        !filePath.endsWith('extensions.ts');
    });

    if (packageFiles.length === 0) {
      console.warn(`[WARNING] Файлы не найдены в: ${packageDir}`);
      continue;
    }

    const functionsMeta = extractFunctionsMetadata(packageFiles, ext);

    // 1. Генерируем файл с Классом
    const className = stringCase.pascalCase(ext.name) + 'Extension';
    const classFileName = stringCase.snakeCase(className);
    const classFilePath = path.resolve(packageDir, classFileName + '.ts');
    generateClassFile(classFilePath, ext, functionsMeta);

    // 2. Генерируем файл с Прототипом
    const prototypeFilePath = path.resolve(packageDir, 'extensions.ts');
    generatePrototypeFile(prototypeFilePath, ext);
  }
}

function extractFunctionsMetadata(packageFiles: SourceFile[], ext: ExtensionConfig): FunctionMeta[] {
  const functionsToBind: FunctionMeta[] = [];

  for (const file of packageFiles) {
    const exportedFunctions: FunctionDeclaration[] = file.getFunctions().filter((f) => f.isExported() && f.getName());

    for (const func of exportedFunctions) {
      const name = func.getName()!;
      const parameters = func.getParameters();

      if (parameters.length === 0) continue;

      const firstParam = parameters[0];
      const isFirstParamRest = firstParam.isRestParameter();
      const firstParamType = firstParam.getType();
      const firstParamOriginalType = firstParam.getTypeNode()?.getText()
        || firstParamType.getText(func, TypeFormatFlags.NoTruncation);

      if (ext.pkgType === 'string') {
        if (!firstParamType.isString() && !firstParamType.isStringLiteral()) continue;
      } else if (ext.pkgType === 'array') {
        if (!firstParamType.isArray() && !firstParamOriginalType.includes('[]') && !firstParamOriginalType.includes('Array<')) continue;
      }

      const typeParameters = func.getTypeParameters().map(tp => tp.getText()).join(', ');
      const genericStr = typeParameters ? `<${typeParameters}>` : '';

      const remainingParamsDecl: string[] = [];
      const remainingParamsNames: string[] = [];

      for (const p of parameters.slice(1)) {
        const isOptional = p.isOptional() ? '?' : '';
        const typeStr = p.getTypeNode()?.getText() || p.getType().getText(func, TypeFormatFlags.NoTruncation);
        const isRest = p.isRestParameter() ? '...' : '';
        const paramName = p.getName();

        remainingParamsDecl.push(`${isRest}${paramName}${isOptional}: ${typeStr}`);
        remainingParamsNames.push(`${isRest}${paramName}`);
      }

      const returnType = func.getReturnTypeNode()?.getText() || func.getReturnType().getText(func, TypeFormatFlags.NoTruncation);
      const jsDoc = func.getJsDocs().map(d => d.getText()).join('\n');

      functionsToBind.push({
        name,
        jsDoc,
        genericStr,
        firstParamType: firstParamOriginalType,
        isFirstParamRest,
        remainingParamsDecl,
        remainingParamsNames,
        returnType,
        sourceFile: file,
      });
    }
  }

  return functionsToBind;
}

/**
 * 1. Генерирует класс с авто-импортом всех необходимых типов
 */
function generateClassFile(outputFile: string, ext: ExtensionConfig, functions: FunctionMeta[]) {
  const packageName = `@razomy/${ext.name}`;
  const importAlias = tsRefactor.toSafeName(stringCase.camelCase(ext.name));
  const className = stringCase.pascalCase(ext.name) + 'Extension';

  // Собираем необходимые импорты для типов
  const typeImports = collectRequiredTypeImports(outputFile, packageName, functions);

  let code = `// AUTO-GENERATED CLASS FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.\n`;
  code += `import * as ${importAlias} from '${packageName}';\n`;
  if (typeImports) {
    code += `${typeImports}\n`;
  }
  code += `\nexport class ${className} {\n`;

  for (const fn of functions) {
    if (fn.jsDoc) {
      code += `${indentLines(fn.jsDoc, 2)}\n`;
    }

    const allParams = [`this: ${fn.firstParamType}`, ...fn.remainingParamsDecl].join(', ');
    const thisArg = fn.isFirstParamRest ? '...this' : 'this';
    const allArgs = [thisArg, ...fn.remainingParamsNames].join(', ');

    code += `  public ${fn.name}${fn.genericStr}(${allParams}): ${fn.returnType} {\n`;
    code += `    return ${importAlias}.${fn.name}(${allArgs});\n`;
    code += `  }\n\n`;
  }

  code += `}\n`;

  writeFileSafe(outputFile, code);
  console.log(`[SUCCESS CLASS] Сохранено в: ${outputFile}`);
}

/**
 * Собирает только те импорты из исходных файлов, которые реально фигурируют в сигнатурах типов
 */
function collectRequiredTypeImports(outputFile: string, currentPackageName: string, functions: FunctionMeta[]): string {
  interface ModuleImports {
    defaultImports: Set<string>;
    namespaceImports: Set<string>;
    namedImports: Map<string, string>; // importName -> alias
  }

  const outputDir = path.dirname(path.resolve(outputFile));
  const importsMap = new Map<string, ModuleImports>();

  for (const fn of functions) {
    const fullSignatureTypeStr = [
      fn.genericStr,
      fn.firstParamType,
      ...fn.remainingParamsDecl,
      fn.returnType,
    ].join(' ');

    const importDeclarations = fn.sourceFile.getImportDeclarations();

    for (const decl of importDeclarations) {
      let moduleSpecifier = decl.getModuleSpecifierValue();

      // Если импорт относительный, приводим путь относительно целевого outputFile
      if (moduleSpecifier.startsWith('.')) {
        const targetFile = decl.getModuleSpecifierSourceFile();
        if (targetFile) {
          const targetFilePath = targetFile.getFilePath();
          let relative = path.relative(outputDir, targetFilePath).replace(/\\/g, '/').replace(/\.tsx?$/, '');
          if (!relative.startsWith('.')) relative = './' + relative;
          moduleSpecifier = relative;
        }
      }

      // Не импортируем сам текущий пакет или текущий файл
      if (moduleSpecifier === currentPackageName || moduleSpecifier === `./${path.basename(outputFile, '.ts')}`) {
        continue;
      }

      function getModuleEntry () {
                if (!importsMap.has(moduleSpecifier)) {
                  importsMap.set(moduleSpecifier, {
                    defaultImports: new Set(),
                    namespaceImports: new Set(),
                    namedImports: new Map(),
                  });
                }
                return importsMap.get(moduleSpecifier)!;
              }

      // 1. Проверяем namespace import (например: import * as abstractions from '...')
      const nsImport = decl.getNamespaceImport()?.getText();
      if (nsImport && hasIdentifier(fullSignatureTypeStr, nsImport)) {
        getModuleEntry().namespaceImports.add(nsImport);
      }

      // 2. Проверяем default import (например: import Foo from '...')
      const defImport = decl.getDefaultImport()?.getText();
      if (defImport && hasIdentifier(fullSignatureTypeStr, defImport)) {
        getModuleEntry().defaultImports.add(defImport);
      }

      // 3. Проверяем named imports (например: import { Index, Size as CustomSize } from '...')
      for (const named of decl.getNamedImports()) {
        const localName = named.getAliasNode()?.getText() || named.getName();
        if (hasIdentifier(fullSignatureTypeStr, localName)) {
          getModuleEntry().namedImports.set(named.getName(), localName);
        }
      }
    }
  }

  // Форматируем в строки импорта
  const resultLines: string[] = [];
  for (const [moduleSpecifier, data] of importsMap.entries()) {
    for (const ns of data.namespaceImports) {
      resultLines.push(`import * as ${ns} from '${moduleSpecifier}';`);
    }
    for (const def of data.defaultImports) {
      resultLines.push(`import ${def} from '${moduleSpecifier}';`);
    }
    if (data.namedImports.size > 0) {
      const specifiers = Array.from(data.namedImports.entries()).map(([name, alias]) => {
        return name === alias ? name : `${name} as ${alias}`;
      });
      resultLines.push(`import { ${specifiers.join(', ')} } from '${moduleSpecifier}';`);
    }
  }

  return resultLines.join('\n');
}

function hasIdentifier(text: string, identifier: string): boolean {
  const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`).test(text);
}

/**
 * 2. Генерирует файл прототипа
 */
function generatePrototypeFile(outputFile: string, ext: ExtensionConfig) {
  const packageName = `@razomy/${ext.name}`;
  const importAlias = tsRefactor.toSafeName(stringCase.camelCase(ext.name));
  const className = stringCase.pascalCase(ext.name) + 'Extension';

  const code = `// AUTO-GENERATED PROTOTYPE FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.
import * as ${importAlias} from '${packageName}';

// --- RUNTIME BINDINGS ---
for (const key of Object.getOwnPropertyNames(${importAlias}.${className}.prototype)) {
  if (key !== 'constructor' && !(key in ${ext.targetObject}.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(${importAlias}.${className}.prototype, key);
    if (descriptor) {
      Object.defineProperty(${ext.targetObject}.prototype, key, descriptor);
    }
  }
}

// --- TYPESCRIPT DECLARATIONS ---
declare global {
  interface ${ext.targetPrototype} extends ${importAlias}.${className} {}
}

export {};
`;

  writeFileSafe(outputFile, code);
  console.log(`[SUCCESS PROTOTYPE] Сохранено в: ${outputFile}`);
}

function writeFileSafe(filePath: string, content: string) {
  const outputDir = path.dirname(filePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

function indentLines(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text.split('\n').map(line => pad + line).join('\n');
}
