
import { IDecode }  from 'razomy.js/codec/i-decode';
import { IEncode }  from 'razomy.js/codec/i-encode';

export interface ICodec<D, E> extends IEncode<D, E>, IDecode<E, D> {

}
