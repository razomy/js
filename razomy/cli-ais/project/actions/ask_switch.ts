import { callText, consensusCall, type LlmContext } from "../llms";
import {getSwitchPrompt} from './get_switch_prompt';
import {getPanicPrompt} from './get_panic_prompt';
import {parsePanic} from './parse_panic';
import {parseSwitch} from './parse_switch';

export async function askSwitch(ctx: LlmContext, options: string[]): Promise<string> {
    const messages = [...getPanicPrompt(), ...getSwitchPrompt(options), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseSwitch(result, options);
    })
}
