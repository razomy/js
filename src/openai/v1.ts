import {openai} from './openai';

export default async function v1(params = { messages: [] } as any) {
    const prompt = params.messages.map(i => i.content).join('\n');
    delete params.messages;
    const request = {
            prompt,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            ...params,
          };
    const response = await openai.completions.create(request);
    return response.choices[0].text;
}
