import {Value} from "razomy.js/value/value";

export type Action<T> = (value: Value<T>) => void
