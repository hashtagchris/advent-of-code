export async function readAsNumberPairStream(
  path: string,
): Promise<ReadableStream<Array<number>>> {
  const response = await fetch(path);

  if (!response.body) {
    throw new Error("no response body");
  }

  return response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(textToNumberPairStream());
}

export async function stdinAsNumberPairStream(): Promise<
  ReadableStream<Array<number>>
> {
  return Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(textToNumberPairStream());
}

export function textToNumberPairStream(): TransformStream<
  string,
  Array<number>
> {
  return new TransformStream({
    transform(chunk: string, controller) {
      // Assumption: chunk will always be one or more complete lines, assuming reasonably short lines
      // console.log(`chunk: ${chunk}`);

      const segments = chunk.split(/\s+/).filter(Boolean);
      // console.log(`segments: ${segments}`);

      const integers = segments.map((is) => parseInt(is));
      // console.log(`integers: ${integers}`);

      if (integers.length % 2 != 0) {
        throw new Error(
          `Odd number of numbers (${integers.length}) in input: ${chunk}`,
        );
      }

      for (let i = 0; i < integers.length; i = i + 2) {
        controller.enqueue([integers[i], integers[i + 1]]);
      }
    },
  });
}
