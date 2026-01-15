import {is_object} from 'razomy.object/is_object';
import {is_string} from 'razomy.string/is_string';
import {gpt_api_v_2} from './gpt_api_v_2';
import {set_tokens} from './set_tokens';

export async function gpt_api(message_or_messages_or_request) {
    if (is_string(message_or_messages_or_request)) {
    const req = { messages: [{ role: 'user', content: message_or_messages_or_request }] };
    set_tokens(req);
    return (await gpt_api_v_2(req as any)).choices[0].message.content;
    } else if (Array.isArray(message_or_messages_or_request)) {
    return (await gpt_api_v_2(message_or_messages_or_request as any)).choices[0].message.content;
    } else if (is_object(message_or_messages_or_request)) {
    set_tokens(message_or_messages_or_request);
    return (await gpt_api_v_2(message_or_messages_or_request)).choices[0].message.content;
    } else {
    throw new Error('Unknown request');
    }
}
