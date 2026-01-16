import {OpenAiCtx, WithOpenAiCtx} from 'razomy.openai/open_ai_ctx';
import openai from 'openai';

export class LanguageGrammarCorrection {
    constructor(private ctx: WithOpenAiCtx) {
    }

    async get(text) {
        const request = {
            model: 'text-davinci-003',
            prompt: `Correct this to standard:
${text}`,
            temperature: 0,
            max_tokens: 256,
            top_p: 0.2,
            frequency_penalty: 0,
            presence_penalty: 0,
            best_of: 1,
            echo: false,
            logprobs: 0,
            stream: false,
        };
        const response = await this.ctx.openai.openai.completions.create(request) as openai.Completion;
        return response.choices[0].text;
    }
}


