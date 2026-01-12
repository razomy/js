import { decode_json_string, encode_json_string }  from 'razomy/compression/gzip';

describe('compress', () => {
  it('should encode a string using gzip compression', () => {
    const input = { foo: 'bar' };

    const encoded = encode_json_string(input);
    const decoded = decode_json_string(encoded);

    expect(input).toEqual(decoded);
  });

  it('should correctly encode and decode a string with any characters', () => {
    const input = 'Hello, 你好, مرحبا, नमस्ते, γεια σας! 😊';

    const encoded = encode_json_string(input);
    const decoded = decode_json_string(encoded);

    expect(decoded).toEqual(input);
  });
});


it('should correctly encode and decode extremely large data', () => {
  // Helper function to generate a random string of specified length
  function generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters_length = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters_length));
    }
    return result;
  }

  // Generate a large random string
  const large_data = generateRandomString(10000000);

  // Encode the large data
  const encoded = encode_json_string(large_data);

  // Decode the encoded data
  const decoded = decode_json_string(encoded);

  // Verify that the decoded data matches the original large data
  expect(decoded).toEqual(large_data);
});

