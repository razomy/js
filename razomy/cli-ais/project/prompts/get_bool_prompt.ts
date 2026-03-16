import {s} from '../llms';

export function getBoolPrompt() {
    return [s(`You are a strict logic analyzer. Answer ONLY "true", "false", or "panic". No extra words.`)];
}
