import {line} from 'razomy.pipes';
import {execute} from './execute';

describe('pipe', () => {
  it('pipe', () => {
    const worldLine = line(
      (prefix: string) => prefix + ' world',
      (prefix) => prefix + '!'
    )
    const res = execute(worldLine, 'hello')
    expect(res).toStrictEqual('hello world!')
  })
});
