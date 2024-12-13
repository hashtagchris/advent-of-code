export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  const map: string[][] = mapText.split(/\n/u)
    // ignore blank lines
    .filter(Boolean)
    // Another option for parsing the string's Unicode code points: [...line].map((v) => parseInt(v))
    .map((line) => line.split(/\s?/u));

  let totalScore = 0;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === "X") {
        if (
          map[r - 1]?.[c] == "M" && map[r - 2]?.[c] == "A" &&
          map[r - 3]?.[c] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r + 1]?.[c] == "M" && map[r + 2]?.[c] == "A" &&
          map[r + 3]?.[c] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r]?.[c - 1] == "M" && map[r]?.[c - 2] == "A" &&
          map[r]?.[c - 3] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r]?.[c + 1] == "M" && map[r]?.[c + 2] == "A" &&
          map[r]?.[c + 3] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r - 1]?.[c - 1] == "M" && map[r - 2]?.[c - 2] == "A" &&
          map[r - 3]?.[c - 3] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r - 1]?.[c + 1] == "M" && map[r - 2]?.[c + 2] == "A" &&
          map[r - 3]?.[c + 3] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r + 1]?.[c + 1] == "M" && map[r + 2]?.[c + 2] == "A" &&
          map[r + 3]?.[c + 3] == "S"
        ) {
          totalScore++;
        }
        if (
          map[r + 1]?.[c - 1] == "M" && map[r + 2]?.[c - 2] == "A" &&
          map[r + 3]?.[c - 3] == "S"
        ) {
          totalScore++;
        }
      }
    }
  }

  return totalScore;
}
