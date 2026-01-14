import vrd, { VrdOrValue } from "razomy.vrd/vrd";
import { equal_ } from "razomy.equal/equal";
import differences_vrd, {P} from './differences_vrd';

export function test() {
    const specs: [any, VrdOrValue<any>, VrdOrValue<any>, P<any>[]][] = [
            [[], null, null, []],
            [[], 'a', null, [{type: 'removed', path: '', value: 'a'}],],
            [[], null, 'b', [{type: 'added', path: '', value: 'b'}]],
            [[], 'a', 'b', [{type: 'replace', path: '', old_value: 'a', value: 'b'}]],
            [[], 'a', vrd({'b': null}), [{type: 'replace', path: '', old_value: 'a', value: {b: null}}]],
            [[], vrd({'a': null}), 'b', [{type: 'replace', path: '', old_value: {a: null}, value: 'b'}]],
            // -

            [[], vrd({'a': null}), vrd({}), [{type: 'removed', path: '', value: vrd({a: null})}],],
            [[], vrd({}), vrd({'b': null}), [{type: 'added', path: '', value: vrd({b: null})}]],
            [[], vrd({'a': null}), vrd({'b': null}), [
              {type: 'removed', path: '', value: vrd({a: null})},
              {type: 'added', path: '', value: vrd({b: null})}
            ]],
            // [[], d({'a': null}), d({'a1': null}), [
            //   {type: 'replace', old_value: d({a: null}), value: d({a1: null})},
            // ]],
            [[], vrd({'a': null}), vrd({'a': vrd({b: null})}), [
              {type: 'added', path: 'a', value: vrd({b: null})},
            ]],
          ];
    for (let spec of specs) {
    const result = differences_vrd(spec[0], spec[1], spec[2], '');
    console.log(equal_(result, spec[3]), result);
    }
}
