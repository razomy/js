import {Dict} from "razomy.js/dict/dict";

export interface RecursiveDict extends Dict<RecursiveDict> {
}
