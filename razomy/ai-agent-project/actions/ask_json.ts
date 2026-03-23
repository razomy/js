import { callText, consensusCall } from "../llms";
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {parseJson} from '../parsers/parse_json';
import {parseThrowPanic} from '../parsers/parse_throw_panic';
import * as ai from "@razomy/ai";

export async function askJson(ctx: ai.AiLlmContext): Promise<string> {
    const messages = [...getPanicPrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parseThrowPanic(result);
    return parseJson(result);
    })
}
