import {ArgumentError} from './exists';

export default function false_throw(value) {
    if (value == false) {
    throw new ArgumentError(value);
    }

    return true;
}
