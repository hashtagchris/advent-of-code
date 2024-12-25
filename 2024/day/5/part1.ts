export function evaluate(input: string): number {
  const lines = input.split(/\n/u).map((line) => line.trim());

  const blankIdx = lines.indexOf("");

  const firstLines = lines.slice(0, blankIdx);
  const secondLines = lines.slice(blankIdx + 1);

  const orderPairs = firstLines.map((line) => line.split("|"));
  const updates = secondLines.map((line) => {
    return {
      pages: line.split(","),
      valid: true,
    };
  });

  for (const orderPair of orderPairs) {
    for (const update of updates) {
      const firstIdx = update.pages.indexOf(orderPair[0]);
      const secondIdx = update.pages.indexOf(orderPair[1]);

      if (secondIdx < firstIdx && secondIdx > -1) {
        update.valid = false;
      }
    }
  }

  const middleSum = updates
    .filter((u) => u.valid)
    // add up the middle page numbers
    .reduce(
      (acc, cv) => acc + parseInt(cv.pages[(cv.pages.length - 1) / 2]),
      0,
    );

  return middleSum;
}
