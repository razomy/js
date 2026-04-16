import * as commit from '@razomy/commit';
import * as datetimes from "@razomy/datetimes";

export interface DatetimeActor extends datetimes.WithDatetime, commit.WithActor {
  datetime: string;
  actor: string;
}
