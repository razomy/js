import { extractPrePathFrom, extractSubPathFrom } from './string';
import * as path from 'path';

console.log(extractSubPathFrom(path.resolve(), 'razomy'));
console.log(extractPrePathFrom(path.resolve(), 'razomy'));