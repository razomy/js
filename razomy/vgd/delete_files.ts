
export async function deleteFiles(db, projectPath, deletedFilePaths) {
    if (!deletedFilePaths || deletedFilePaths.length === 0) {
    return;
    }

    const session = db.session();
    console.log(`🗑️ Начинаем удаление ${deletedFilePaths.length} файлов из БД...`);
    try {
    const result = await session.run(`
      // 1. Находим нужный репозиторий и удаляемые файлы в нем
      MATCH (r:Repository {name: $projectPath})-[:HAS_FILE]->(f:File)
      WHERE f.path IN $deletedFilePaths
      
      // 2. Находим связи этих файлов с чанками кода
      OPTIONAL MATCH (f)-[rel:CONTAINS]->(c:CodeChunk)
      
      // 3. Удаляем связи и сами узлы файлов
      DELETE rel, f
      
      // 4. Проверяем чанки: если на чанк больше не ссылается ни один файл (он стал сиротой), удаляем и его
      WITH c
      WHERE c IS NOT NULL AND NOT (c)<-[:CONTAINS]-()
      DELETE c
      
      // Возвращаем количество удаленных чанков для статистики
      RETURN count(c) AS deletedChunksCount
    `, {
      projectPath: projectPath,
      deletedFilePaths: deletedFilePaths
    });

    const deletedChunksCount = result.records[0]?.get('deletedChunksCount')?.toNumber() || 0;
    console.log(`✅ Удаление завершено. Очищено файлов: ${deletedFilePaths.length}, удалено чанков: ${deletedChunksCount}`);

    } catch (error) {
    console.error('❌ Ошибка во время удаления файлов:', error);
    throw error;
    } finally {
    await session.close();
    }
}
