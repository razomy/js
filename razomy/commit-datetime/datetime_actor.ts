import type {WithActor} from '@razomy/commit';
import type {WithDatetime} from '@razomy/date-time';

export interface DatetimeActor extends WithDatetime, WithActor {
  datetime: string,
  actor: string,
}
