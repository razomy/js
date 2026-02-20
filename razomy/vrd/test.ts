import {vrd, type VrdOrValue} from './vrd';
import {equal} from '@razomy/equal';
import type {P} from './differences_vrd';
import {differencesDict} from './differences_dict';

export function test() {
  const specs: [any, VrdOrValue<any>, VrdOrValue<any>, P<any>[]][] = [
    [[], null, null, []],
    [[], 'a', null, [{type: 'removed', path: '', value: 'a'}],],
    [[], null, 'b', [{type: 'added', path: '', value: 'b'}]],
    [[], 'a', 'b', [{type: 'replace', path: '', oldValue: 'a', value: 'b'}]],
    [[], 'a', vrd({'b': null}), [{type: 'replace', path: '', oldValue: 'a', value: {b: null}}]],
    [[], vrd({'a': null}), 'b', [{type: 'replace', path: '', oldValue: {a: null}, value: 'b'}]],
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
    const result = differencesDict(spec[0], spec[1], spec[2], '');
    console.log(equal(result, spec[3]), result);
  }
}
