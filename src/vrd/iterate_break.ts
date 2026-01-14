import { Execute } from "razomy.pipes/booleans/execute";
import {Iterate, IterateBreaks} from './iterate_vrd';
import {iterate_vrd} from './iterate_vrd';

export function iterate_break<T, C extends Iterate<T>>(ctx: C, is_iterate_child_execute_bool: Execute<C>): void {
    iterate_vrd(ctx, (c) => {
    return is_iterate_child_execute_bool(c)
      ? IterateBreaks.None
      : IterateBreaks.Break
    })
}
