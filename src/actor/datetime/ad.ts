import {WithActor} from '../with_actor';
import {WithDatetime} from '../../date/time/datetime';

export interface DatetimeActor extends WithDatetime, WithActor {
  datetime: string,
  actor: string,
}
