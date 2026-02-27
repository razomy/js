import { abbreviation } from '@razomy/string-case';

describe('string', () => {
  describe('get_abbreviation', () => {
    // 1. Standard scenarios
    it('generates abbreviation from title case sentence', () => {
      expect(abbreviation('Hello World')).toBe('HW');
    });

    it('generates abbreviation from lowercase sentence', () => {
      expect(abbreviation('node package manager')).toBe('npm');
    });

    it('generates abbreviation from mixed case sentence', () => {
      expect(abbreviation('HyperText Markup Language')).toBe('HML');
    });

    // 2. Handling Delimiters
    it('handles hyphens as separators', () => {
      expect(abbreviation('Read-Only-Memory')).toBe('ROM');
      expect(abbreviation('peer-to-peer')).toBe('ptp');
    });

    it('handles underscores as separators', () => {
      expect(abbreviation('snake_case_text')).toBe('sct');
    });

    it('handles mixed delimiters', () => {
      expect(abbreviation('Model-View_Controller')).toBe('MVC');
    });

    it('handles multiple separators/spaces correctly', () => {
      expect(abbreviation('Hello   World')).toBe('HW');
      expect(abbreviation('--foo--bar--')).toBe('fb');
    });

    // 3. Numbers and Special Characters
    it('includes numbers if they start a word', () => {
      expect(abbreviation('Section 5 Item')).toBe('S5I');
      expect(abbreviation('2024 Year Review')).toBe('2YR');
    });

    it('preserves casing of the original word', () => {
      expect(abbreviation('javaScript Object Notation')).toBe('jON');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(abbreviation('')).toBe('');
    });

    it('handles single words', () => {
      expect(abbreviation('Single')).toBe('S');
    });
  });
});