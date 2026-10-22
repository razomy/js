// --- START OF FILE generate_initial_migrations.ts ---

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as sql from '@razomy/sql';

function getNextMigrationPrefix(dir: string): string {
  const files = sql.migration.getUpFiles(dir);
  if (files.length === 0) return '000001';

  const lastFile = files[files.length - 1];
  const lastNum = parseInt(lastFile.split('_')[0], 10);
  return String(lastNum + 1).padStart(6, '0');
}

function writeMigrationFilePair(dir: string, suffix: string, upSql: string, downSql: string): string {
  const prefix = getNextMigrationPrefix(dir);
  const baseName = `${prefix}_${suffix}`;
  fs.writeFileSync(path.join(dir, `${baseName}.up.sql`), upSql, 'utf-8');
  fs.writeFileSync(path.join(dir, `${baseName}.down.sql`), downSql, 'utf-8');
  return baseName;
}

/** Генерация DROP TABLE (и снос существующей таблицы при удалении) */
function buildDropTableSql(
  tableName: string,
  actualTable: sql.migration.TableState,
): { upSql: string; downSql: string } {
  const upSteps: string[] = [];
  const downCols: string[] = [];
  const downIndexes: string[] = [];

  for (const [idxName, colName] of actualTable.indexes.entries()) {
    upSteps.push(`DROP INDEX IF EXISTS ${idxName};`);
    downIndexes.push(`CREATE INDEX IF NOT EXISTS ${idxName} ON ${tableName}(${colName});`);
  }

  upSteps.push(`DROP TABLE IF EXISTS ${tableName};`);

  for (const [colName, colState] of Object.entries(actualTable.columns)) {
    let line = `    ${colName} ${colState.sqlType}`;
    if (colState.isPk) line += ' PRIMARY KEY';
    else if (colState.notNull) line += ' NOT NULL';
    if (colState.defaultVal) line += ` DEFAULT ${colState.defaultVal}`;
    downCols.push(line);
  }

  let downSql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n${downCols.join(',\n')}\n);\n`;
  if (downIndexes.length > 0) {
    downSql += `\n${downIndexes.join('\n')}\n`;
  }

  return { upSql: upSteps.join('\n') + '\n', downSql };
}

/**
 * Пошаговый генератор эволюции существующей таблицы:
 * 1. Сверяет колонки, требует маппинг при неоднозначности.
 * 2. Генерирует безопасный план: ADD COLUMN -> UPDATE (перенос) -> SET NOT NULL -> DROP INDEX -> DROP COLUMN -> CREATE INDEX.
 */
function buildAlterTableMigration(
  table: sql.TableDeclaration,
  actualTable: sql.migration.TableState,
): { upSql: string; downSql: string; prompts: string[] } {
  const prompts: string[] = [];
  const upSteps: string[] = [];
  const downSteps: string[] = [];

  const pks = Object.keys(table.primary || {});
  const targetCols: Record<string, sql.migration.NormalizedColumn & { isPk: boolean }> = {};

  for (const [fieldName, fieldDef] of Object.entries(table.record)) {
    targetCols[sql.toSnake(fieldName)] = {
      ...sql.migration.normalizeField(fieldDef),
      isPk: pks.length === 1 && pks[0] === fieldName,
    };
  }

  const droppedAllowed = new Set((table.migrationRules?.droppedColumns || []).map(sql.toSnake));
  const ignoredCols = new Set((table.migrationRules?.ignoreColumns || []).map(sql.toSnake));

  const missingInSchema = Object.keys(actualTable.columns).filter((col) => !targetCols[col] && !ignoredCols.has(col));
  const addedInSchema = Object.keys(targetCols).filter((col) => !actualTable.columns[col]);

  // 1. Валидация пропавших колонок (требуем либо migrateFrom у новой колонки, либо droppedColumns)
  for (const oldCol of missingInSchema) {
    const isMappedToNew = addedInSchema.some((newCol) => targetCols[newCol].migrateFrom === oldCol);

    if (!droppedAllowed.has(oldCol) && !isMappedToNew) {
      const hint =
        addedInSchema.length > 0
          ? `Если это переименование в [${addedInSchema.join(', ')}], укажи у нового поля "migrateFrom: '${oldCol}'". Иначе добавь '${oldCol}' в migrationRules.droppedColumns.`
          : `Если поле удалено осознанно, добавь '${oldCol}' в migrationRules.droppedColumns.`;

      prompts.push(
        `[Таблица "${table.name_}"] Поле "${oldCol}" есть в миграциях, но исчезло из schema.ts.\n     👉 ${hint}`,
      );
    }
  }

  // 2. Удаление устаревших индексов (делаем ДО удаления колонок!)
  const targetIndexes = new Map<string, string>();
  for (const idxField of Object.keys(table.index || {})) {
    const col = sql.toSnake(idxField);
    targetIndexes.set(`idx_${table.name_}_${col}`, col);
  }

  for (const [existingIdx, indexedCol] of actualTable.indexes.entries()) {
    if (!targetIndexes.has(existingIdx)) {
      upSteps.push(`-- Удаление устаревшего индекса "${existingIdx}"`);
      upSteps.push(`DROP INDEX IF EXISTS ${existingIdx};`);
      downSteps.push(`CREATE INDEX IF NOT EXISTS ${existingIdx} ON ${table.name_}(${indexedCol});`);
    }
  }

  // 3. Добавление новых колонок и перенос данных из старых
  for (const newCol of addedInSchema) {
    const def = targetCols[newCol];
    const mustBeNotNull = def.isPk || !def.nullable;

    if (def.migrateFrom) {
      const srcCol = def.migrateFrom;
      if (!actualTable.columns[srcCol]) {
        prompts.push(
          `[Таблица "${table.name_}"] Поле "${newCol}" указывает на migrateFrom: "${srcCol}", но колонки "${srcCol}" нет в текущем состоянии БД.`,
        );
        continue;
      }

      const copyExpr = def.transformSql || srcCol;

      upSteps.push(`-- Создание поля "${newCol}" и перенос данных из "${srcCol}"`);
      upSteps.push(
        `ALTER TABLE ${table.name_} ADD COLUMN ${newCol} ${def.sqlType}${def.sqlDefault ? ` DEFAULT ${def.sqlDefault}` : ''};`,
      );
      upSteps.push(`UPDATE ${table.name_} SET ${newCol} = ${copyExpr};`);

      if (mustBeNotNull) {
        upSteps.push(`ALTER TABLE ${table.name_} ALTER COLUMN ${newCol} SET NOT NULL;`);
      }

      downSteps.unshift(`ALTER TABLE ${table.name_} DROP COLUMN ${newCol};`);
    } else {
      // Новое поле без migrateFrom: если оно NOT NULL и без DEFAULT, требуем уточнения
      if (mustBeNotNull && !def.sqlDefault) {
        const suggestion =
          missingInSchema.length > 0
            ? `Укажи "migrateFrom: '${missingInSchema[0]}'" (для переноса) ИЛИ задай "default_" / "nullable: true".`
            : `Поле NOT NULL в существующей таблице требует "default_" или "nullable: true".`;

        prompts.push(
          `[Таблица "${table.name_}"] Новое поле "${newCol}" (NOT NULL) не знает, чем заполнить существующие строки.\n     👉 ${suggestion}`,
        );
        continue;
      }

      let colDef = `${newCol} ${def.sqlType}`;
      if (mustBeNotNull) colDef += ' NOT NULL';
      if (def.sqlDefault) colDef += ` DEFAULT ${def.sqlDefault}`;

      upSteps.push(`-- Добавление новой колонки "${newCol}"`);
      upSteps.push(`ALTER TABLE ${table.name_} ADD COLUMN ${colDef};`);
      downSteps.unshift(`ALTER TABLE ${table.name_} DROP COLUMN ${newCol};`);
    }
  }

  // 4. Изменение типов или NOT NULL у существующих колонок
  for (const [colName, def] of Object.entries(targetCols)) {
    const actualCol = actualTable.columns[colName];
    if (!actualCol) continue;

    if (actualCol.sqlType !== def.sqlType) {
      const usingClause = def.transformSql ? ` USING ${def.transformSql}` : '';
      upSteps.push(`-- Смена типа "${colName}": ${actualCol.sqlType} -> ${def.sqlType}`);
      upSteps.push(`ALTER TABLE ${table.name_} ALTER COLUMN ${colName} TYPE ${def.sqlType}${usingClause};`);
      downSteps.unshift(`ALTER TABLE ${table.name_} ALTER COLUMN ${colName} TYPE ${actualCol.sqlType};`);
    }

    const targetNotNull = def.isPk || !def.nullable;
    if (actualCol.notNull !== targetNotNull) {
      const upAction = targetNotNull ? 'SET NOT NULL' : 'DROP NOT NULL';
      const downAction = actualCol.notNull ? 'SET NOT NULL' : 'DROP NOT NULL';
      upSteps.push(`ALTER TABLE ${table.name_} ALTER COLUMN ${colName} ${upAction};`);
      downSteps.unshift(`ALTER TABLE ${table.name_} ALTER COLUMN ${colName} ${downAction};`);
    }
  }

  // 5. Удаление старых колонок (после того как данные скопированы в новые!)
  for (const oldCol of missingInSchema) {
    const oldColState = actualTable.columns[oldCol];
    const mappedTarget = addedInSchema.find((newCol) => targetCols[newCol].migrateFrom === oldCol);

    if (droppedAllowed.has(oldCol) || mappedTarget) {
      upSteps.push(`-- Удаление старой колонки "${oldCol}"`);
      upSteps.push(`ALTER TABLE ${table.name_} DROP COLUMN ${oldCol};`);

      // В DOWN: сначала создаем старую колонку, возвращаем в нее данные из новой, ставим NOT NULL
      const restoreOldCol: string[] = [];
      restoreOldCol.push(
        `ALTER TABLE ${table.name_} ADD COLUMN ${oldCol} ${oldColState.sqlType}${oldColState.defaultVal ? ` DEFAULT ${oldColState.defaultVal}` : ''};`,
      );
      if (mappedTarget) {
        restoreOldCol.push(`UPDATE ${table.name_} SET ${oldCol} = ${mappedTarget};`);
      }
      if (oldColState.notNull) {
        restoreOldCol.push(`ALTER TABLE ${table.name_} ALTER COLUMN ${oldCol} SET NOT NULL;`);
      }
      // Вставляем ПЕРЕД удалением новой колонки в downSteps
      downSteps.unshift(...restoreOldCol);
    }
  }

  // 6. Создание новых индексов (после того как новые колонки созданы!)
  for (const [idxName, col] of targetIndexes.entries()) {
    if (!actualTable.indexes.has(idxName)) {
      upSteps.push(`CREATE INDEX IF NOT EXISTS ${idxName} ON ${table.name_}(${col});`);
      downSteps.unshift(`DROP INDEX IF EXISTS ${idxName};`);
    }
  }

  return {
    upSql: upSteps.length > 0 ? upSteps.join('\n') + '\n' : '',
    downSql: downSteps.length > 0 ? downSteps.join('\n') + '\n' : '',
    prompts,
  };
}

/**
 * ЕДИНАЯ ТОЧКА ВХОДА:
 * 1. Сверяет текущие миграции со схемой.
 * 2. Если есть неразрешенные конфликты полей/таблиц — выводит подсказки и выходит.
 * 3. Если всё чисто — догенерирует недостающие миграции (CREATE, ALTER или DROP) и запускает валидатор.
 */
export function generateInitialMigrations(
  dir: string,
  tables: Record<string, sql.TableDeclaration>,
  droppedTables: string[],
): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const upFiles = sql.migration.getUpFiles(dir);
  const migratedState = sql.migration.replayMigrationsState(dir, upFiles);
  const allPrompts: string[] = [];

  const pendingMigrations: Array<{ suffix: string; upSql: string; downSql: string; log: string }> = [];

  // А. Проверяем таблицы из schema.ts (Новые или Измененные)
  for (const table of Object.values(tables)) {
    const actualTable = migratedState[table.name_];

    if (!actualTable) {
      const { upSql, downSql } = sql.migration.buildCreateTableSql(table);
      pendingMigrations.push({
        suffix: `create_${table.name_}`,
        upSql,
        downSql,
        log: `✅ Создана миграция новой таблицы "${table.name_}"`,
      });
      continue;
    }

    const { upSql, downSql, prompts } = buildAlterTableMigration(table, actualTable);
    if (prompts.length > 0) {
      allPrompts.push(...prompts);
      continue;
    }

    if (upSql) {
      pendingMigrations.push({
        suffix: `alter_${table.name_}`,
        upSql,
        downSql,
        log: `🔄 Создана миграция обновления таблицы "${table.name_}"`,
      });
    }
  }

  // Б. Проверяем таблицы, которые есть в миграциях, но удалены из Tables
  const activeTableNames = new Set(Object.values(tables).map((t) => t.name_));
  const allowedDroppedTables = new Set(droppedTables);

  for (const [existingTableName, actualTable] of Object.entries(migratedState)) {
    if (!activeTableNames.has(existingTableName)) {
      if (!allowedDroppedTables.has(existingTableName)) {
        allPrompts.push(
          `[Таблица "${existingTableName}"] Таблица есть в миграциях, но удалена из Tables в schema.ts!\n` +
          `     👉 Добавь '${existingTableName}' в массив DroppedTables в schema.ts для подтверждения генерации DROP TABLE.`,
        );
      } else {
        const { upSql, downSql } = buildDropTableSql(existingTableName, actualTable);
        pendingMigrations.push({
          suffix: `drop_${existingTableName}`,
          upSql,
          downSql,
          log: `🗑️ Создана миграция удаления таблицы "${existingTableName}"`,
        });
      }
    }
  }

  // Если есть вопросы к разработчику — НИЧЕГО не пишем на диск, выводим подсказки!
  if (allPrompts.length > 0) {
    console.error(`\n🛑 ТРЕБУЕТСЯ УТОЧНИТЬ ПРАВИЛА МИГРАЦИИ В schema.ts:\n`);
    allPrompts.forEach((p) => console.error(`  ⚠️ ${p}\n`));
    process.exit(1);
  }

  // Записываем сгенерированные миграции на диск
  for (const mig of pendingMigrations) {
    const baseName = writeMigrationFilePair(dir, mig.suffix, mig.upSql, mig.downSql);
    console.log(`${mig.log}: ${baseName}.up.sql / .down.sql`);
  }

  // Финальный контрольный выстрел: проверяем, что итоговое состояние всех файлов 100% валидно
  sql.migration.verifyMigrations(dir, tables);
}
