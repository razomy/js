import {set_tokens} from './set_tokens';
import {set_weight} from './set_weight';

export function set_weight_an_tokens(request) {
    set_weight(request);
    set_tokens(request);
}
