import {getEmbedding} from './get_embedding';

export async function getLastCommitId(db, projectPath: string) {
  const session = db.session();

  const result = await session.run(
    `
        MATCH (r:Repository {name: $projectPath})
        RETURN r.lastCommitId AS lastCommitId
      `,
    {projectPath: projectPath}
  );
  await session.close();

  // If no repository is found, return null
  if (result.records.length === 0) {
    return null;
  }

  // Extract and return the lastCommitId from the first record
  return result.records[0].get('lastCommitId') as string;

}

export interface ChunkFile{
  chunks: { id: string, text: string }[],
  filePath: string
}

export async function indexFs(db, projectPath: string, lastCommitId: string, filesData: ChunkFile[]) {
  const session = db.session();
  console.log('🧠 Начинаем локальную векторизацию через Ollama...');

  // Размер пачки. Подберите оптимальный для вашей системы.
  // 50-100 — хороший баланс между нагрузкой на Ollama и скоростью Neo4j.
  const BATCH_SIZE = 5;
  let batchData = [] as any;
  let totalIndexed = 0;

  try {
    // 1. Единоразово обновляем репозиторий
    await session.run(`
      MERGE (r:Repository {name: $projectPath})
      SET r.lastCommitId = $lastCommitId,
          r.lastIndexed = timestamp()
    `, {
      projectPath: projectPath,
      lastCommitId: lastCommitId
    });

    // Функция для отправки накопленной пачки в Neo4j
    const flushBatch = async () => {
      if (batchData.length === 0) return;

      // Получаем эмбеддинги ПАРАЛЛЕЛЬНО для всей пачки
      // Если Ollama захлебывается, можно использовать библиотеку p-limit для ограничения конкурентности
      const embeddings = await Promise.all(batchData.map(b => getEmbedding(b.text)));

      // Подготавливаем данные для Neo4j, добавляя полученные векторы
      const neo4jRecords = batchData.map((item, index) => ({
        ...item,
        embedding: embeddings[index]
      }));

      // Записываем всю пачку ОДНИМ запросом с помощью UNWIND
      await session.run(`
        MATCH (r:Repository {name: $projectPath})
        UNWIND $batch AS item
        
        MERGE (f:File {path: item.filePath})
        MERGE (r)-[:HAS_FILE]->(f)
        
        MERGE (c:CodeChunk {id: item.chunkId})
        SET c.text = item.text, 
            c.embedding = item.embedding
            
        MERGE (f)-[:CONTAINS]->(c)
      `, {
        projectPath: projectPath,
        batch: neo4jRecords
      });

      totalIndexed += neo4jRecords.length;
      console.log(`✅ Проиндексировано чанков: ${totalIndexed}`);

      // Очищаем пачку для следующей итерации
      batchData = [];
    };
    // 2. Итерируемся по файлам и собираем данные в пачки
    let p = 0;
    for (const file of filesData) { // Исправлено mockCodebase -> files
      for (const chunk of file.chunks) {
        batchData.push({
          filePath: file.filePath,
          chunkId: chunk.id,
          text: chunk.text
        });

        // Если пачка заполнилась — отправляем в обработку
        if (batchData.length >= BATCH_SIZE) {
          await flushBatch();
        }
      }
      console.log(p++, filesData.length);
    }

    // 3. Отправляем остатки (если после цикла в массиве осталось меньше BATCH_SIZE элементов)
    await flushBatch();

    console.log(`🎉 Индексация завершена. Всего чанков: ${totalIndexed}`);

  } catch (error) {
    console.error('❌ Ошибка во время индексации:', error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function deleteFiles(db, projectPath, deletedFilePaths) {
  // Если список файлов пуст, ничего не делаем
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