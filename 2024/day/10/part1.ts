export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  const map: number[][] = mapText.split(/\n/g)
    // ignore blank lines
    .filter(Boolean)
    // Another option for parsing the string's Unicode code points: [...line].map((v) => parseInt(v))
    .map((line) => line.split(/\s?/).map((v) => parseInt(v)));

  let totalScore = 0;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 0) {
        const trailEnds = new Set<string>();
        workingPaths(r, c, map, trailEnds);
        console.log(`trailHeadScore: ${trailEnds.size}`);
        totalScore += trailEnds.size;
      }
    }
  }

  return totalScore;
}

function workingPaths(
  r: number,
  c: number,
  map: number[][],
  trailEnds: Set<string>,
) {
  if (map[r][c] === 9) {
    // I'm adding the string representation of coordinates to the Set because you can't override the comparison of objects.
    // new Set([{ a: 1 }, { a: 1 }]).size returns 2.
    // See https://stackoverflow.com/questions/29759480/how-to-customize-object-equality-for-javascript-set
    trailEnds.add(JSON.stringify({ r, c }));
    return;
  }

  // check each direction for an increase in altitude

  // up
  if (r - 1 >= 0 && map[r - 1][c] === map[r][c] + 1) {
    workingPaths(r - 1, c, map, trailEnds);
  }

  // down
  if (r + 1 < map.length && map[r + 1][c] === map[r][c] + 1) {
    workingPaths(r + 1, c, map, trailEnds);
  }

  // left
  if (c - 1 >= 0 && map[r][c - 1] === map[r][c] + 1) {
    workingPaths(r, c - 1, map, trailEnds);
  }

  // right
  if (c + 1 < map[r].length && map[r][c + 1] === map[r][c] + 1) {
    workingPaths(r, c + 1, map, trailEnds);
  }
}
