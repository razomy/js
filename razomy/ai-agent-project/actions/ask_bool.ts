import { callText, consensusCall } from "../llms";
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {getBoolPrompt} from '../prompts/get_bool_prompt';
import {parseBool} from '../parsers/parse_bool';
import {parseThrowPanic} from '../parsers/parse_throw_panic';
import * as ai from "@razomy/ai";

export async function askBool(ctx: ai.AiLlmContext): Promise<boolean> {
    const messages = [...getPanicPrompt(), ...getBoolPrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parseThrowPanic(result);
    return parseBool(result);
    })
}
