import { loadModel } from '@mlx-node/lm';

export const MODEL = await loadModel('');

const result = await MODEL.chat([{ role: 'user', content: 'What is the capital of France?' }]);

console.log(result.text);
