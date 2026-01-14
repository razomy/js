import { is_object } from "razomy.object/object";
import is_string from "razomy.string/is_string";
import {gpt_api_v2} from './gpt_api_v2';
import {set_tokens} from './set_tokens';

export async function gpt_api(messageOrMessagesOrRequest) {
    if (is_string(messageOrMessagesOrRequest)) {
    const req = { messages: [{ role: 'user', content: messageOrMessagesOrRequest }] };
    set_tokens(req);
    return (await gpt_api_v2(req as any)).choices[0].message.content;
    } else if (Array.isArray(messageOrMessagesOrRequest)) {
    return (await gpt_api_v2(messageOrMessagesOrRequest as any)).choices[0].message.content;
    } else if (is_object(messageOrMessagesOrRequest)) {
    set_tokens(messageOrMessagesOrRequest);
    return (await gpt_api_v2(messageOrMessagesOrRequest)).choices[0].message.content;
    } else {
    throw new Error('Unknown request');
    }
}
