// Imports
import * as bigO from './big_o';
import { estimate } from './estimate';
import { formatMemory } from './format_memory';
import { formatTime } from './format_time';
import { measureComplexity } from './measure_complexity';
import { nStringTestCasesRecordPerformance } from './n_string_test_cases_record_performance';
import { Performance, performance_ } from './performance';
import type { HardwareLimitation, OptimizationTradeoff } from './performance';
import { performanceCb } from './performance_cb';
import { recordPerformance } from './record_performance';
import { WeightedMovingAverageRecorder } from './weighted_moving_average_recorder';
import type { PerformanceRecord, Prediction } from './weighted_moving_average_recorder';

// Named exports
export {
  Performance,
  WeightedMovingAverageRecorder,
  bigO,
  estimate,
  formatMemory,
  formatTime,
  measureComplexity,
  nStringTestCasesRecordPerformance,
  performance_,
  performanceCb,
  recordPerformance
};
export type {
  HardwareLimitation,
  OptimizationTradeoff,
  PerformanceRecord,
  Prediction
};

// Default export
const performance = {
  bigO,
  estimate,
  formatMemory,
  formatTime,
  measureComplexity,
  nStringTestCasesRecordPerformance,
  Performance,
  performance_,
  performanceCb,
  recordPerformance,
  WeightedMovingAverageRecorder,
};


export default performance;
