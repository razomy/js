import * as db from "@razomy/db";

export class WalTelemetry {
  private maxElements = 0;

  // Вызывать СТРОГО ПЕРЕД вызовом wal.clear()
  trackFrame(wal: db.wal.Wal) {
    if (wal.walHead > this.maxElements) {
      this.maxElements = wal.walHead;
    }
  }

  // Получить пиковое количество записей, которое когда-либо требовалось
  getPeakCapacity(wal: db.wal.Wal): number {
    return Math.ceil(this.maxElements / wal.walEntrySize);
  }

  // Получить текущий размер буфера в мегабайтах (для дебага)
  getCurrentMemoryMb(wal: db.wal.Wal): string {
    const bytes = wal.walBuffer.byteLength;
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  reset() {
    this.maxElements = 0;
  }
}
