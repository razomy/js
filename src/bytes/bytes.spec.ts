import { getObjectSizeInBytes }  from 'razomy/bytes/bytes';

describe('bytes', () => {
  it('getObjectSizeInBytes', () => {
    const input = { foo: 'bar' };

    const encoded = getObjectSizeInBytes(input);
    expect(encoded).toStrictEqual(13)
  });
});

