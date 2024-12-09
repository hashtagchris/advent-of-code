import { evaluate } from "./part2.ts";

const line = await Deno.readTextFile(Deno.args[0]);

const result = evaluate(line);
console.log(result);
