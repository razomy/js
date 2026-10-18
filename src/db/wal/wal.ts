import * as db from "@razomy/db";

export interface Wal {
  walEntrySize: number;
  walBuffer: ArrayBuffer;
  walU32: Uint32Array;
  walF32: Float32Array;
  walHead: number;
  push(op: db.OpCode, entity: number, field: number, arg1?: number, arg2?: number, arg3?: number): void;
  clear(): void;
}
