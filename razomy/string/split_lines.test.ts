import { splitLines } from './split_lines';

describe('string', () => {
  describe('splitLines', () => {
    // 1. Standard cases
    it('splits a string by newline (\\n) characters', () => {
      expect(splitLines('Line 1\nLine 2')).toEqual(['Line 1', 'Line 2']);
    });

    it('splits a string by carriage return + newline (\\r\\n) characters', () => {
      expect(splitLines('Line 1\r\nLine 2')).toEqual(['Line 1', 'Line 2']);
    });

    it('splits a string by carriage return (\\r) characters', () => {
      expect(splitLines('Line 1\rLine 2')).toEqual(['Line 1', 'Line 2']);
    });

    it('splits a string with mixed newline characters', () => {
      expect(splitLines('A\r\nB\nC')).toEqual(['A', 'B', 'C']);
    });

    it('splits a string with all three newline types', () => {
      expect(splitLines('A\r\nB\nC\rD')).toEqual(['A', 'B', 'C', 'D']);
    });

    // 2. Single line / no newlines
    it('returns an array with the original string if no newlines are present', () => {
      expect(splitLines('One')).toEqual(['One']);
    });

    // 3. Empty string
    it('returns an array with one empty string for an empty input', () => {
      expect(splitLines('')).toEqual(['']);
    });

    // 4. Trailing and leading newlines
    it('handles a trailing newline', () => {
      expect(splitLines('Line 1\nLine 2\n')).toEqual(['Line 1', 'Line 2', '']);
    });

    it('handles a leading newline', () => {
      expect(splitLines('\nLine 1\nLine 2')).toEqual(['', 'Line 1', 'Line 2']);
    });

    it('handles trailing \\r\\n', () => {
      expect(splitLines('Line 1\r\nLine 2\r\n')).toEqual(['Line 1', 'Line 2', '']);
    });

    // 5. Consecutive newlines (empty lines)
    it('handles consecutive newlines producing empty strings', () => {
      expect(splitLines('A\n\nB')).toEqual(['A', '', 'B']);
    });

    it('handles multiple consecutive newlines', () => {
      expect(splitLines('\n\n\n')).toEqual(['', '', '', '']);
    });

    it('handles multiple consecutive \\r\\n', () => {
      expect(splitLines('\r\n\r\n')).toEqual(['', '', '']);
    });

    // 6. String with only newline characters
    it('handles a string that is just a single newline', () => {
      expect(splitLines('\n')).toEqual(['', '']);
    });

    it('handles a string that is just \\r\\n', () => {
      expect(splitLines('\r\n')).toEqual(['', '']);
    });

    it('handles a string that is just \\r', () => {
      expect(splitLines('\r')).toEqual(['', '']);
    });

    // 7. Multi-line content with spaces and tabs
    it('preserves whitespace within lines', () => {
      expect(splitLines('  Line 1  \n\tLine 2\t')).toEqual(['  Line 1  ', '\tLine 2\t']);
    });

    // 8. Longer content
    it('splits many lines correctly', () => {
      const input = 'a\nb\nc\nd\ne\nf';
      expect(splitLines(input)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });

    // 9. \\r\\n should not be split into two separate splits
    it('treats \\r\\n as a single delimiter, not two', () => {
      expect(splitLines('A\r\nB')).toEqual(['A', 'B']);
      expect(splitLines('A\r\nB')).not.toEqual(['A', '', 'B']);
    });
  });
});