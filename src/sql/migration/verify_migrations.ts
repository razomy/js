// --- START OF FILE verify_migrations.ts ---

import * as fs from 'node:fs';
import * as sql from '@razomy/sql';

/** Финальная проверка, что после всех миграций БД на 100% равна schema.ts */
export function verifyMigrations(dir: string, tables: Record<string, sql.TableDeclaration>): void {
  if (!fs.existsSync(dir)) {
    throw new Error(`❌ Папка миграций ${dir} не существует.`);
  }

  const upFiles = sql.migration.getUpFiles(dir);
  const errors: string[] = [];

  sql.migration.validateSymmetry(dir, upFiles, errors);

  const migratedState = sql.migration.replayMigrationsState(dir, upFiles);
  const schemaState = sql.migration.getTargetStateFromSchema(tables);

  for (const [tableName, targetTable] of Object.entries(schemaState)) {
    const actualTable = migratedState[tableName];
    if (!actualTable) {
      errors.push(`Таблица "${tableName}" есть в schema.ts, но отсутствует в миграциях.`);
      continue;
    }

    const ignored = new Set(
      (Object.values(tables).find((t) => t.name_ === tableName)?.migrationRules?.ignoreColumns || []).map(sql.toSnake),
    );

    for (const [colName, targetCol] of Object.entries(targetTable.columns)) {
      const actualCol = actualTable.columns[colName];
      if (!actualCol) {
        errors.push(`Колонка "${tableName}.${colName}" не создана в миграциях.`);
      } else {
        if (actualCol.sqlType !== targetCol.sqlType) {
          errors.push(`Тип "${tableName}.${colName}": в схеме ${targetCol.sqlType}, в миграциях ${actualCol.sqlType}.`);
        }
        if (actualCol.notNull !== targetCol.notNull) {
          errors.push(
            `Nullability "${tableName}.${colName}": в схеме NOT NULL=${targetCol.notNull}, в миграциях=${actualCol.notNull}.`,
          );
        }
      }
    }

    for (const colName of Object.keys(actualTable.columns)) {
      if (!targetTable.columns[colName] && !ignored.has(colName)) {
        errors.push(`Лишняя колонка "${tableName}.${colName}" в миграциях (удалена из schema.ts).`);
      }
    }

    for (const idxName of targetTable.indexes.keys()) {
      if (!actualTable.indexes.has(idxName)) {
        errors.push(`Индекс "${idxName}" описан в schema.ts, но не создан в миграциях.`);
      }
    }

    for (const idxName of actualTable.indexes.keys()) {
      if (!targetTable.indexes.has(idxName)) {
        errors.push(`Устаревший индекс "${idxName}" не удален в миграциях.`);
      }
    }
  }

  for (const tableName of Object.keys(migratedState)) {
    if (!schemaState[tableName]) {
      errors.push(`Таблица "${tableName}" удалена из schema.ts, но всё ещё существует в миграциях.`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n💥 ОШИБКИ ВАЛИДАЦИИ МИГРАЦИЙ (проверено файлов: ${upFiles.length}):\n`);
    errors.forEach((e) => console.error(`  ❌ ${e}`));
    process.exit(1);
  }

  console.log(`✅ Все миграции (${upFiles.length} шт.) валидны и на 100% соответствуют schema.ts!`);
}
