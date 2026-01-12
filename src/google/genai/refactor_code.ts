import {GoogleGenAI} from '@google/genai';
import {iterate} from 'razomy/fs/iterate';

const ai = new GoogleGenAI({apiKey: ''});

export async function ask() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'How does AI work?',
  });
  console.log(response.text);
}

function f(dir_path: string) {
  iterate(dir_path, () => {

  })
}

ask().then();

const response = {
  'candidates': [
    {
      'content': {
        'parts': [
          {
            'text': '..........'
          }
        ],
        'role': 'model'
      },
      'finishReason': 'STOP',
      'index': 0
    }
  ],
  'modelVersion': 'gemini-2.5-flash',
  'usageMetadata': {
    'promptTokenCount': 6,
    'candidatesTokenCount': 1282,
    'totalTokenCount': 2579,
    'promptTokensDetails': [
      {
        'modality': 'TEXT',
        'tokenCount': 6
      }
    ],
    'thoughtsTokenCount': 1291
  }
}