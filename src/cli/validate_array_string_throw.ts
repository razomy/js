import {ArgumentException} from 'razomy.exceptions/argument_exception';
export default function validate_array_string_throw<T extends string[]>(array: T | null | undefined, name: string): T {
    const error_builder = (t) => `${name} is ${t}. Must be string[].`;
    if (array === undefined) {
        throw new ArgumentException(error_builder("undefined"), {[name]: "undefined"});
    }
    if (array === null) {
        throw new ArgumentException(error_builder("null"), {[name]: array});
    }
    if (!Array.isArray(array)) {
        throw new ArgumentException(error_builder("not Array"), {[name]: array});
    }
    if (array.length === 0) {
        throw new ArgumentException(error_builder(".length === 0"), {[name]: array});
    }
    return array;
}


