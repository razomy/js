import {snake_case_string} from "razomy.js/string/snake_case_string";

describe(`razomy.js.string.${snake_case_string.name}`, () => {
  it('`', () => {
    expect(snake_case_string('a-AA')).toStrictEqual('a_aa');
  });
});