import * as commit from '@razomy/commit';
import * as dates from '../datetimes';

export interface DatetimeActor extends dates.WithDatetime, commit.WithActor {
  datetime: string;
  actor: string;
}
