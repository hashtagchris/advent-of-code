import { stdinAsNumbersStream } from "./streams.ts";

let safeReports = 0;
for await (const report of stdinAsNumbersStream()) {
  if (safeReport(report)) {
    safeReports++;
  }
}
console.log(safeReports);

function safeReport(report: number[]): boolean {
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
        break;
      }
    }
  }

  return false;
}
