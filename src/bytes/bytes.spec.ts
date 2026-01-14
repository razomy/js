import { get_object_size_in_bytes }  from 'razomy.bytes/bytes';

describe('bytes', () => {
  it('getObjectSizeInBytes', () => {
    const input = { foo: 'bar' };

    const encoded = get_object_size_in_bytes(input);
    expect(encoded).toStrictEqual(13)
  });
});

