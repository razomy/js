import path from 'path';
import * as tsRl from "@razomy/ts-rl";
import * as array from '@razomy/array';
import * as ai from '@razomy/ai';
import * as fss from '@razomy/fss';
import * as shell from '@razomy/shell';
import * as aiScenarios from "@razomy/ai-scenarios";

export type ToolContext = {
  project: { dirPath: string };
};

export const TOOLS = [
  {
    spec: tsRl.createPackageFunction({
      name: 'getAllFlat',
      description: 'Получить список файлов в папке recursive',
      parameter: {
        filePath: 'Путь к файлу',
      },
      returnShape: {
        description: 'Return list of files',
      },
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string } }) {
      const files = fss.recursive.getAllFlat(path.join(ctx.project.dirPath, args.arguments_.filePath));
      return files.map(file => {
        file.replace(ctx.project.dirPath, '')
      })
    },
  },
  {
    spec: tsRl.createPackageFunction({
      name: 'delegate',
      description: 'Delegate tool',
      parameter: {
        task: 'Well defined atomic task',
        exctation: 'WEll defined expected result',
      },
      returnShape: {
        description: 'Return short Description of task result',
      },
    }),
    async fn(ctx: ToolContext, args: { arguments_: { task: string, exctation: string } }) {
      let i = 0;
      while (i++ < 100) {
        const res = await aiScenarios.refactor.ai.predictSuT(ctx,`
      You recevie a task you need to complete.
      Use any avaible instrument to complete it.
      its task complete return 'DONE';
      `,
          args.arguments_.task,
          [
            TOOL_REGISTRY.getAllFlat.spec,
            TOOL_REGISTRY.getFile.spec,
            TOOL_REGISTRY.setFile.spec,
          ])
        if (res.content.includes('DONE')) {
          return res;
        }
      }
      return;
    },
  },
  {
    spec: tsRl.createPackageFunction({
      name: 'getFile',
      description: 'Прочитать текст из файла',
      parameter: {
        filePath: 'Путь к файлу',
      },
      returnShape: {
        description: 'Return list of files',
      },
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string } }) {
      return fss.file.getSync(path.join(ctx.project.dirPath, args.arguments_.filePath));
    }
  },
  {
    spec: tsRl.createPackageFunction({
      name: 'setFile',
      description: 'Записать текст в файла',
      parameter: {
        filePath: 'Путь к файлу',
        data: 'Новый текст файла',
      },
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string, data: string } }) {
      fss.file.setSync(path.join(ctx.project.dirPath, args.arguments_.filePath), args.arguments_.data);
      return 'void';
    }
  },
  {
    spec: tsRl.createPackageFunction({
      name: 'build',
      description: 'Build project',
      parameter: {},
    }),
    fn(ctx: ToolContext, args: { arguments_: { filePath: string, data: string } }) {
      return shell.execute('npm run build');
    }
  },
] as const;

export const TOOL_REGISTRY: Record<typeof TOOLS[number]['spec'][1]['identifier'], typeof TOOLS[number]> =
  array.mapToDictBy(TOOLS as any, (i) => i.spec[1].identifier)
;

export async function executeToolMut(ctx: ToolContext, function_: any):Promise<ai.AiMessage> {
  try {
    const toolREs= await TOOL_REGISTRY[function_.spec.identifier.name]!.fn(ctx, function_);
    return {sender: 'tool', type: 'response', content: JSON.stringify(toolREs)}
  } catch (error: any) {
    console.error(`Ошибка в инструменте ${function_.name}:`, error.message);
    throw new ai.ToolExecuteLlmException(error.toString(), 'No error expected');
  }
}
