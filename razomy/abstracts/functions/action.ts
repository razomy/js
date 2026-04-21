import * as abstracts from '@razomy/abstracts';

export type Action<T> = (value: abstracts.domains.Value<T>) => void;
export type Callback = () => void;
export type FutureCallback = () => Promise<void>;
