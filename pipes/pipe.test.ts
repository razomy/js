import {line} from 'razomy.pipes';
import {execute} from './execute';

describe('pipe', () => {
  it('pipe', () => {
    const world_line = line(
      (prefix: string) => prefix + ' world',
      (prefix) => prefix + '!'
    )
    const res = execute(world_line, 'hello')
    expect(res).toStrictEqual('hello world!')
  })
});
