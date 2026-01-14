import fs from 'fs';
import generate_random_character from './generate_random_character';
import insert_total_count from './insert_total_count';

export default function generate_file(filePath, fileSize) {
    const chunk_size = 500;
    let total_count = 0;
    const writable_stream = fs.createWriteStream(filePath);

    function writeNextChunk() {
        if (total_count * chunk_size < fileSize) {
          let chunk = '';
          for (let i = 0; i < chunk_size; i++) {
            chunk += generate_random_character();
          }

          const count_info = insert_total_count(total_count);
          total_count++;

          if (!writable_stream.write(chunk + count_info)) {
            writable_stream.once('drain', writeNextChunk);
          } else {
            writeNextChunk();
          }
        } else {
          writable_stream.end(() => {
            console.log(`File created successfully at ${filePath}`);
          });
        }
    }

    writable_stream.on('error', (err) => {
    console.error('Error while writing the file:', err);
    });
    writeNextChunk();
}
