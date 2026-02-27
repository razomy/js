import * as fs from 'fs';
import * as path from 'path';
import {WeightedMovingAverageRecorder} from '@razomy/performance';
import {record_performance} from './record_performance';

// Mock function that uses CPU time AND allocates memory
const alternatingCaseAndHeavyMemoryAsync = async (str: string): Promise<string> => {
  return new Promise((resolve) => {
    // Artificial RAM usage (creating a large array based on string length)
    // E.g., length 10 = array of 100,000 strings
    const dummyMemoryHog = new Array(str.length * 10000).fill('allocating_memory_for_test');

    const delay = str.length * 2;
    setTimeout(() => {
      const result = str.split('').map((char, i) =>
        i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join('');
      resolve(result);

      // Prevent V8 compiler from optimizing away the dummy array before execution ends
      dummyMemoryHog.length;
    }, delay);
  });
};

describe('SmartResourceEstimator (Time & RAM)', () => {
  it('measures time and memory, saves snapshot to report, and predicts future usage', async () => {
    // 1. Build history with data of different sizes
    const testCases = [
      {args: ['short string'], timeDataSize: 12, memoryDataSize: 12},
      {args: ['a'.repeat(20)], timeDataSize: 20, memoryDataSize: 20},
      {args: ['a'.repeat(40)], timeDataSize: 40, memoryDataSize: 40},
    ] as { args: [string], timeDataSize: number, memoryDataSize: number }[];

    const estimator = await record_performance(alternatingCaseAndHeavyMemoryAsync, testCases);

    // Predict resources for a huge text (10,000 chars) based on the learned history
    const hugeTextPrediction = estimator.estimate(10000, 10000);

    // 4. Create the final report data
    const reportData = {
      snapshot: estimator.exportState(),
      predictionsForHugeData: {
        timeDataSize: 10000,
        memoryDataSize: 10000,
        expectedTime: hugeTextPrediction.timeText,
        expectedMemory: hugeTextPrediction.memoryText
      }
    };


    // 3. Prepare reports directory
    const reportsDir = path.resolve('reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, {recursive: true});
    }

    // 5. Write report to disk
    const reportFilePath = path.join(reportsDir, `resource_report_${Date.now()}.json`);
    fs.writeFileSync(reportFilePath, JSON.stringify(reportData, null, 2), 'utf8');
    expect(fs.existsSync(reportFilePath)).toBe(true);

    // 6. Test Import capability for RAM & Time
    const newEstimator = new WeightedMovingAverageRecorder();

    // Load state from file
    const loadedReport = JSON.parse(fs.readFileSync(reportFilePath, 'utf8'));
    newEstimator.importState(loadedReport.snapshot);

    // Should accurately predict RAM and Time without needing to run
    const instantPrediction = newEstimator.estimate(10000, 10000);
    expect(instantPrediction.timeMs).toBeGreaterThan(0);
    expect(instantPrediction.memoryBytes).toBeGreaterThan(0);
    expect(instantPrediction.memoryText).not.toBe('Unknown (calibrating...)');

    console.log(`Expected RAM for 10k chars: ${instantPrediction.memoryText}`);
  });
});
