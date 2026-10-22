import path from 'node:path';
import fs from 'node:fs';

/** Проверка зеркальности .up.sql и .down.sql */
export function validateSymmetry(dir: string, upFiles: string[], errors: string[]): void {
  for (const upFile of upFiles) {
    const downFile = upFile.replace('.up.sql', '.down.sql');
    const downPath = path.join(dir, downFile);

    if (!fs.existsSync(downPath)) {
      errors.push(`Отсутствует файл отката: ${downFile}`);
      continue;
    }

    const upSql = fs.readFileSync(path.join(dir, upFile), 'utf-8').replace(/--.*$/gm, '');
    const downSql = fs.readFileSync(downPath, 'utf-8').replace(/--.*$/gm, '');

    for (const m of upSql.matchAll(/CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+(\w+)/gi)) {
      if (!new RegExp(`DROP\\s+TABLE.*\\b${m[1]}\\b`, 'i').test(downSql)) {
        errors.push(`[${downFile}] Нет отката (DROP TABLE ${m[1]}) для созданной таблицы.`);
      }
    }
    for (const m of upSql.matchAll(/ALTER\s+TABLE\s+(\w+)\s+ADD\s+(?:COLUMN\s+)?(\w+)/gi)) {
      if (!new RegExp(`ALTER\\s+TABLE\\s+${m[1]}\\s+DROP\\s+(?:COLUMN\\s+)?${m[2]}\\b`, 'i').test(downSql)) {
        errors.push(`[${downFile}] Нет отката (DROP COLUMN ${m[2]}) для таблицы ${m[1]}.`);
      }
    }
    for (const m of upSql.matchAll(/ALTER\s+TABLE\s+(\w+)\s+DROP\s+(?:COLUMN\s+)?(\w+)/gi)) {
      if (!new RegExp(`ALTER\\s+TABLE\\s+${m[1]}\\s+ADD\\s+(?:COLUMN\\s+)?${m[2]}\\b`, 'i').test(downSql)) {
        errors.push(`[${downFile}] Нет отката (ADD COLUMN ${m[2]}) для удаленной колонки в ${m[1]}.`);
      }
    }
  }
}
