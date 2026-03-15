import { callText, consensusCall, type LlmContext } from "../llms";
import {getPanicPrompt} from './get_panic_prompt';
import {parseJson} from './parse_json';
import {parsePanic} from './parse_panic';

export async function askJson(ctx: LlmContext): Promise<string> {
    const messages = [...getPanicPrompt(), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseJson(result);
    })
}
