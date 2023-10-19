import { IDecode } from './IDecode.js';
import { IEncode } from './IEncode.js';

export interface ICodec<I, E> extends IEncode<I, E>, IDecode<E, I> {

}
