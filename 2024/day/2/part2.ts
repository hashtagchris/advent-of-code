import { stdinAsNumbersStream } from "./streams.ts";

let safeReports = 0;
for await (const report of stdinAsNumbersStream()) {
  if (safeReport(report, 1)) {
    safeReports++;
  }
}
console.log(safeReports);

function safeReport(report: number[], remainingRemovals: number): boolean {
  // check for steadily increasing, then decreasing
  for (const increasing of [true, false]) {
    for (let i = 1; i <= report.length; i++) {
      if (i === report.length) {
        return true;
      }

      const delta = increasing
        ? report[i] - report[i - 1]
        : report[i - 1] - report[i];

      if (delta < 1 || delta > 3) {
        if (remainingRemovals) {
          // Note: We might be removing an element unnecessarily, in the case of steadily decreasing numbers.
          // Example: 7,6,4,2,1 => 6,4,2,1
          const revisedReport = report.toSpliced(i - 1, 1);
          if (safeReport(revisedReport, remainingRemovals - 1)) {
            // console.log(`Dampener: ${report} => ${revisedReport}`)
            return true;
          }

          const revisedReport2 = report.toSpliced(i, 1);
          if (safeReport(revisedReport2, remainingRemovals - 1)) {
            // console.log(`Dampener: ${report} => ${revisedReport2}`)
            return true;
          }
        }
        break;
      }
    }
  }

  return false;
}
