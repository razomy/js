import {calculate} from "./calculate";
import {calculateWithParams} from "./calculateWithParams";

describe('maths', () => {
  describe('calculate', () => {
    it('calculate', () => {
      expect(calculate('1.2 * (2 + 4.5)')).toBe("7.8");
    });

    it('calculateWithParams', () => {
      expect(calculateWithParams('1.2 * (2 + 4.5)')).toBe("7.8");
    });

  });
});
