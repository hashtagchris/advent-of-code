export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  // let stones: number[] = mapText.split(/\s+/u).map((v) => parseInt(v));

  let stoneMap: { [key: string]: number } = {
    "3": 1,
    "386358": 1,
    "86195": 1,
    "85": 1,
    "1267": 1,
    "3752457": 1,
    "0": 1,
    "741": 1,
  };

  for (let i = 0; i < 75; i++) {
    const newStoneMap = {};
    for (const stoneValText of Object.keys(stoneMap)) {
      const count: number = stoneMap[stoneValText];
      const stoneVal = parseInt(stoneValText);

      if (stoneValText === "0") {
        incrementCount(newStoneMap, "1", count);
      } else if (stoneValText.length % 2 === 0) {
        const keys: string[] = [
          parseInt(stoneValText.slice(0, stoneValText.length / 2)).toString(),
          parseInt(
            stoneValText.slice(stoneValText.length / 2, stoneValText.length),
          ).toString(),
        ];

        for (const key of keys) {
          incrementCount(newStoneMap, key, count);
        }
      } else {
        const key = (stoneVal * 2024).toString();
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
  map: { [key: string]: number },
  key: string,
  val: number,
) {
  if (map[key] === undefined) {
    map[key] = 0;
  }
  map[key] += val;
}
