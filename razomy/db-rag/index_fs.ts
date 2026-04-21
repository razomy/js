import * as vgd from './';

export async function indexFs(db, projectPath: string, lastCommitId: string, filesData: vgd.ChunkFile[]) {
  const session = db.session();
  console.log('🧠 Начинаем локальную векторизацию через Ollama...');
  const batchSize = 5;
  let batchData = [] as any;
  let totalIndexed = 0;
  try {
    // 1. Единоразово обновляем репозиторий
    await session.run(
      `
      MERGE (r:Repository {name: $projectPath})
      SET r.lastCommitId = $lastCommitId,
          r.lastIndexed = timestamp()
    `,
      {
        projectPath: projectPath,
        lastCommitId: lastCommitId,
      },
    );

    // Функция для отправки накопленной пачки в Neo4j
    async function flushBatch() {
      if (batchData.length === 0) return;

      // Получаем эмбеддинги ПАРАЛЛЕЛЬНО для всей пачки
      // Если Ollama захлебывается, можно использовать библиотеку p-limit для ограничения конкурентности
      const embeddings = await Promise.all(batchData.map((b) => vgd.getEmbedding(b.text)));

      // Подготавливаем данные для Neo4j, добавляя полученные векторы
      const neo4JRecords = batchData.map((item, index) => ({
        ...item,
        embedding: embeddings[index],
      }));

      // Записываем всю пачку ОДНИМ запросом с помощью UNWIND
      await session.run(
        `
        MATCH (r:Repository {name: $projectPath})
        UNWIND $batch AS item
        
        MERGE (f:File {path: item.filePath})
        MERGE (r)-[:HAS_FILE]->(f)
        
        MERGE (c:CodeChunk {id: item.chunkId})
        SET c.text = item.text, 
            c.embedding = item.embedding
            
        MERGE (f)-[:CONTAINS]->(c)
      `,
        {
          projectPath: projectPath,
          batch: neo4JRecords,
        },
      );

      totalIndexed += neo4JRecords.length;
      console.log(`✅ Проиндексировано чанков: ${totalIndexed}`);

      // Очищаем пачку для следующей итерации
      batchData = [];
    }
    // 2. Итерируемся по файлам и собираем данные в пачки
    let p = 0;
    for (const file of filesData) {
      // Исправлено mockCodebase -> files
      for (const chunk of file.chunks) {
        batchData.push({
          filePath: file.filePath,
          chunkId: chunk.id,
          text: chunk.text,
        });

        // Если пачка заполнилась — отправляем в обработку
        if (batchData.length >= batchSize) {
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
