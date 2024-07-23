
import { IDecode } from './i-decode';
import { IEncode } from './i-encode';

export interface ICodec<I, E> extends IEncode<I, E>, IDecode<E, I> {

}
