import { callText, consensusCall } from "../llms";
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {getNumberPrompt} from '../prompts/get_number_prompt';
import {parseNumber} from '../parsers/parse_number';
import {parseThrowPanic} from '../parsers/parse_throw_panic';
import * as ai from "@razomy/ai";

export async function askNumber(ctx: ai.AiLlmContext): Promise<number> {
    const messages = [...getPanicPrompt(), ...getNumberPrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parseThrowPanic(result);
    return parseNumber(result);
    })
}
