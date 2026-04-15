import * as run from "@razomy/run";

export interface RunFunctionTask extends run.task.Task {
  type: 'instant';
  packageName: string;
  functionPath: string[];
  functionName: string;
  arguments_: any[];
  result?: any | null;
}
