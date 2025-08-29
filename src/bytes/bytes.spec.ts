import { getObjectSizeInBytes }  from 'razomy.js/bytes/bytes';

describe('bytes', () => {
  it('getObjectSizeInBytes', () => {
    const input = { foo: 'bar' };

    const encoded = getObjectSizeInBytes(input);
    expect(encoded).toStrictEqual(13)
  });
});

