import { callText, consensusCall, type LlmContext } from "../llms";
import {getSwitchPrompt} from '../prompts/get_switch_prompt';
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {parsePanic} from '../parsers/parse_panic';
import {parseSwitch} from '../parsers/parse_switch';

export async function askSwitch(ctx: LlmContext, options: string[]): Promise<string> {
    const messages = [...getPanicPrompt(), ...getSwitchPrompt(options), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parsePanic(result);
    return parseSwitch(result, options);
    })
}
