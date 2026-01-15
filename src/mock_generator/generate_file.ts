import fs from 'fs';
import {generate_random_character} from './generate_random_character';
import {insert_total_count} from './insert_total_count';

export function generate_file(file_path, file_size) {
    const chunk_size = 500;
    let total_count = 0;
    const writable_stream = fs.createWriteStream(file_path);

    function write_next_chunk() {
        if (total_count * chunk_size < file_size) {
          let chunk = '';
          for (let i = 0; i < chunk_size; i++) {
            chunk += generate_random_character();
          }

          const count_info = insert_total_count(total_count);
          total_count++;

          if (!writable_stream.write(chunk + count_info)) {
            writable_stream.once('drain', write_next_chunk);
          } else {
            write_next_chunk();
          }
        } else {
          writable_stream.end(() => {
            console.log(`File created successfully at ${file_path}`);
          });
        }
    }

    writable_stream.on('error', (err) => {
    console.error('Error while writing the file:', err);
    });
    write_next_chunk();
}
