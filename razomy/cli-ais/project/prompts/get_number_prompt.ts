import {s} from '../llms';

export function getNumberPrompt() {
    return [s(`You are a math parser. Return ONLY a number, or "panic" if you cannot answer. No text, no explanations.`)];
}
