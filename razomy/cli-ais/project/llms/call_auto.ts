import type {LlmContext} from './must_use_tool_llm_exception';
import {callTool} from './call_tool';
import {callText} from './call_text';

export async function callAuto(ctx: LlmContext) {
    if (ctx.tools.length) {
    return await callTool(ctx);
    } else {
    return await callText(ctx);
    }
}
