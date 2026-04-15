import * as maths from '@razomy/maths';

describe('maths', () => {
  describe('calculate', () => {
    it('calculate', () => {
      expect(maths.calculate('1.2 * (2 + 4.5)')).toBe('7.8');
    });

    it('calculateWithParams', () => {
      expect(maths.calculateWithParams('1.2 * (2 + 4.5)')).toBe('7.8');
    });
  });
});
