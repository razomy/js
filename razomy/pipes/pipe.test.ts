import {pipeSync} from '@razomy/pipes';

describe('pipe', () => {
  it('pipe', () => {
    const worldLine = pipeSync(
      'hello',
      (prefix: string) => prefix + ' world',
      (prefix) => prefix + '!'
    )
    expect(worldLine).toStrictEqual('hello world!')
  })
});
