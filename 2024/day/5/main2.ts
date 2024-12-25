import { evaluate } from "./part2.ts";

const input = await Deno.readTextFile(Deno.args[0]);
const result = evaluate(input);

console.log(result);
