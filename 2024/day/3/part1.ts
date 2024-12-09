export function evaluate(line: string): number {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let sum = 0;
  for (const matches of line.matchAll(mulRegex)) {
    const a = parseInt(matches[1]);
    const b = parseInt(matches[2]);
    const result = a * b;
    console.log(`${matches[0]} => ${result}`);
    sum += result;
  }

  return sum;
}
