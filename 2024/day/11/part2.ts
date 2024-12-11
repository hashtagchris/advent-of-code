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
        incrementCount(newStoneMap, 1, count);
      } else if (stoneValText.length % 2 === 0) {
        const keys: number[] = [
          parseInt(stoneValText.slice(0, stoneValText.length / 2)),
          parseInt(
            stoneValText.slice(stoneValText.length / 2, stoneValText.length),
          ),
        ];

        for (const key of keys) {
          incrementCount(newStoneMap, key, count);
        }
      } else {
        const key = stoneVal * 2024;
        incrementCount(newStoneMap, key, count);
      }
    }
    stoneMap = newStoneMap;

    let totalCount = 0;
    for (const count of Object.values(stoneMap)) {
      totalCount += count;
    }

    console.log(`${i}: ${totalCount}, ${JSON.stringify(stoneMap)}`);
    // console.log(`${stones.length} stones: ${stones}`);
  }

  let totalCount = 0;
  for (const count of Object.values(stoneMap)) {
    totalCount += count;
  }

  return totalCount;
}

function incrementCount(
  map: { [key: number]: number },
  key: number,
  val: number,
) {
  if (map[key] === undefined) {
    map[key] = 0;
  }
  map[key] += val;
}
