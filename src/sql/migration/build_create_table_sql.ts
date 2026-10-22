import * as sql from "@razomy/sql";

/** Генерация CREATE TABLE для совершенно новой таблицы */
export function buildCreateTableSql(table: sql.TableDeclaration): { upSql: string; downSql: string } {
    const columns: string[] = [];
    const pks = Object.keys(table.primary || {});
    for (const [fieldName, fieldDef] of Object.entries(table.record)) {
    const def = sql.migration.normalizeField(fieldDef);
    const colName = sql.toSnake(fieldName);

    let colSql = `    ${colName} ${def.sqlType}`;
    if (pks.length === 1 && pks[0] === fieldName) {
      colSql += ' PRIMARY KEY';
    } else if (!def.nullable) {
      colSql += ' NOT NULL';
    }
    if (def.sqlDefault !== null) {
      colSql += ` DEFAULT ${def.sqlDefault}`;
    }
    columns.push(colSql);
    }

    let upSql = `CREATE TABLE IF NOT EXISTS ${table.name_} (\n${columns.join(',\n')}\n);\n`;
    const upIndexes: string[] = [];
    const downIndexes: string[] = [];
    for (const indexField of Object.keys(table.index || {})) {
    const col = sql.toSnake(indexField);
    const idxName = `idx_${table.name_}_${col}`;
    upIndexes.push(`CREATE INDEX IF NOT EXISTS ${idxName} ON ${table.name_}(${col});`);
    downIndexes.push(`DROP INDEX IF EXISTS ${idxName};`);
    }

    if (upIndexes.length > 0) {
    upSql += `\n${upIndexes.join('\n')}\n`;
    }

    const downSql = [...downIndexes, `DROP TABLE IF EXISTS ${table.name_};`].join('\n') + '\n';
    return { upSql, downSql };
}
