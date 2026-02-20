import {getVrd, mergeVrd, Vrd} from '@razomy/vrd';

describe('dict', () => {
  describe('value_recursive', () => {
    describe(getVrd.name, () => {
      it('value', () => {
        const node = new Vrd<string>({
          'a1': '',
          'a2': new Vrd({
            'b1': '',
            'b2': new Vrd({
              'c2': ''
            })
          }),
          'a3': '',
          'a4': ''
        })
        let result = getVrd(node, ['a2', 'b2'], 0);
        expect(result).toStrictEqual(new Vrd({'c2': ''}));
      })
    });
    describe(mergeVrd.name, () => {
      it('value', () => {
        const a = new Vrd({
          'a1': '',
          'a2': new Vrd({
            'b1': 'c1',  // keep
            'b2': ''
          }),
          'a3': 'b1', // add
          'a4': new Vrd({ // keep
            'b1': ''
          }),
        })

        const b = new Vrd({
          'a1': 'b1', // add
          'a2': new Vrd({
            'b1': '',
            'b2': new Vrd({ // add
              'c2': ''
            }),
            'b3': '', // add
          }),
          'a3': 'b2', // add
          'a4': '' // skip
        })

        const c = new Vrd({
          'a1': 'b1', // b add
          'a2': new Vrd({
            'b1': 'c1',  // a keep
            'b2': new Vrd({
              'c2': ''
            }),
            'b3': '', // add
          }),
          'a3': new Vrd({
            'b1': '', // a add
            'b2': '' // b add
          }),
          'a4': new Vrd({ // keep a
            'b1': ''
          }),
        })
        let result = mergeVrd(a, b, '');
        expect(result).toStrictEqual(c);
      })
    });
  });
});
