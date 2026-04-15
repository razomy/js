import * as random from '@razomy/random';
import * as run from '@razomy/run';

export function createMut<T extends run.task.Task>(
  tasks: Map<string, run.task.Task>,
  handlers: Map<string, run.task.TaskHandler<any>>,
  type: T['type'],
  payload: Omit<T, keyof run.task.Task>,
): string {
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
  run.task.processJobMut(handlers, task);
  return id;
}
