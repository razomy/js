import type {Value} from '@razomy/value';

export type Action<T> = (value: Value<T>) => void
export type Callback = () => void
export type AsyncCallback = () => Promise<void>
