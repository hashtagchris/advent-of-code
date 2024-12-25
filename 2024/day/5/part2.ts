export function evaluate(input: string): number {
  const lines = input.split(/\n/u).map((line) => line.trim());

  const blankIdx = lines.indexOf("");

  const firstLines = lines.slice(0, blankIdx);
  const secondLines = lines.slice(blankIdx + 1);

  const orderPairs = firstLines.map((line) => line.split("|"));
  const updates = secondLines.map((line) => {
    const pages = line.split(",");

    return {
      pages,
      validInitially: true,
    };
  });

  let stable: boolean;
  do {
    stable = true;
    for (const orderPair of orderPairs) {
      for (const update of updates) {
        const firstIdx = update.pages.indexOf(orderPair[0]);
        const secondIdx = update.pages.indexOf(orderPair[1]);

        if (secondIdx < firstIdx && secondIdx > -1) {
          update.validInitially = false;
          update.pages[firstIdx] = orderPair[1];
          update.pages[secondIdx] = orderPair[0];
          stable = false;
        }
      }
    }
  } while (!stable);

  const middleSum = updates
    // ignore the page orders that were valid initially
    .filter((u) => !u.validInitially)
    // add up the middle page numbers
    .reduce(
      (acc, cv) => acc + parseInt(cv.pages[(cv.pages.length - 1) / 2]),
      0,
    );

  return middleSum;
}
