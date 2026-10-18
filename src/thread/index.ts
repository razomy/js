// Imports
import { threadToPromise } from './thread_to_promise';
import { threadsToPromise } from './threads_to_promise';
import { threadsToPromises } from './threads_to_promises';
import { workerToPromise } from './worker_to_promise';

// Named exports
export {
  threadToPromise,
  threadsToPromise,
  threadsToPromises,
  workerToPromise
};

// Default export
const thread = {
  threadToPromise,
  threadsToPromise,
  threadsToPromises,
  workerToPromise,
};

export default thread;
