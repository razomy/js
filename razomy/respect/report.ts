export interface HasRespect {
  respect: number;
}

export interface HasRespectReport {
  gave: number;
  received: number;
}

export function report(report: HasRespectReport, change: HasRespect) {
  if (change.respect > 0) {
    report.received += change.respect;
  } else {
    report.received -= change.respect;
  }
}
