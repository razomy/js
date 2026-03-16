import { callText, consensusCall, type LlmContext } from "../llms";
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {getNumberPrompt} from '../prompts/get_number_prompt';
import {parseNumber} from '../parsers/parse_number';
import {parsePanic} from '../parsers/parse_panic';

export async function askNumber(ctx: LlmContext): Promise<number> {
    const messages = [...getPanicPrompt(), ...getNumberPrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseNumber(result);
    })
}
