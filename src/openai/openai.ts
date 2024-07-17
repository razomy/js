import {OpenAI} from 'openai';

export default class openai {
    openai: OpenAI;

    constructor(ctx) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

    }
}
