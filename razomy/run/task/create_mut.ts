import * as random from "@razomy/random";
import type {Task, TaskHandler} from "./task_controller";
import {processJobMut} from "./process_job_mut";

export function createMut<T extends Task>(tasks: Map<string, Task>, handlers: Map<string, TaskHandler<any>>, type: T['type'], payload: Omit<T, keyof Task>): string {
  const id = random.createUuid();
  const abortController = new AbortController();
  const task = {
    id,
    type,
    status: 'pending',
    createdAt: Date.now(),
    abortController,
    ...payload,
  } as unknown as T;
  tasks.set(id, task);
  processJobMut(handlers, task);
  return id;
}
