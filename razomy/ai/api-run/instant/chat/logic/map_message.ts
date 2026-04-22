import * as ai from "@razomy/ai";

export function mapMessage(message: ai.AiMessage) {
    return {role: message.sender, content: message.content}
}
