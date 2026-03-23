import { callText, consensusCall } from "../llms";
import {getSwitchPrompt} from '../prompts/get_switch_prompt';
import {getPanicPrompt} from '../prompts/get_panic_prompt';
import {parseThrowPanic} from '../parsers/parse_throw_panic';
import {parseSwitch} from '../parsers/parse_switch';
import * as ai from "@razomy/ai";

export async function askSwitch(ctx: ai.AiLlmContext, options: string[]): Promise<string> {
    const messages = [...getPanicPrompt(), ...getSwitchPrompt(options), ...ctx.messages];
    return consensusCall({...ctx, messages}, async (ctx) => {
    const result = await callText(ctx);
    parseThrowPanic(result);
    return parseSwitch(result, options);
    })
}
