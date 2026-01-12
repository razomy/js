import {Value} from "razomy/value/value";

export type Action<T> = (value: Value<T>) => void
