import { stdinAsNumberPairStream } from "./streams.ts";

const numbersStream = await stdinAsNumberPairStream();

const left: { [key: string]: number } = {};
const right: { [key: string]: number } = {};

for await (const numbers of numbersStream) {
  if (numbers.length != 2) {
    throw new Error(
      `Expected a pair of numbers, not ${numbers.length}: ${numbers}`,
    );
  }
  if (left[numbers[0]] === undefined) {
    left[numbers[0]] = 0;
  }
  left[numbers[0]]++;

  if (right[numbers[1]] === undefined) {
    right[String(numbers[1])] = 0;
  }
  right[numbers[1]]++;
}

let totalScore = 0;
for (const leftNum of Object.keys(left)) {
  const leftCount = left[leftNum];
  const rightCount = right[leftNum] ?? 0;

  const score = parseInt(leftNum) * leftCount * rightCount;
  totalScore += score;
}

console.log(totalScore);
