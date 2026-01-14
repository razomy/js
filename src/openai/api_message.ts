import set_weight_an_tokens from './set_weight_an_tokens';

import {openai} from './openai';

export default async function api_message(request) {
    set_weight_an_tokens(request);
    const response = await openai.chat.completions.create(request);
    return response.choices[0].message;
}
