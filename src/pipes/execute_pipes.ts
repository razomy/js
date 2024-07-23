export interface WithParsePipes {
  execute_pipes: ExecuteOrNode[]
}

type Execute = (ctx: any) => boolean
type ExecuteGroup = (ctx: any, next: ExecuteOrNode[]) => boolean
type ExecuteNode = [ExecuteGroup, ExecuteOrNode[]]
export type ExecuteOrNode = Execute | ExecuteNode

export function loop_any_p(ctx: any, children: ExecuteOrNode[]) {
  while (any_p(ctx, children)) {
  }
  return false;
}

export function true_loop_any_p(ctx: any, children: ExecuteOrNode[]) {
  while (any_p(ctx, children)) {
  }
  return true;
}

export function any_p(ctx: any, items: ExecuteOrNode[]) {
  for (const item of items) {
    const is_n_node = Array.isArray(item);

    let is_complete = false;
    if (is_n_node) {
      is_complete = item[0](ctx, item[1]);
    } else {
      is_complete = item(ctx);
    }

    if (is_complete) {
      return true;
    }
  }
  return false;
}

export function and_p(ctx: any, items: ExecuteOrNode[]) {
  for (const item of items) {
    const is_n_node = Array.isArray(item);

    let is_complete = false;
    if (is_n_node) {
      is_complete = item[0](ctx, item[1]);
    } else {
      is_complete = item(ctx);
    }

    if (!is_complete) {
      return false;
    }
  }
  return true;
}

export function execute_parse_pipes(ctx: WithParsePipes) {
  any_p(ctx, ctx.execute_pipes)
}
