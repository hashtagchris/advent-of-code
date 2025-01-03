// Parse and read input as object streams
// I took this approach in case the advent of code input files were huge,
// and because it was one of the novel ideas from NodeJS: https://nodejs.org/en/learn/modules/how-to-use-streams#object-mode
// "Streams are Node’s best and most misunderstood idea." - Dominic Tarr, https://github.com/dominictarr/event-stream

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
