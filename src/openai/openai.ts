import {OpenAI} from 'openai';

export class openai {
    openai: OpenAI;

    constructor(ctx) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

    }
}
