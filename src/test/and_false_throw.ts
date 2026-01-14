import {ArgumentError} from './exists';
import and from './and';

export default function and_false_throw(...value: boolean[]) {
    if (!and(...value)) {
    throw new ArgumentError(value);
    }

    return true;
}
