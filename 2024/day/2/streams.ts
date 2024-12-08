import { TextLineStream } from "@std/streams";

export function stdinAsNumbersStream(): ReadableStream<number[]> {
  return Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream())
    .pipeThrough(textToNumbersStream());
}

function textToNumbersStream(): TransformStream<string, number[]> {
  return new TransformStream({
    transform(chunk, controller) {
      // console.log(`chunk: ${chunk}`);

      const segments = chunk.split(/\s+/).filter(Boolean);
      // console.log(`segments: ${segments}`);

      const integers = segments.map((is) => parseInt(is));
      // console.log(`integers: ${integers}`);

      controller.enqueue(integers);
    },
  });
}
