import * as commits from '@razomy/commits';
import * as datetimes from "@razomy/datetimes";

export interface DatetimeActor extends datetimes.WithDatetime, commits.WithActor {
  datetime: string;
  actor: string;
}
