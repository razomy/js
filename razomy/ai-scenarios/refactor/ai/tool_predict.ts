import * as ai from '@razomy/ai';
import * as abstracts from "@razomy/abstracts";
import * as tsRala from "@razomy/ts-rala";
import * as aiScenarios from "@razomy/ai-scenarios";

export async function toolPredict(messages: ai.AiMessage[], tools: abstracts.translators.FunctionBinding[]) {
  return await ai.apiRun.instant.chat.tool.predict(
    null,
    'mlx-community/gemma-4-e2b-it-4bit',
    messages,
    tools.map(aiScenarios.refactor.ai.specToTool)
  )
}

// @ts-ignore
function testPredict() {
  toolPredict([{sender: 'user', type: 'text', content: "Say hello world!"}], [])
    .then(messages => {
      console.log(messages);
    });
}

// @ts-ignore
function testPredictTool() {
  toolPredict(
    [{"sender": "user", type: 'text', "content": "Multiply 12234585 and 48838483920. And say answer."}],
    [
      tsRala.createPackageFunction({
        name: 'multiply',
        description: 'Multiply numbers',
        parameter: {
          a: 'First argument',
          b: 'Second argument',
        },
        return_: {
          description: 'Return multiplication',
        },
      })
    ])
    .then(messages => {
      console.log(messages);
    });
}

