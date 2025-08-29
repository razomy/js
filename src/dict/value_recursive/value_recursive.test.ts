import {get} from "razomy.js/dict/value_recursive/get";
import {ValueRecursiveDict} from "razomy.js/dict/value_recursive/value";
import {merge} from "razomy.js/dict/value_recursive/merge";

describe('dict', () => {
  describe('value_recursive', () => {
    describe(get.name, () => {
      it('value', () => {
        const node = new ValueRecursiveDict<string>({
          'a1': '',
          'a2': new ValueRecursiveDict({
            'b1': '',
            'b2': new ValueRecursiveDict({
              'c2': ''
            })
          }),
          'a3': '',
          'a4': ''
        })
        let result = get(node, ['a2', 'b2'], 0);
        expect(result).toStrictEqual(new ValueRecursiveDict({'c2': ''}));
      })
    });
    describe(merge.name, () => {
      it('value', () => {
        const a = new ValueRecursiveDict({
          'a1': '',
          'a2': new ValueRecursiveDict({
            'b1': 'c1',  // keep
            'b2': ''
          }),
          'a3': 'b1', // add
          'a4': new ValueRecursiveDict({ // keep
            'b1': ''
          }),
        })

        const b = new ValueRecursiveDict({
          'a1': 'b1', // add
          'a2': new ValueRecursiveDict({
            'b1': '',
            'b2': new ValueRecursiveDict({ // add
              'c2': ''
            }),
            'b3': '', // add
          }),
          'a3': 'b2', // add
          'a4': '' // skip
        })

        const c = new ValueRecursiveDict({
          'a1': 'b1', // b add
          'a2': new ValueRecursiveDict({
            'b1': 'c1',  // a keep
            'b2': new ValueRecursiveDict({
              'c2': ''
            }),
            'b3': '', // add
          }),
          'a3': new ValueRecursiveDict({
            'b1': '', // a add
            'b2': '' // b add
          }),
          'a4': new ValueRecursiveDict({ // keep a
            'b1': ''
          }),
        })
        let result = merge(a, b, '');
        expect(result).toStrictEqual(c);
      })
    });
  });
});
