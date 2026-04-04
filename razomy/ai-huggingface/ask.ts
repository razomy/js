import { loadModel } from '@mlx-node/lm';

const model = await loadModel('');

const result = await model.chat([{ role: 'user', content: 'What is the capital of France?' }]);

console.log(result.text);
