import {ArgumentError} from './argument_error';
import {and} from './and';

export function and_false_throw(...value: boolean[]) {
    if (!and(...value)) {
    throw new ArgumentError(value);
    }

    return true;
}
