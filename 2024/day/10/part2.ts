export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  const map: number[][] = mapText.split(/\n/u)
    // ignore blank lines
    .filter(Boolean)
    // Another option for parsing the string's Unicode code points: [...line].map((v) => parseInt(v))
    .map((line) => line.split(/\s?/u).map((v) => parseInt(v)));

  let totalScore = 0;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 0) {
        const score = workingPaths(r, c, map);
        console.log(`trailHeadScore: ${score}`);
        totalScore += score;
      }
    }
  }

  return totalScore;
}

function workingPaths(
  r: number,
  c: number,
  map: number[][],
) {
  if (map[r][c] === 9) {
    return 1;
  }

  // check each direction for an increase in altitude
  let sum = 0;

  // up
  if (r - 1 >= 0 && map[r - 1][c] === map[r][c] + 1) {
    sum += workingPaths(r - 1, c, map);
  }

  // down
  if (r + 1 < map.length && map[r + 1][c] === map[r][c] + 1) {
    sum +=  workingPaths(r + 1, c, map);
  }

  // left
  if (c - 1 >= 0 && map[r][c - 1] === map[r][c] + 1) {
    sum +=  workingPaths(r, c - 1, map);
  }

  // right
  if (c + 1 < map[r].length && map[r][c + 1] === map[r][c] + 1) {
    sum += workingPaths(r, c + 1, map);
  }

  return sum;
}
