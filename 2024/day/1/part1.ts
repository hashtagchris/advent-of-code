import { stdinAsNumberPairStream } from "./streams.ts";

const left: Array<number> = [];
const right: Array<number> = [];

for await (const numbers of stdinAsNumberPairStream()) {
  if (numbers.length != 2) {
    throw new Error(
      `Expected a pair of numbers, not ${numbers.length}: ${numbers}`,
    );
  }
  left.push(numbers[0]);
  right.push(numbers[1]);
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < left.length; i++) {
  const distance = Math.abs(left[i] - right[i]);
  totalDistance += distance;
}

console.log(totalDistance);

// Functional alternative, with some array logging:

// const distances = right.map((v, i) => Math.abs(left[i] - right[i]));
// const totalDistance = distances.reduce((acc, v) => acc + v);

// console.log(left);
// console.log(right);
// console.log(distances);
// console.log(totalDistance);
