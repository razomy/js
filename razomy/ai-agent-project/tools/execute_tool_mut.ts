import {getDirFiles, getFile, setFile} from '../functions';
import path from 'path';
import {ToolExecuteLlmException} from '../../ai/must_use_tool_llm_exception';
import * as fns from "@razomy/fns";
import * as abstracts from "@razomy/abstracts";
import * as array from "@razomy/array";

export type ToolContext = {
  project: { dirPath: string },
  getDirFiles: string[],
  getFile: Record<string, string>,
  setFile: Record<string, string>,
}

export const TOOLS = [
  fns.createPackageFunction({
    name: 'getDirFiles',
    description: 'Получить список файлов в папке',
    return_: {
      description: 'Return list of files'
    }
  }),
  fns.createPackageFunction({
    name: 'getFile',
    description: 'Прочитать текст из файла',
    parameter: {
        filePath: 'Путь к файлу'
      },
    return_: {
      description: 'Return list of files'
    }
  }),
  fns.createPackageFunction({
    name: 'setFile',
    description: 'Записать текст в файла',
    parameter: {
      key: 'filePath',
      filePath: 'Путь к файлу',
      data: 'Новый текст файла',
    },

  })
] satisfies abstracts.ast.FunctionDeclaration[];

export const TOOL_REGISTRY = array.mapToDictBy(TOOLS, (i)=>i.identifier.name);

export function executeToolMut(ctx: ToolContext, function_: any) {
  let toolResult = '';
  try {
    if (function_.identifier.name === 'getDirFiles') {
      ctx.getDirFiles = getDirFiles(path.join(ctx.project.dirPath));
      toolResult = JSON.stringify(ctx.getDirFiles);
    } else if (function_.identifier.name === 'getFile') {
      ctx.getFile[function_.expression.value] = getFile(path.join(ctx.project.dirPath, function_.expression[0].value));
      toolResult = JSON.stringify(ctx.getFile[function_.expression[0].value]);
    } else if (function_.identifier.name === 'setFile') {
      ctx.setFile[function_.arguments_[0].value] = function_.expression[1].value;
      setFile(function_.expression[0].value, function_.expression[1].value);
      toolResult = JSON.stringify('void');
    }
  } catch (error: any) {
    console.error(`Ошибка в инструменте ${function_.name}:`, error.message);
    throw new ToolExecuteLlmException(error.toString(), 'No error expected')
  }
  return toolResult;
}
