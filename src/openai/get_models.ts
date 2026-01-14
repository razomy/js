import {openai} from './chat_gpt';

export async function get_models() {
    const res = await openai.models.list();
    console.log(res.data.map(i => i.id));
    return res.data;
}
