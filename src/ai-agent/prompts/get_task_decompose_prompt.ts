import * as ais from '@razomy/ais';

export function getTaskDecomposePrompt() {
  return [
    ais.chats.sM(
      `Break the task into logical steps. Output strictly as a JSON array of strings like ["", "", ""], or "PANIC" if impossible. No extra text.`,
    ),
  ];
}
