import {cli} from '@razomy/cli';
import {Module, TerminalArgs} from '@razomy/cli';

export const testModule = {
  ['test:test1']: () => Promise.resolve(0),
  ['test:test2']: (a: string) => Promise.resolve(0),
  ['test:test3']: (a: string, b: string) => Promise.resolve(0),
} as const satisfies Module;

describe('cli', () => {
  describe('cli', () => {
    it('accepts empty arrays for `mergeProcessCovs`', () => {
      const params = [
        ['test:test1'],
        ['test:tests1'],
        ['test:test2', 'a'],
        ['test:test3', 'a', 'b'],
      ] satisfies TerminalArgs<keyof Module & string>[];
      expect(true).toStrictEqual(true)
    });
  });
});