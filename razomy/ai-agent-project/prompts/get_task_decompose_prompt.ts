import * as ai from "@razomy/ai";

export function getTaskDecomposePrompt() {
    return [ai.sM(`Break the task into logical steps. Output strictly as a JSON array of strings like ["", "", ""], or "panic" if impossible. No extra text.`)];
}
