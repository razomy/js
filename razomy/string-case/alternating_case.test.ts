import { alternatingCase } from '@razomy/string-case';

describe('string', () => {
  describe('alternating_case', () => {
    // 1. Standard casing styles
    it('converts lowercase input', () => {
      expect(alternatingCase('hello')).toBe('hElLo');
    });

    it('converts uppercase input', () => {
      expect(alternatingCase('HELLO')).toBe('hElLo');
    });

    it('converts mixed case input', () => {
      expect(alternatingCase('TyPeScRiPt')).toBe('tYpEsCrIpT');
    });

    // 2. Handling Spaces (Sentence)
    it('handles spaces as characters (continuing the index pattern)', () => {
      // 'h'(0) 'e'(1) 'l'(2) 'l'(3) 'o'(4) ' '(5) 'w'(6) 'o'(7) 'r'(8) 'l'(9) 'd'(10)
      // h -> h, e -> E, l -> l, l -> L, o -> o, ' ' -> ' ', w -> w, o -> O, r -> r, l -> L, d -> d
      expect(alternatingCase('hello world')).toBe('hElLo wOrLd');
    });

    it('handles multiple words', () => {
      expect(alternatingCase('typescript is fun')).toBe('tYpEsCrIpT iS fUn');
    });

    // 3. Numbers and Symbols
    it('preserves numbers while respecting alternating index for letters', () => {
      // 0('1') 1('a'->'A') 2('2') 3('b'->'B')
      expect(alternatingCase('1a2b')).toBe('1A2B');
    });

    it('handles special characters and punctuation', () => {
      // 0('a') 1('!') 2('b') 3('@') 4('c')
      expect(alternatingCase('a!b@c')).toBe('a!b@c');
      expect(alternatingCase('user-name')).toBe('uSeR-nAmE');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(alternatingCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(alternatingCase('a')).toBe('a');
      expect(alternatingCase('Z')).toBe('z'); // Even index 0 becomes lowercase
    });

    // 5. Data Preservation
    it('preserves non-latin characters (if applicable)', () => {
      expect(alternatingCase('123')).toBe('123');
      expect(alternatingCase('$$$')).toBe('$$$');
    });
  });
});
