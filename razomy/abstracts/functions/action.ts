import * as abstracts from '@razomy/abstracts';

export type Action<T> = (value: abstracts.structures.Value<T>) => void;
export type Callback = () => void;
