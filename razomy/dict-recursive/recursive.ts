import type {Dict} from '@razomy/dict';

export interface RecursiveDict extends Dict<RecursiveDict> {
}
