import * as aiGoogle from "@razomy/ai-google";

export async function cancel(name: string) {
  await aiGoogle.CLIENT.batches.cancel({ name: name });
}
