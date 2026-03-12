import * as pipes from "@razomy/pipes";

describe('pipe', () => {
  it('pipe', () => {
    const worldLine = pipes.pipeSync(
      'hello',
      (prefix: string) => prefix + ' world',
      (prefix) => prefix + '!',
    );
    expect(worldLine).toStrictEqual('hello world!');
  });
});
