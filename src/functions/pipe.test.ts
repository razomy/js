import * as functions from '@razomy/functions';

describe('pipe', () => {
  it('pipe', () => {
    const worldLine = functions.pipeSync(
      'hello',
      (prefix: string) => prefix + ' world',
      (prefix) => prefix + '!',
    );
    expect(worldLine).toStrictEqual('hello world!');
  });
});
