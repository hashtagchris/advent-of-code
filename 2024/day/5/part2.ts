const LESS_THAN = -1;
const GREATER_THAN = 1;
const EQUAL = 0;

export function evaluate(input: string): number {
  const lines = input.split(/\n/u).map((line) => line.trim());

  const blankIdx = lines.indexOf("");

  const firstLines = lines.slice(0, blankIdx);
  const secondLines = lines.slice(blankIdx + 1);

  // create a map to support sorting pages
  const orderMap: { [key: string]: { [key: string]: number } } = {};

  for (const orderPair of firstLines.map((line) => line.split("|"))) {
    // the first page comes before the second page. Given 43|66, our compare function
    // should return LESS_THAN for (43, 66).
    orderMap[orderPair[0]] ||= {};
    orderMap[orderPair[0]][orderPair[1]] = LESS_THAN;

    // Optional: Set up GREATER_THAN for the reverse order (66, 43).
    orderMap[orderPair[1]] ||= {};
    orderMap[orderPair[1]][orderPair[0]] = GREATER_THAN;
  }

  const updates = secondLines.map((line) => {
    return {
      pages: line.split(","),
      sortedPages: <string[]> [],
      validInitially: true,
    };
  });

  for (const update of updates) {
    // sort the update's pages using the order map
    update.sortedPages = update.pages.toSorted((a, b) =>
      orderMap[a]?.[b] || EQUAL
    );

    // if any pages were reordered, set validInitially to false
    update.validInitially = update.sortedPages.every((v, i) =>
      v === update.pages[i]
    );
  }

  const middleSum = updates
    // ignore the page orders that were valid initially
    .filter((u) => !u.validInitially)
    // add up the middle page numbers
    .reduce(
      (acc, cv) =>
        acc + parseInt(cv.sortedPages[(cv.sortedPages.length - 1) / 2]),
      0,
    );

  return middleSum;
}
