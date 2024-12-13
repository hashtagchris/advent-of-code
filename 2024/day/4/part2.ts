// I didn't get this working

export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  const map: string[][] = mapText.split(/\n/u)
    // ignore blank lines
    .filter(Boolean)
    // Another option for parsing the string's Unicode code points: [...line].map((v) => parseInt(v))
    .map((line) => line.split(/\s?/u));

  // Offsets for the 8 positions around the 'A' in MAS:
  // 012
  // 7*3
  // 654
  const deltas = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  let totalScore = 0;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === "A") {
        let masFound = 0;
        for (let di = 0; di < deltas.length; di++) {
          const d0 = deltas[di];
          const d2 = deltas[(di + 2) % 8];
          const d4 = deltas[(di + 4) % 8];
          const d6 = deltas[(di + 6) % 8];

          if (
            map[r + d0[0]]?.[c + d0[1]] === "M" &&
            map[r + d2[0]]?.[c + d2[1]] === "M" &&
            map[r + d4[0]]?.[c + d4[1]] === "S" &&
            map[r + d6[0]]?.[c + d6[1]] === "S"
          ) {
            masFound = 1;
            continue;
          }
        }

        totalScore += masFound;
      }
    }
  }

  return totalScore;
}
