import path from 'path';
import * as tsRala from '@razomy/ts-rala';
import * as array from '@razomy/array';
import * as ai from '@razomy/ai';
import * as fss from '@razomy/fss';
import * as shell from '@razomy/shell';

export type ToolContext = {
  project: { dirPath: string };
};

export const TOOLS = [
  {
    spec: tsRala.createPackageFunction({
      name: 'getAllFlat',
      description: 'Получить список файлов в папке recursive',
      parameter: {
        filePath: 'Путь к файлу',
      },
      return_: {
        description: 'Return list of files',
      },
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string } }) {
      const files = fss.recursive.getAllFlat(path.join(ctx.project.dirPath, args.arguments_.filePath));
      return files.map(file => {file.replace(ctx.project.dirPath, '')})
    },
  },
  {
    spec: tsRala.createPackageFunction({
      name: 'getFile',
      description: 'Прочитать текст из файла',
      parameter: {
        filePath: 'Путь к файлу',
      },
      return_: {
        description: 'Return list of files',
      },
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string } }) {
      return fss.file.getSync(path.join(ctx.project.dirPath, args.arguments_.filePath));
    }
  },
  {
    spec: tsRala.createPackageFunction({
      name: 'setFile',
      description: 'Записать текст в файла',
      parameter: {
        filePath: 'Путь к файлу',
        data: 'Новый текст файла',
      },
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string, data:string } }) {
       fss.file.setSync(path.join(ctx.project.dirPath, args.arguments_.filePath), args.arguments_.data);
       return 'void';
    }
  },
  {
    spec: tsRala.createPackageFunction({
      name: 'build',
      description: 'Build project',
      parameter: {},
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string, data:string } }) {
      return shell.execute('npm run build');
    }
  },
];

export const TOOL_REGISTRY = array.mapToDictBy(TOOLS, (i) => i.spec.identifier.name);

export function executeToolMut(ctx: ToolContext, function_: any) {
  try {
    return TOOL_REGISTRY[function_.spec.identifier.name]!.fn(ctx, function_);
  } catch (error: any) {
    console.error(`Ошибка в инструменте ${function_.name}:`, error.message);
    throw new ai.ToolExecuteLlmException(error.toString(), 'No error expected');
  }
}
