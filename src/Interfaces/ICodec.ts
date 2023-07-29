import { IDecode } from './IDecode';
import { IEncode } from './IEncode';

export interface ICodec<I, E> extends IEncode<I, E>, IDecode<E, I> {

}
