const fs = require('fs');

function generateRandomCharacter() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

function insertTotalCount(totalCount) {
  return `\n[Chunk:${totalCount} Count:${totalCount * 500}]\n`;
}

function generateFile(filePath, fileSize) {
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


const filePath = '../../../razomy.notation.editor.web.server/output.txt';

const Million =1e+6;
const ten_Million =1e+7;
const hundred_Million =1e+8;
const Milliard =1e+9;
const Billion =1e+12;
const Trillion =1e+18;
const Quadrillion =1e+24;
const Quintillion =1e+30;
const Sextillion =1e+36;
const Septillion =1e+42;
const Octillion =1e+48;
const Nonillion =1e+54;
const Decillion =1e+60;
const Undecillion =1e+66;
const Duodecillion =1e+72;
const Tredecillion =1e+78;
const Quattuordecillion =1e+84;
const Quindecillion =1e+90;
const Sexdecillion =1e+96;
const Septendecillion =1e+102;
const Octodecillion =1e+108;
const Novemdecillion =1e+114;
const Vigintillion =1e+120;
const Centillion =1e+600;

generateFile(filePath, ten_Million);
