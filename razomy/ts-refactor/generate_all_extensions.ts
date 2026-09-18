import {Project, TypeFormatFlags} from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import * as stringCase from "@razomy/string-case";
import * as tsRefactor from "@razomy/ts-refactor";

// --- ОПТИМИЗИРОВАННЫЙ КОНФИГ ---
interface ExtensionConfig {
  name: string;             // Имя папки в razomy (например, 'string', 'array')
  pkgType: 'string' | 'array'; // Как проверять первый аргумент
  targetObject: string;     // JS-объект ('String', 'Array')
  targetPrototype: string;  // TS-интерфейс ('String', 'Array<T>')
}

export async function generateAllExtensions(projectPath: string, extensions: ExtensionConfig[]) {
  // 1. Инициализируем ts-morph ОДИН РАЗ (огромный прирост производительности)
  const tsConfigPath = path.resolve(projectPath, 'tsconfig.json');
  console.log(`Initializing global project at ${tsConfigPath}...`);

  const project = new Project({tsConfigFilePath: tsConfigPath});
  const allFiles = project.getSourceFiles();

  for (const ext of extensions) {
    console.log(`\n--- Processing @razomy/${ext.name} ---`);

    // Формируем пути программно на основе имени
    const packageDir = path.resolve(projectPath, `razomy/${ext.name}`).replace(/\\/g, '/');
    const packageName = `@razomy/${ext.name}`;
    const outputFile = path.resolve(projectPath, `razomy/razomy-extensions/${stringCase.snakeCase(ext.name)}.ts`);

    // Фильтруем файлы ТОЛЬКО для текущего пакета
    const packageFiles = allFiles.filter(file => file.getFilePath().startsWith(packageDir));

    if (packageFiles.length === 0) {
      console.warn(`[WARNING] Файлы не найдены в: ${packageDir}`);
      continue;
    }

    const functionsToBind = [] as any[];

    for (const file of packageFiles) {
      const exportedFunctions = file.getFunctions().filter((f) => f.isExported() && f.getName());

      for (const func of exportedFunctions) {
        const name = func.getName()!;
        const parameters = func.getParameters();

        if (parameters.length === 0) continue;

        const firstParam = parameters[0];
        const firstParamType = firstParam.getType();

        // Берем ИМЕННО ТОТ текст типа, который разработчик написал в коде (например 'T[]' или 'string')
        const firstParamOriginalType = firstParam.getTypeNode()?.getText()
          || firstParamType.getText(func, TypeFormatFlags.NoTruncation);

        if (ext.pkgType === 'string') {
          if (!firstParamType.isString() && !firstParamType.isStringLiteral()) {
            console.log(`[SKIP] ${name} (1-й аргумент не строка)`);
            continue;
          }
        } else if (ext.pkgType === 'array') {
          if (!firstParamType.isArray() && !firstParamOriginalType.includes('[]') && !firstParamOriginalType.includes('Array<')) {
            console.log(`[SKIP] ${name} (1-й аргумент не массив)`);
            continue;
          }
        }

        const typeParameters = func.getTypeParameters().map(tp => tp.getText()).join(', ');
        const genericStr = typeParameters ? `<${typeParameters}>` : '';

        const remainingParams = parameters.slice(1).map((p) => {
          const isOptional = p.isOptional() ? '?' : '';
          // Аналогично, стараемся брать оригинальный текст типа параметра
          const typeStr = p.getTypeNode()?.getText() || p.getType().getText(func, TypeFormatFlags.NoTruncation);
          const isRest = p.isRestParameter() ? '...' : '';
          return `${isRest}${p.getName()}${isOptional}: ${typeStr}`;
        });

        const returnType = func.getReturnTypeNode()?.getText() || func.getReturnType().getText(func, TypeFormatFlags.NoTruncation);

        // ИСПОЛЬЗУЕМ ОРИГИНАЛЬНЫЙ ТИП для this (теперь тут будет this: T[] вместо any[])
        const interfaceSignature = `${name}${genericStr}(this: ${firstParamOriginalType}, ${remainingParams.join(', ')}): ${returnType};`;

        functionsToBind.push({
          name,
          originalSignature: func.getSignature().getDeclaration().getText(),
          interfaceSignature,
        });

        console.log(`[ADD] ${name} успешно добавлена.`);
      }
    }
    const name = tsRefactor.toSafeName(stringCase.camelCase(ext.name));
    const importsCode = `import * as ${name} from '${packageName}';\n\n`;
    let runtimeCode = `// --- RUNTIME BINDINGS ---\n`;
    let typesCode = `// --- TYPESCRIPT DECLARATIONS ---\ndeclare global {\n  interface ${ext.targetPrototype} {\n`;

    for (const fn of functionsToBind) {
      runtimeCode += `if (!${ext.targetObject}.prototype.${fn.name}) {\n`;
      runtimeCode += `  Object.defineProperty(${ext.targetObject}.prototype, '${fn.name}', {\n`;
      runtimeCode += `    value: function (...args: any[]) {\n`;
      runtimeCode += `      return (${name} as any).${fn.name}(this as any, ...args);\n`;
      runtimeCode += `    },\n`;
      runtimeCode += `    writable: true,\n`;
      runtimeCode += `    configurable: true\n`;
      runtimeCode += `  });\n}\n\n`;

      typesCode += `    /** Based on: ${fn.originalSignature} */\n`;
      typesCode += `    ${fn.interfaceSignature}\n`;
    }

    typesCode += `  }\n}\n`;

    const finalCode = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.\n${importsCode}${runtimeCode}${typesCode}export {};\n`;

    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, finalCode, 'utf-8');
    console.log(`[SUCCESS] Сохранено в: ${outputFile}`);
  }

  console.log('\nAll done!');
}
