export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  const stones: number[] = mapText.split(/\s+/u).map((v) => parseInt(v));

  // Actually { [key: string]: number }, but JavaScript coerces keys to strings.
  let stoneMap: { [key: number]: number } = {};
  for (const stone of stones) {
    stoneMap[stone] = 1;
  }

  for (let i = 0; i < 75; i++) {
    const newStoneMap = {};
    for (const stoneValText of Object.keys(stoneMap)) {
      const stoneVal = parseInt(stoneValText);
      const count: number = stoneMap[stoneVal];

      if (stoneVal === 0) {
        increment(newStoneMap, 1, count);
      } else if (stoneValText.length % 2 === 0) {
        const keys: number[] = [
          parseInt(stoneValText.slice(0, stoneValText.length / 2)),
          parseInt(
            stoneValText.slice(stoneValText.length / 2, stoneValText.length),
          ),
        ];

        for (const key of keys) {
          increment(newStoneMap, key, count);
        }
      } else {
        const key = stoneVal * 2024;
        increment(newStoneMap, key, count);
      }
    }
    stoneMap = newStoneMap;
    const totalCount = Object.values(stoneMap).reduce((p, c) => p + c);

    console.log(`${i}: ${totalCount}, ${JSON.stringify(stoneMap)}`);
    // console.log(`${stones.length} stones: ${stones}`);
  }

  const totalCount = Object.values(stoneMap).reduce((p, c) => p + c);
  return totalCount;
}

function increment(
  map: { [key: number]: number },
  key: number,
  val: number,
) {
  map[key] = (map[key] ?? 0) + val;
}
