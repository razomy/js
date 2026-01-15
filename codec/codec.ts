import {WithDecode} from './with_decode';
import {WithEncode} from './with_encode';

export interface Codec<D, E> extends WithEncode<D, E>, WithDecode<E, D> {

}
