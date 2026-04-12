import type {Task} from "./task/task_controller";

export interface RunFunctionTask extends Task {
  type: 'instant';
  packageName: string;
  functionPath: string[];
  functionName: string;
  arguments_: any[];
  result?: any | null;
}
