export function evaluate(line: string): number {
  const mulRegex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;

  let sum = 0;
  let enabled = true;
  for (const matches of line.matchAll(mulRegex)) {
    console.log(matches[0]);

    if (matches[0] === "do()") {
      enabled = true;
      continue;
    }

    if (matches[0] === "don't()") {
      enabled = false;
      continue;
    }

    if (!enabled) {
      continue;
    }

    const a = parseInt(matches[1]);
    const b = parseInt(matches[2]);
    const result = a * b;
    console.log(`+${result}`);
    sum += result;
  }

  return sum;
}
