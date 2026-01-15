import {Dict} from 'src/dict/dict';

export interface RecursiveDict extends Dict<RecursiveDict> {
}
