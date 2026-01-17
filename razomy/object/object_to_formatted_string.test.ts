import {objectToFormattedString} from './object_to_formatted_string';

describe('bytes', () => {
  it('getObjectSizeInBytes', () => {
    const input = {foo: 'bar'};

    const encoded = objectToFormattedString(input);
    expect(encoded).toStrictEqual(13)
  });
});

