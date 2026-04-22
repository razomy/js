import * as ai from "@razomy/ai";
import * as aiScenarios from "@razomy/ai-scenarios";

export async function predictSu(systemMessage: string, userMessage: string) {
    const result = await aiScenarios.refactor.ai.predict([
            ai.sM(systemMessage.trim()),
            ai.uM(userMessage.trim())
          ]);
    const content = result.content;
    console.log(content);
    return content;
}
