import {Dict} from 'razomy.dict/dict';

export interface RecursiveDict extends Dict<RecursiveDict> {
}
