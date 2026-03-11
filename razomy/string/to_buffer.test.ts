import { toBuffer } from './to_buffer';

describe('string', () => {
  describe('toBuffer', () => {
    // 1. Standard cases - utf8
    it('converts a utf8 string to a buffer', () => {
      const result = toBuffer('abc', 'utf8');
      expect(result).toEqual(Buffer.from([0x61, 0x62, 0x63]));
    });

    // 2. Standard cases - base64
    it('converts a base64 string to a buffer', () => {
      const result = toBuffer('YWJj', 'base64');
      expect(result).toEqual(Buffer.from([0x61, 0x62, 0x63]));
    });

    // 3. Standard cases - hex
    it('converts a hex string to a buffer', () => {
      const result = toBuffer('616263', 'hex');
      expect(result).toEqual(Buffer.from([0x61, 0x62, 0x63]));
    });

    // 4. Empty string
    it('returns an empty buffer for an empty string', () => {
      const result = toBuffer('', 'utf8');
      expect(result).toEqual(Buffer.from([]));
      expect(result.length).toBe(0);
    });

    it('returns an empty buffer for an empty base64 string', () => {
      const result = toBuffer('', 'base64');
      expect(result).toEqual(Buffer.from([]));
      expect(result.length).toBe(0);
    });

    it('returns an empty buffer for an empty hex string', () => {
      const result = toBuffer('', 'hex');
      expect(result).toEqual(Buffer.from([]));
      expect(result.length).toBe(0);
    });

    // 5. Return type
    it('returns an instance of Buffer', () => {
      const result = toBuffer('hello', 'utf8');
      expect(Buffer.isBuffer(result)).toBe(true);
    });

    // 6. Multi-byte characters with utf8
    it('correctly handles multi-byte utf8 characters', () => {
      const result = toBuffer('héllo', 'utf8');
      expect(result).toEqual(Buffer.from('héllo', 'utf8'));
      // 'é' is 2 bytes in utf8, so total length is 6
      expect(result.length).toBe(6);
    });

    // 7. ascii encoding
    it('converts an ascii string to a buffer', () => {
      const result = toBuffer('abc', 'ascii');
      expect(result).toEqual(Buffer.from([0x61, 0x62, 0x63]));
    });

    // 8. latin1 encoding
    it('converts a latin1 string to a buffer', () => {
      const result = toBuffer('abc', 'latin1');
      expect(result).toEqual(Buffer.from([0x61, 0x62, 0x63]));
    });

    // 9. base64url encoding
    it('converts a base64url string to a buffer', () => {
      const result = toBuffer('YWJj', 'base64url');
      expect(result).toEqual(Buffer.from([0x61, 0x62, 0x63]));
    });

    // 10. Longer strings
    it('correctly converts a longer utf8 string', () => {
      const input = 'Hello, World!';
      const result = toBuffer(input, 'utf8');
      expect(result.toString('utf8')).toBe(input);
      expect(result.length).toBe(13);
    });

    // 11. Round-trip consistency
    it('produces a buffer that can be converted back to the original string', () => {
      const original = 'The quick brown fox';
      const buffer = toBuffer(original, 'utf8');
      expect(buffer.toString('utf8')).toBe(original);
    });

    it('round-trips correctly with base64 encoding', () => {
      const base64String = Buffer.from('Hello, World!').toString('base64');
      const buffer = toBuffer(base64String, 'base64');
      expect(buffer.toString('utf8')).toBe('Hello, World!');
    });

    it('round-trips correctly with hex encoding', () => {
      const hexString = Buffer.from('Hello').toString('hex');
      const buffer = toBuffer(hexString, 'hex');
      expect(buffer.toString('utf8')).toBe('Hello');
    });

    // 12. Unicode / emoji characters
    it('handles unicode emoji characters with utf8 encoding', () => {
      const emoji = '😀';
      const result = toBuffer(emoji, 'utf8');
      expect(result.toString('utf8')).toBe(emoji);
      // Emoji is 4 bytes in utf8
      expect(result.length).toBe(4);
    });
  });
});