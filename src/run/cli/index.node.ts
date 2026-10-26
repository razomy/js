// Imports
import { spawnProcess } from './spawn_process.node';
import { startIt } from './start_it.node';
import { start } from './start.node';

// Named exports
export {
  spawnProcess,
  start,
  startIt
};

// Default export
const cli = {
  spawnProcess,
  startIt,
  start,
};

export default cli;
