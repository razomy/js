import * as object_ from "@razomy/object";

describe('bytes', () => {
  it('getObjectSizeInBytes', () => {
    const input = { foo: 'bar' };

    const encoded = object_.objectToFormattedString(input);
    expect(encoded).toStrictEqual(13);
  });
});
