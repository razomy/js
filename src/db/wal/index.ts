// Imports
import { clearWal } from './clear_wal';
import { createWal } from './create_wal';
import { pushWal } from './push_wal';
import type { Wal } from './wal';
import { WalTelemetry } from './wal_telemetry';

// Named exports
export {
  WalTelemetry,
  clearWal,
  createWal,
  pushWal
};
export type {
  Wal
};

// Default export
const wal = {
  clearWal,
  createWal,
  pushWal,
  WalTelemetry,
};


export default wal;
