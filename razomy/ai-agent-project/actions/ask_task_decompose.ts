import { callText, consensusCall } from "../llms";
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {getTaskDecomposePrompt} from '../prompts/get_task_decompose_prompt';
import {parseThrowPanic} from '../parsers/parse_throw_panic';
import {parseArray} from '../parsers/parse_array';
import * as ai from "@razomy/ai";

export async function askTaskDecompose(ctx: ai.AiLlmContext): Promise<string[]> {
    const messages = [...getPanicPrompt(), ...getTaskDecomposePrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parseThrowPanic(result);
    return parseArray(result);
    })
}
