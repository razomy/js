import {WithActor} from '../with_actor';
import {WithDatetime} from 'razomy.date/time';

export interface DatetimeActor extends WithDatetime, WithActor {
  datetime: string,
  actor: string,
}
