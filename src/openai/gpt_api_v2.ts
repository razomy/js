import {openai} from './openai';

export async function gpt_api_v2(params = { messages: [] }) {
    const request = {
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            ...params,
          };
    const response = await openai.chat.completions.create(request as any);
    return response;
}
