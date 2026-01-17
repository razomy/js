export function addFunctionAndAssign(ctx, functionTemplate) {
  const [name, description, result, resultDescription] = functionTemplate.split(': ');
  const functions = ctx.functions || [];
  functions.push({
    name: name,
    description: description,
    parameters: {
      type: 'object',
      properties: {
        [result]: {type: 'string', description: resultDescription},
      },
      required: [],
    },
  });
  const updated = {
    function_call: functions.length > 1 ? 'auto' : {name: name},
    functions,
  };
  Object.assign(ctx, updated);
}
