import { callText, consensusCall, type LlmContext } from "../llms";
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {getTaskDecomposePrompt} from '../prompts/get_task_decompose_prompt';
import {parsePanic} from '../parsers/parse_panic';
import {parseArray} from '../parsers/parse_array';

export async function askTaskDecompose(ctx: LlmContext): Promise<string[]> {
    const messages = [...getPanicPrompt(), ...getTaskDecomposePrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseArray(result);
    })
}
