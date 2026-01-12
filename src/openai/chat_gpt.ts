import OpenAI from 'openai';
import {models} from "razomy/openai/models";
import {is_object} from "razomy/object/object";
import is_string from "razomy/string/is_string";

const openai = new OpenAI();


export function add_system_message(ctx, task) {
  const messages = ctx.messages || [];
  messages.push(
    {
      role: 'system',
      content: task,
    },
  );
  ctx.messages = messages;
}

export function add_user_message(ctx, task) {
  const messages = ctx.messages || [];
  messages.push(
    {
      role: 'user',
      content: task,
    },
  );
  ctx.messages = messages;
}

export function add_function_and_assign(ctx, functionTemplate) {
  const [name, description, result, result_description] = functionTemplate.split(': ');
  const functions = ctx.functions || [];
  functions.push({
    name: name,
    description: description,
    parameters: {
      type: 'object',
      properties: {
        [result]: { type: 'string', description: result_description },
      },
      required: [],
    },
  });


  const updated = {
    function_call: functions.length > 1 ? 'auto' : { name: name },
    functions,
  };
  Object.assign(ctx, updated);
}

export function set_weight_an_tokens(request) {
  set_weight(request);
  set_tokens(request);
}

export function set_weight(ctx) {
  const updated = {
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  Object.assign(ctx, updated);
}

export function set_tokens(ctx) {
  const model = ctx.model || models.mild;
  const messages_text = JSON.stringify(ctx.messages) + JSON.stringify(ctx.functions);
  const max_tokens = model.token - Math.floor(messages_text.length / 2.5);
  const updated = { model: model.name };
  Object.assign(ctx, updated);

  return ctx;
}

export async function gpt_api_v2(params = { messages: [] }) {
  const request = {
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    ...params,
  };

  const response = await openai.chat.completions.create(request as any);

  return response;
}


export async function api_message(request) {
  set_weight_an_tokens(request);

  const response = await openai.chat.completions.create(request);
  return response.choices[0].message;
}


export async function v1(params = { messages: [] } as any) {
  const prompt = params.messages.map(i => i.content).join('\n');

  delete params.messages;

  const request = {
    prompt,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    ...params,
  };
  const response = await openai.completions.create(request);

  return response.choices[0].text;
}

export async function gpt_api(messageOrMessagesOrRequest) {
  if (is_string(messageOrMessagesOrRequest)) {
    const req = { messages: [{ role: 'user', content: messageOrMessagesOrRequest }] };
    set_tokens(req);
    return (await gpt_api_v2(req as any)).choices[0].message.content;
  } else if (Array.isArray(messageOrMessagesOrRequest)) {
    return (await gpt_api_v2(messageOrMessagesOrRequest as any)).choices[0].message.content;
  } else if (is_object(messageOrMessagesOrRequest)) {
    set_tokens(messageOrMessagesOrRequest);
    return (await gpt_api_v2(messageOrMessagesOrRequest)).choices[0].message.content;
  } else {
    throw new Error('Unknown request');
  }
}

export async function get_models() {
  const res = await openai.models.list();
  console.log(res.data.map(i => i.id));
  return res.data;
}

export async function single_request_pro(text, model = models.expensive120000) {
  let message_or_messages_or_request = {
    messages: [
      {
        role: 'system',
        content: text,
      },
    ],
    model: model,
  };
  message_or_messages_or_request = set_tokens(message_or_messages_or_request);

  const result = await gpt_api_v2(message_or_messages_or_request as any);
  const message = result.choices[0].message.content;
  return message;
}