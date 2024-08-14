export interface WithRespect {
  respect: number;
}

export interface WithRespectReport {
  gave: number;
  received: number;
}


function report(report: WithRespectReport, change: WithRespect) {
  if (change.respect > 0) {
    report.received += change.respect;
  } else {
    report.received -= change.respect;
  }
}