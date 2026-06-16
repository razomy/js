import * as commits from '@razomy/commits';
import * as datetimes from "@razomy/datetimes";

export interface DatetimeActor extends datetimes.HasDatetime, commits.HasActor {
  datetime: string;
  actor: string;
}
