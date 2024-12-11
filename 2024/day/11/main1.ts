import { evaluate } from "./part1.ts";

const map = await Deno.readTextFile(Deno.args[0]);

const result = evaluate(map);
console.log(result);
