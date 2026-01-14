import object_to_formatted_string from './object_to_formatted_string';

describe('bytes', () => {
  it('getObjectSizeInBytes', () => {
    const input = { foo: 'bar' };

    const encoded = object_to_formatted_string(input);
    expect(encoded).toStrictEqual(13)
  });
});

