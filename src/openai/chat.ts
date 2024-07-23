import {OpenAiCtx, WithOpenAiCtx} from "razomy.js/openai/open_ai_ctx.js";

export class chat {

    constructor(private ctx: WithOpenAiCtx) {
    }

    public async query(message) {
        try {
            const response = await this.ctx.openai.openai.chat.completions.create({
                model: 'gpt-3.5-turbo-16k',
                messages: [
                    {
                        'role': 'user',
                        'content': `${message}`,
                    },
                ],
                temperature: 1,
                max_tokens: 3000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            return response?.choices[0]?.message?.content;

        } catch (e) {
            console.error(e);
            return 500;
        }
    }
}
