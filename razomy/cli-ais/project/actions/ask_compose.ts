import { callText, consensusCall, type LlmContext } from "../llms";
import {parsePanic} from './parse_panic';
import {getPanicPrompt} from './get_panic_prompt';
import {getComposePrompt} from './get_compose_prompt';

export async function askCompose(ctx: LlmContext, contexts: string[], query: string): Promise<string> {
    const messages = [...getPanicPrompt(), ...getComposePrompt(contexts, query)];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return (result);
    })
}
