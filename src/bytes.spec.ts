import { getObjectSizeInBytes } from './bytes';

describe('encodeString and decodeString', () => {
  it('should encode a string using gzip compression', () => {
    const input = { foo: 'bar' };

    const encoded = getObjectSizeInBytes(input);
    console.log(encoded);
  });
});

