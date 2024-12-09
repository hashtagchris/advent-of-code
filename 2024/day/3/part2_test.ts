import { assertEquals } from "jsr:@std/assert";
import { evaluate } from "./part2.ts";

Deno.test("example", () => {
  const input =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

  const expected = 48;

  assertEquals(evaluate(input), expected);
});
