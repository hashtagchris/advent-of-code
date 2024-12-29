export function evaluate(input: string): number {
  const lines = input.split(/\n/u).map((line) => line.trim());

  const blankIdx = lines.indexOf("");

  const firstLines = lines.slice(0, blankIdx);
  const secondLines = lines.slice(blankIdx + 1);

  // create a map to support sorting pages
  const orderMap: { [key: string]: { [key: string]: number } } = {};

  for (const orderPair of firstLines.map((line) => line.split("|"))) {
    orderMap[orderPair[0]] ||= {};
    orderMap[orderPair[1]] ||= {};

    // the first page comes before the second page. Given 43|66, our compare function
    // should return -1 for (43, 66), and 1 for (66, 43).
    orderMap[orderPair[0]][orderPair[1]] = -1;
    orderMap[orderPair[1]][orderPair[0]] = 1;
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
    update.sortedPages = update.pages.toSorted((a, b) => orderMap[a]?.[b] || 0);

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
