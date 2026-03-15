import {s} from '../llms';

export function getPanicPrompt() {
    return [s(`If you cannot answer. Answer ONLY "panic". No extra words.`)];
}
