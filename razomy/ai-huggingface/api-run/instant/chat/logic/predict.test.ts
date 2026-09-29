import * as array from '@razomy/array';
import * as aiHuggingface from '@razomy/ai-huggingface';

describe('aiHuggingface.apiRun.instant.chat.logic', () => {
  describe('predict', () => {
    // 1. Standard cases
    it('returns elements in source that are not in other', async () => {
      const res = await aiHuggingface.apiRun.instant.chat.logic.predict(null, 'mlx-community/gemma-4-e2b-it-4bit', [
        { content: 'Say hi', sender: 'user', type: 'text' },
      ]);
      console.log(res);
      expect(array.difference([1, 2, 3], [2, 4])).toEqual([1, 3]);
    });
  });
});
