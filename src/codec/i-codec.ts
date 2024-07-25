
import { IDecode } from './i-decode';
import { IEncode } from './i-encode';

export interface ICodec<D, E> extends IEncode<D, E>, IDecode<E, D> {

}
