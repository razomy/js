import type {WithDecode} from './with_decode';
import type {WithEncode} from './with_encode';

export interface Codec<D, E> extends WithEncode<D, E>, WithDecode<E, D> {

}
