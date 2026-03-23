import { callText, consensusCall } from "../llms";
import {parseThrowPanic} from '../parsers/parse_throw_panic';
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {getComposePrompt} from '../prompts/get_compose_prompt';
import * as ai from "@razomy/ai";

export async function askCompose(ctx: ai.AiLlmContext, contexts: string[], query: string): Promise<string> {
    const messages = [...getPanicPrompt(), ...getComposePrompt(contexts, query)];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parseThrowPanic(result);
    return (result);
    })
}
