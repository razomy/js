import * as vrd from "@razomy/vrd";

describe('dict', () => {
  describe('value_recursive', () => {
    describe(vrd.getVrd.name, () => {
      it('value', () => {
        const node = new vrd.Vrd<string>({
          a1: '',
          a2: new vrd.Vrd({
            b1: '',
            b2: new vrd.Vrd({
              c2: '',
            }),
          }),
          a3: '',
          a4: '',
        });
        let result = vrd.getVrd(node, ['a2', 'b2'], 0);
        expect(result).toStrictEqual(new vrd.Vrd({ c2: '' }));
      });
    });
    describe(vrd.mergeVrd.name, () => {
      it('value', () => {
        const a = new vrd.Vrd({
          a1: '',
          a2: new vrd.Vrd({
            b1: 'c1', // keep
            b2: '',
          }),
          a3: 'b1', // add
          a4: new vrd.Vrd({
            // keep
            b1: '',
          }),
        });

        const b = new vrd.Vrd({
          a1: 'b1', // add
          a2: new vrd.Vrd({
            b1: '',
            b2: new vrd.Vrd({
              // add
              c2: '',
            }),
            b3: '', // add
          }),
          a3: 'b2', // add
          a4: '', // skip
        });

        const c = new vrd.Vrd({
          a1: 'b1', // b add
          a2: new vrd.Vrd({
            b1: 'c1', // a keep
            b2: new vrd.Vrd({
              c2: '',
            }),
            b3: '', // add
          }),
          a3: new vrd.Vrd({
            b1: '', // a add
            b2: '', // b add
          }),
          a4: new vrd.Vrd({
            // keep a
            b1: '',
          }),
        });
        let result = vrd.mergeVrd(a, b, '');
        expect(result).toStrictEqual(c);
      });
    });
  });
});
