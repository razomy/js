import { getEmbedding } from "./get_embedding";

export async function indexFs(db, repoName, currentCommitId, files) {
  const session = db.session();
  console.log('🧠 Начинаем локальную векторизацию через Ollama...');

  // Размер пачки. Подберите оптимальный для вашей системы.
  // 50-100 — хороший баланс между нагрузкой на Ollama и скоростью Neo4j.
  const BATCH_SIZE = 50;
  let batchData = [] as any;
  let totalIndexed = 0;

  try {
    // 1. Единоразово обновляем репозиторий
    await session.run(`
      MERGE (r:Repository {name: $repoName})
      SET r.lastCommitId = $commitId,
          r.lastIndexed = timestamp()
    `, {
      repoName: repoName,
      commitId: currentCommitId
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
        MATCH (r:Repository {name: $repoName})
        UNWIND $batch AS item
        
        MERGE (f:File {path: item.filePath})
        MERGE (r)-[:HAS_FILE]->(f)
        
        MERGE (c:CodeChunk {id: item.chunkId})
        SET c.text = item.text, 
            c.embedding = item.embedding
            
        MERGE (f)-[:CONTAINS]->(c)
      `, {
        repoName: repoName,
        batch: neo4jRecords
      });

      totalIndexed += neo4jRecords.length;
      console.log(`✅ Проиндексировано чанков: ${totalIndexed}`);

      // Очищаем пачку для следующей итерации
      batchData = [];
    };

    // 2. Итерируемся по файлам и собираем данные в пачки
    for (const file of files) { // Исправлено mockCodebase -> files
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
