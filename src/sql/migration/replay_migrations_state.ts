import * as fs from 'node:fs';
import * as path from 'node:path';
import * as sql_ from '@razomy/sql';

/** Читает все .up.sql файлы и реконструирует текущую схему БД */
export function replayMigrationsState(dir: string, upFiles: string[]): Record<string, sql_.migration.TableState> {
  const dbState: Record<string, sql_.migration.TableState> = {};

  // Поддерживаем все типы из TYPE_MAP + опциональный массив [] на конце
  const typePattern =
    '((?:VARCHAR\\(\\d+\\)|CHAR\\(\\d+\\)|NUMERIC\\(\\d+,\\s*\\d+\\)|TIMESTAMP WITH TIME ZONE|TIMESTAMP WITHOUT TIME ZONE|TIME WITHOUT TIME ZONE|DOUBLE PRECISION|SMALLINT|INTEGER|BIGINT|REAL|TEXT|BOOLEAN|DATE|UUID|JSONB|BYTEA|INET)(?:\\[\\])?)';

  for (const file of upFiles) {
    const rawSql = fs.readFileSync(path.join(dir, file), 'utf-8');
    // Убираем SQL-комментарии, чтобы они не мешали парсингу
    const sql = rawSql.replace(/--.*$/gm, '');

    let match: RegExpExecArray | null;

    // 1. CREATE TABLE
    const createTableRegex = /CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+(\w+)\s*\(([\s\S]*?)\);/gi;
    while ((match = createTableRegex.exec(sql)) !== null) {
      const [, tableName, body] = match;
      dbState[tableName] = { columns: {}, indexes: new Map() };

      // Разбиваем по переводу строки (или запятой не внутри скобок), убирая висящую запятую
      const lines = body
        .split(/\r?\n/)
        .map((l) => l.trim().replace(/,$/, ''))
        .filter(Boolean);

      const colRegex = new RegExp(`^(\\w+)\\s+${typePattern}(.*)$`, 'i');

      for (const line of lines) {
        const colMatch = line.match(colRegex);
        if (colMatch) {
          const [, colName, rawType, constraints] = colMatch;
          const isPk = /PRIMARY\s+KEY/i.test(constraints);
          const isNotNull = isPk || /NOT\s+NULL/i.test(constraints);
          const defMatch = constraints.match(/DEFAULT\s+('[^']*'|\S+)/i);

          dbState[tableName].columns[colName] = {
            sqlType: rawType.toUpperCase(),
            notNull: isNotNull,
            isPk,
            defaultVal: defMatch ? defMatch[1] : null,
          };
        }
      }
    }

    // 2. DROP TABLE
    const dropTableRegex = /DROP\s+TABLE(?:\s+IF\s+EXISTS)?\s+(\w+);/gi;
    while ((match = dropTableRegex.exec(sql)) !== null) {
      delete dbState[match[1]];
    }

    // 3. ADD COLUMN
    const addColRegex = new RegExp(
      `ALTER\\s+TABLE\\s+(\\w+)\\s+ADD\\s+(?:COLUMN\\s+)?(\\w+)\\s+${typePattern}([^;]*);`,
      'gi',
    );
    while ((match = addColRegex.exec(sql)) !== null) {
      const [, tableName, colName, rawType, constraints] = match;
      if (dbState[tableName]) {
        const defMatch = constraints.match(/DEFAULT\s+('[^']*'|\S+)/i);
        dbState[tableName].columns[colName] = {
          sqlType: rawType.toUpperCase(),
          notNull: /NOT\s+NULL/i.test(constraints),
          isPk: false,
          defaultVal: defMatch ? defMatch[1] : null,
        };
      }
    }

    // 4. DROP COLUMN
    const dropColRegex = /ALTER\s+TABLE\s+(\w+)\s+DROP\s+(?:COLUMN\s+)?(?:\s*IF\s+EXISTS\s+)?(\w+);/gi;
    while ((match = dropColRegex.exec(sql)) !== null) {
      const [, tableName, colName] = match;
      delete dbState[tableName]?.columns[colName];
    }

    // 5. ALTER COLUMN TYPE
    const alterTypeRegex = new RegExp(
      `ALTER\\s+TABLE\\s+(\\w+)\\s+ALTER\\s+(?:COLUMN\\s+)?(\\w+)\\s+(?:SET\\s+DATA\\s+)?TYPE\\s+${typePattern}`,
      'gi',
    );
    while ((match = alterTypeRegex.exec(sql)) !== null) {
      const [, tableName, colName, newType] = match;
      if (dbState[tableName]?.columns[colName]) {
        dbState[tableName].columns[colName].sqlType = newType.toUpperCase();
      }
    }

    // 6. ALTER COLUMN SET / DROP NOT NULL
    const notNullRegex = /ALTER\s+TABLE\s+(\w+)\s+ALTER\s+(?:COLUMN\s+)?(\w+)\s+(SET|DROP)\s+NOT\s+NULL/gi;
    while ((match = notNullRegex.exec(sql)) !== null) {
      const [, tableName, colName, action] = match;
      if (dbState[tableName]?.columns[colName]) {
        dbState[tableName].columns[colName].notNull = action.toUpperCase() === 'SET';
      }
    }

    // 7. CREATE / DROP INDEX
    const createIdxRegex = /CREATE\s+INDEX(?:\s+IF\s+NOT\s+EXISTS)?\s+(\w+)\s+ON\s+(\w+)\s*\((\w+)\)/gi;
    while ((match = createIdxRegex.exec(sql)) !== null) {
      const [, idxName, tableName, colName] = match;
      dbState[tableName]?.indexes.set(idxName, colName);
    }

    const dropIdxRegex = /DROP\s+INDEX(?:\s+IF\s+EXISTS)?\s+(\w+)/gi;
    while ((match = dropIdxRegex.exec(sql)) !== null) {
      for (const t of Object.values(dbState)) {
        t.indexes.delete(match[1]);
      }
    }
  }

  return dbState;
}
