import * as ai from "@razomy/ai";

export function mapMessage(message: ai.AiMessage) {
    if (message.type === 'text') {
    return {role: message.sender, content: message.content}
    }

    if (message.type === 'request') {
    return message;
    }

    throw new Error('unknown message' + message);
}
