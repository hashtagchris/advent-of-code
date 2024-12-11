export function evaluate(mapText: string): number {
  // convert the text to a 2D array of integers.
  let stones: number[] = mapText.split(/\s+/u).map((v) => parseInt(v));

  for (let i = 0; i < 25; i++) {
    const newStones = [];
    for (const stone of stones) {
      const stoneValText = stone.toString();

      if (stone === 0) {
        newStones.push(1);
      } else if (stoneValText.length % 2 === 0) {
        newStones.push(
          parseInt(stoneValText.slice(0, stoneValText.length / 2)),
        );
        newStones.push(
          parseInt(
            stoneValText.slice(stoneValText.length / 2, stoneValText.length),
          ),
        );
      } else {
        newStones.push(stone * 2024);
      }
    }
    stones = newStones;
    console.log(`${i}: ${stones.length}`);
    // console.log(`${stones.length} stones: ${stones}`);
  }

  return stones.length;
}
