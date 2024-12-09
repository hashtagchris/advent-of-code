import { assertEquals } from "jsr:@std/assert";
import { evaluate } from "./part1.ts";

Deno.test("example", () => {
  const input =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

  const expected = 161;

  assertEquals(evaluate(input), expected);
});
