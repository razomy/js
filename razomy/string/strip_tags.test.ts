import * as string from "@razomy/string";

describe('string', () => {
  describe('stripTags', () => {
    // 1. Standard cases
    it('strips a simple paragraph tag', () => {
      expect(string.stripTags('<p>Hello world</p>')).toBe('Hello world');
    });

    it('strips an anchor tag with attributes', () => {
      expect(string.stripTags('<a href="https://example.com">Link</a>')).toBe('Link');
    });

    it('strips nested tags', () => {
      expect(string.stripTags('<div><span>content</span></div>')).toBe('content');
    });

    // 2. Empty and no-tag strings
    it('returns an empty string when given an empty string', () => {
      expect(string.stripTags('')).toBe('');
    });

    it('returns the same string when there are no tags', () => {
      expect(string.stripTags('Hello world')).toBe('Hello world');
    });

    // 3. Self-closing tags
    it('strips self-closing tags like <br/>', () => {
      expect(string.stripTags('Hello<br/>world')).toBe('Helloworld');
    });

    it('strips self-closing tags like <hr />', () => {
      expect(string.stripTags('Before<hr />After')).toBe('BeforeAfter');
    });

    it('strips <img> tags with attributes', () => {
      expect(string.stripTags('Look at this: <img src="image.png" alt="photo" />')).toBe('Look at this: ');
    });

    // 4. Tags with various attributes
    it('strips tags with multiple attributes', () => {
      expect(string.stripTags('<div class="container" id="main" data-value="42">Text</div>')).toBe('Text');
    });

    it('strips tags with single-quoted attributes', () => {
      expect(string.stripTags("<div class='test'>Content</div>")).toBe('Content');
    });

    // 5. Multiple tags and mixed content
    it('strips multiple different tags from a string', () => {
      expect(string.stripTags('<h1>Title</h1><p>Paragraph</p>')).toBe('TitleParagraph');
    });

    it('handles mixed text and tags', () => {
      expect(string.stripTags('Hello <b>bold</b> and <i>italic</i> text')).toBe('Hello bold and italic text');
    });

    // 6. Deeply nested tags
    it('strips deeply nested tags', () => {
      expect(string.stripTags('<div><ul><li><a href="#">Item</a></li></ul></div>')).toBe('Item');
    });

    // 7. Edge cases with special characters
    it('preserves content with special characters outside of tags', () => {
      expect(string.stripTags('<p>Price: $5 &amp; tax</p>')).toBe('Price: $5 &amp; tax');
    });

    it('handles tags with newlines inside them', () => {
      expect(string.stripTags('<div\nclass="test"\n>Content</div>')).toBe('Content');
    });

    // 8. Only tags, no text content
    it('returns an empty string when the input is only tags', () => {
      expect(string.stripTags('<div><span></span></div>')).toBe('');
    });

    it('returns an empty string for a single empty tag', () => {
      expect(string.stripTags('<br>')).toBe('');
    });

    // 9. Script and style tags
    it('strips script tags but leaves their inner text content', () => {
      expect(string.stripTags('<script>alert("xss")</script>')).toBe('alert("xss")');
    });

    it('strips style tags but leaves their inner text content', () => {
      expect(string.stripTags('<style>body { color: red; }</style>')).toBe('body { color: red; }');
    });

    // 10. Angle brackets in non-tag context
    it('handles greater-than signs in text that are not part of tags', () => {
      expect(string.stripTags('5 > 3')).toBe('5 > 3');
    });

    // 11. Comment-like structures
    it('strips HTML comments', () => {
      expect(string.stripTags('Hello <!-- comment --> world')).toBe('Hello  world');
    });

    // 12. Whitespace handling
    it('preserves whitespace between stripped tags', () => {
      expect(string.stripTags('<p>Hello</p> <p>World</p>')).toBe('Hello World');
    });
  });
});
