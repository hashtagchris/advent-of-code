import { stdinAsNumbersStream } from "./streams.ts";

let safeReports = 0;
for await (const report of stdinAsNumbersStream()) {
  const r = safeReport(report, 1);
  console.log(`${report} => ${r}`);
  if (r) {
    safeReports++;
  }
}
console.log(safeReports);

function safeReport(
  report: number[],
  remainingRemovals: number,
): number[] | undefined {
  // check first for steadily increasing, then decreasing
  for (const increasing of [true, false]) {
    for (let i = 1; i <= report.length; i++) {
      if (i === report.length) {
        return report;
      }

      const delta = increasing
        ? report[i] - report[i - 1]
        : report[i - 1] - report[i];

      if (delta < 1 || delta > 3) {
        if (remainingRemovals) {
          // Note: In the case of steadily decreasing numbers, we're removing an element unnecessarily here.
          // Example: 6,5,4,3,2,1 => 5,4,3,2,1

          // try removing the element at the previous index
          let revisedReport = report.toSpliced(i - 1, 1);
          let result = safeReport(revisedReport, remainingRemovals - 1);
          if (result) {
            return result;
          }

          // try removing the element at the current index
          revisedReport = report.toSpliced(i, 1);
          result = safeReport(revisedReport, remainingRemovals - 1);
          if (result) {
            return result;
          }
        }
        break;
      }
    }
  }

  return undefined;
}
