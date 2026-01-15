import {Dict} from '../dict';

export interface RecursiveDict extends Dict<RecursiveDict> {
}
