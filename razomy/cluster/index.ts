// Imports
import type { HasWorkerId, WorkerEnvironment, WorkerEvent } from './has_worker_id';
import { processToPromise } from './process_to_promise';
import { processesToPromise } from './processes_to_promise';
import { processesToPromises } from './processes_to_promises';
import { workerToPromise } from './worker_to_promise';

// Named exports
export {
  processToPromise,
  processesToPromise,
  processesToPromises,
  workerToPromise
};
export type {
  HasWorkerId,
  WorkerEnvironment,
  WorkerEvent
};

// Default export
const cluster = {
  processToPromise,
  processesToPromise,
  processesToPromises,
  workerToPromise,
};


export default cluster;
