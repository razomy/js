import {type Tool} from 'ollama';
import {choose, getDirFiles, getFile, setFile} from './functions';
import path from 'path';
import {ToolExecuteLlmException} from './llm';

export type ToolContext = {
  project: { dirPath: string },
  choose: {
    index: number,
    data: string[],
  },
  getDirFiles: string[],
  getFile: Record<string, string>,
  setFile: Record<string, string>,
}

export const tools = {
  choose: {
    type: 'function',
    function: {
      name: 'choose',
      description: 'Decide',
      parameters: {
        type: 'object',
        required: ['index'],
        properties: {
          index: {
            type: 'index',
            description: 'Index of data'
          },
        },
      },
    },
  },
  getDirFiles: {
    type: 'function',
    function: {
      name: 'getDirFiles',
      description: 'Получить список файлов в папке',
    },
  },
  getFile: {
    type: 'function',
    function: {
      name: 'getFile',
      description: 'Прочитать текст из файла',
      parameters: {
        type: 'object',
        required: ['filePath'],
        properties: {
          filePath: {
            type: 'string',
            description: 'Путь к файлу'
          },
        },
      },
    },
  },
  setFile: {
    type: 'function',
    function: {
      name: 'setFile',
      description: 'Записать текст в файла',
      parameters: {
        type: 'object',
        required: ['filePath'],
        properties: {
          filePath: {
            type: 'string',
            description: 'Путь к файлу'
          },
          data: {
            type: 'string',
            description: 'Новый текст файла'
          },
        },
      },
    },
  },
} satisfies Record<string, Tool>;

export function executeToolMut(ctx: ToolContext, function_: any) {
  let toolResult = '';
  try {
    if (function_.name === 'getDirFiles') {
      ctx.getDirFiles = getDirFiles(path.join(ctx.project.dirPath));
      toolResult = JSON.stringify(ctx.getDirFiles);
    } else if (function_.name === 'getFile') {
      ctx.getFile[function_.arguments.filePath] = getFile(path.join(ctx.project.dirPath, function_.arguments.filePath));
      toolResult = JSON.stringify(ctx.getFile[function_.arguments.filePath]);
    } else if (function_.name === 'setFile') {
      ctx.setFile[function_.arguments.filePath] = function_.arguments.data;
      setFile(function_.arguments.filePath, function_.arguments.data);
      toolResult = JSON.stringify('void');
    } else if (function_.name === 'choose') {
      ctx.choose.index = +(function_.arguments.index);
      choose(ctx.choose.data, function_.arguments.index);
      toolResult = JSON.stringify(ctx.choose.index);
    }
  } catch (error: any) {
    console.error(`Ошибка в инструменте ${function_.name}:`, error.message);
    throw new ToolExecuteLlmException(error.toString(), 'No error expected')
  }
  return toolResult;
}
