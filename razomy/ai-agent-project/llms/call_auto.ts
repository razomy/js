import {callTool} from './call_tool';
import {callText} from './call_text';
import * as ai from "@razomy/ai";

export async function callAuto(ctx: ai.AiLlmContext) {
    if (ctx.tools.length) {
    return await callTool(ctx);
    } else {
    return await callText(ctx);
    }
}
