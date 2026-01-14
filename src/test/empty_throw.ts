import {ArgumentError, not_empty} from './exists';

export function empty_throw(value) {
    if (!not_empty(value)) {
    throw new ArgumentError(value);
    }

    return true;
}
