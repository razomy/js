
import { IDecode } from './i-decode.js';
import { IEncode } from './i-encode.js';

export interface ICodec<I, E> extends IEncode<I, E>, IDecode<E, I> {

}
