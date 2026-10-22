import * as sql from "@razomy/sql";

export function i18N<T>(): sql.ColumnConfig {
    return ({
      type: 'Jsonb',
      default_: '{}',
    });
}
