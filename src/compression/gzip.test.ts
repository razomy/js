import { decodeJsonString, encodeJsonString }  from 'razomy.js/gzip';

describe('encodeString and decodeString', () => {
  it('should encode a string using gzip compression', () => {
    const input = { foo: 'bar' };

    const encoded = encodeJsonString(input);
    const decoded = decodeJsonString(encoded);

    expect(input).toEqual(decoded);
  });

  it('should correctly encode and decode a string with any characters', () => {
    const input = 'Hello, 你好, مرحبا, नमस्ते, γεια σας! 😊';

    const encoded = encodeJsonString(input);
    const decoded = decodeJsonString(encoded);

    expect(decoded).toEqual(input);
  });
});


it('should correctly encode and decode extremely large data', () => {
  // Helper function to generate a random string of specified length
  function generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Generate a large random string
  const largeData = generateRandomString(10000000);

  // Encode the large data
  const encoded = encodeJsonString(largeData);

  // Decode the encoded data
  const decoded = decodeJsonString(encoded);

  // Verify that the decoded data matches the original large data
  expect(decoded).toEqual(largeData);
});

