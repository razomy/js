import type { WithActor } from '@razomy/commit';
import type { WithDatetime } from '@razomy/dates';

export interface DatetimeActor extends WithDatetime, WithActor {
  datetime: string;
  actor: string;
}
