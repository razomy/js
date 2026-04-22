import * as ai from "@razomy/ai";

export function mapMessageBack(message: any): ai.AiMessage {
    return {
    sender: message.role == 'call' ? 'assistant' : message.role,
    type: message.function ? 'request' : 'text',
    content: message.content || message.content.function
    }
}
