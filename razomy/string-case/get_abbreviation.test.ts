import { getAbbreviation } from '@razomy/string-case';

describe('string', () => {
  describe('get_abbreviation', () => {
    // 1. Standard scenarios
    it('generates abbreviation from title case sentence', () => {
      expect(getAbbreviation('Hello World')).toBe('HW');
    });

    it('generates abbreviation from lowercase sentence', () => {
      expect(getAbbreviation('node package manager')).toBe('npm');
    });

    it('generates abbreviation from mixed case sentence', () => {
      expect(getAbbreviation('HyperText Markup Language')).toBe('HML');
    });

    // 2. Handling Delimiters
    it('handles hyphens as separators', () => {
      expect(getAbbreviation('Read-Only-Memory')).toBe('ROM');
      expect(getAbbreviation('peer-to-peer')).toBe('ptp');
    });

    it('handles underscores as separators', () => {
      expect(getAbbreviation('snake_case_text')).toBe('sct');
    });

    it('handles mixed delimiters', () => {
      expect(getAbbreviation('Model-View_Controller')).toBe('MVC');
    });

    it('handles multiple separators/spaces correctly', () => {
      expect(getAbbreviation('Hello   World')).toBe('HW');
      expect(getAbbreviation('--foo--bar--')).toBe('fb');
    });

    // 3. Numbers and Special Characters
    it('includes numbers if they start a word', () => {
      expect(getAbbreviation('Section 5 Item')).toBe('S5I');
      expect(getAbbreviation('2024 Year Review')).toBe('2YR');
    });

    it('preserves casing of the original word', () => {
      expect(getAbbreviation('javaScript Object Notation')).toBe('jON');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(getAbbreviation('')).toBe('');
    });

    it('handles single words', () => {
      expect(getAbbreviation('Single')).toBe('S');
    });
  });
});