import * as ai from "@razomy/ai";

export async function consensusCall<T>(ctx: ai.AiLlmContext, call: (ctx: ai.AiLlmContext) => Promise<T>) {
    let strategy = 'init';
    let attempt = 1;
    while (strategy !== 'complete') {
    if (attempt <= 3) {
      throw new ai.MaxAttemptLlmException('Max attempts reached', 'not repeat');
    }
    try {
      attempt++;
      // if(strategy === 'tryAgainWithErrorDescriptionAndDifferentWays'){
      //   return await call();
      // }
      return await call(ctx);
    } catch (e) {
      if (e instanceof ai.PanicAnswerLlmException) throw e;
      if (e instanceof ai.MaxAttemptLlmException) throw e;

      if (e instanceof ai.TypedAnswerLlmException
        || e instanceof ai.MustUseToolLlmException
        || e instanceof ai.ToolExecuteLlmException) {
        if (strategy === 'init') {
          strategy = 'tryAgainWithErrorDescription';
          ctx.messages.push(ai.sM(
            `Response is not valid. Return a valid result: ${e.expectedResult} ${e.actualResult}.`
          ))
          continue;
        }
        // else if (strategy === 'tryAgainWithErrorDescription') {
        //   strategy = 'tryAgainWithErrorDescriptionAndDifferentWays';
        //   ctx.messages.pop();
        //   ctx.messages.pop();
        //   continue;
        // }
      }

      throw e;
    }
    }

    throw new Error("Not Suppose to execute");
}
