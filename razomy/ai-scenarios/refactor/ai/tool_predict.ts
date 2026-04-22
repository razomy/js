import type {AiMessage} from "@razomy/ai";
import * as ai from '@razomy/ai';
import * as abstracts from "@razomy/abstracts";
import {createPackageFunction} from "@razomy/ts-rala";

export function specToTool(spec: abstracts.translators.FunctionBinding) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  spec.parameters.forEach((param) => {
    properties[param.identifier.name] = {
      type: param.kind.toLowerCase(),
      description: param.meta.description,
    };


    if (param.expression === null) {
      required.push(param.kind);
    }
  });

  return {
    type: 'function',
    function: {
      name: spec.identifier.name,
      description: `${spec.meta.description}.`,
      parameters: {
        type: 'object',
        properties,
        required: required.length > 0 ? required : [],
      },
    }
  };
}


export async function predict(messages: AiMessage[], tools: abstracts.translators.FunctionBinding[]) {
  return await ai.apiRun.instant.chat.tool.predict(
    null,
    'mlx-community/gemma-4-e2b-it-4bit',
    messages,
    tools.map(specToTool)
  )
}

// @ts-ignore
function test_predict() {
  predict([{sender: 'user', type: 'text', content: "Say hello world!"}], [])
    .then(messages => {
      console.log(messages);
    });
}

// @ts-ignore
function test_predict_tool() {
  predict(
    [{"sender": "user", type: 'text', "content": "Multiply 12234585 and 48838483920. And say answer."}],
    [
      createPackageFunction({
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

