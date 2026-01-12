import {ArgumentException} from "razomy/exceptions/argument_exception";

export function validate_array_string_throw<T extends string[]>(array: T | null | undefined, name: string): T {
    const errorBuilder = (t) => `${name} is ${t}. Must be string[].`;
    if (array === undefined) {
        throw new ArgumentException(errorBuilder("undefined"), {[name]: "undefined"});
    }
    if (array === null) {
        throw new ArgumentException(errorBuilder("null"), {[name]: array});
    }
    if (!Array.isArray(array)) {
        throw new ArgumentException(errorBuilder("not Array"), {[name]: array});
    }
    if (array.length === 0) {
        throw new ArgumentException(errorBuilder(".length === 0"), {[name]: array});
    }
    return array;
}
