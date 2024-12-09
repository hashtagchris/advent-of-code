import { evaluate } from "./part1.ts";

const line = await Deno.readTextFile(Deno.args[0]);

const result = evaluate(line);
console.log(result);
