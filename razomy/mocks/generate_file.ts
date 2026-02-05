import fs from 'fs';
import {generateRandomCharacter} from './generate_random_character';
import {insertTotalCount} from './insert_total_count';

export function generateFile(filePath, fileSize) {
  const chunkSize = 500;
  let totalCount = 0;
  const writableStream = fs.createWriteStream(filePath);

  function writeNextChunk() {
    if (totalCount * chunkSize < fileSize) {
      let chunk = '';
      for (let i = 0; i < chunkSize; i++) {
        chunk += generateRandomCharacter();
      }

      const countInfo = insertTotalCount(totalCount);
      totalCount++;

      if (!writableStream.write(chunk + countInfo)) {
        writableStream.once('drain', writeNextChunk);
      } else {
        writeNextChunk();
      }
    } else {
      writableStream.end(() => {
        console.log(`File created successfully at ${filePath}`);
      });
    }
  }

  writableStream.on('error', (err) => {
    console.error('Error while writing the file:', err);
  });
  writeNextChunk();
}
