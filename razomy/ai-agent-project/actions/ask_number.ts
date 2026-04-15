import * as ai from "@razomy/ai";
import * as aiAgentProject from "@razomy/ai-agent-project";

export async function askNumber(ctx: ai.AiLlmContext): Promise<number> {
    const messages = [...aiAgentProject.prompts.getPanicPrompt(), ...aiAgentProject.prompts.getNumberPrompt(), ...ctx.messages];
    return aiAgentProject.llms.consensusCall({...ctx, messages}, async (ctx) => {
    const result = await aiAgentProject.llms.callText(ctx);
    aiAgentProject.parsers.parseThrowPanic(result);
    return aiAgentProject.parsers.parseNumber(result);
    })
}
