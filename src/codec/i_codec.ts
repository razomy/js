
import { IDecode }  from 'razomy.js/codec/i_decode';
import { IEncode }  from 'razomy.js/codec/i_encode';

export interface ICodec<D, E> extends IEncode<D, E>, IDecode<E, D> {

}
