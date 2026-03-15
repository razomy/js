import {s} from '../llms';

export function getTaskDecomposePrompt() {
    return [s(`Break the task into logical steps. Output strictly as a JSON array of strings like ["", "", ""], or "panic" if impossible. No extra text.`)];
}
