import * as ais from "@razomy/ais";
import * as aiScenarios from "@razomy/ai-scenarios";

export async function predictSu(systemMessage: string, userMessage: string) {
    const result = await aiScenarios.refactor.ai.predict([
            ais.chats.sM(systemMessage.trim()),
            ais.chats.uM(userMessage.trim())
          ]);
    const content = result.content;
    console.log(content);
    return content;
}
