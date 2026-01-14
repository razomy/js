
export default function add_function_and_assign(ctx, functionTemplate) {
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
