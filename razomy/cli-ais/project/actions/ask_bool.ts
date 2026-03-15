import { callText, consensusCall, type LlmContext } from "../llms";
import {getPanicPrompt} from './get_panic_prompt';
import {getBoolPrompt} from './get_bool_prompt';
import {parseBool} from './parse_bool';
import {parsePanic} from './parse_panic';

export async function askBool(ctx: LlmContext): Promise<boolean> {
    const messages = [...getPanicPrompt(), ...getBoolPrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseBool(result);
    })
}
