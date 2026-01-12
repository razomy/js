import fs from "fs";

function generate_random_character() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const random_index = Math.floor(Math.random() * characters.length);
  return characters.charAt(random_index);
}

function insert_total_count(totalCount) {
  return `\n[Chunk:${totalCount} Count:${totalCount * 500}]\n`;
}

function generate_file(filePath, fileSize) {
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


const file_path = '../../../razomy.notation.editor.web.server/output.txt';

const million =1e+6;
const ten_million =1e+7;
const hundred_million =1e+8;
const milliard =1e+9;
const billion =1e+12;
const trillion =1e+18;
const quadrillion =1e+24;
const quintillion =1e+30;
const sextillion =1e+36;
const septillion =1e+42;
const octillion =1e+48;
const nonillion =1e+54;
const decillion =1e+60;
const undecillion =1e+66;
const duodecillion =1e+72;
const tredecillion =1e+78;
const quattuordecillion =1e+84;
const quindecillion =1e+90;
const sexdecillion =1e+96;
const septendecillion =1e+102;
const octodecillion =1e+108;
const novemdecillion =1e+114;
const vigintillion =1e+120;
const centillion =1e+600;

generate_file(file_path, ten_million);
