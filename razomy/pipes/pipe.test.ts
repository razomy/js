import {pipe} from '@razomy/pipes';

describe('pipe', () => {
  it('pipe', () => {
    const worldLine = pipe(
      'hello',
      (prefix: string) => prefix + ' world',
      (prefix) => prefix + '!'
    )
    expect(worldLine).toStrictEqual('hello world!')
  })
});
