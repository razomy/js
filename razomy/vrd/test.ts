import * as vrd from '@razomy/vrd';
import * as dict from '@razomy/dict';

export function test() {
  const specs: [any, vrd.VrdOrValue<any>, vrd.VrdOrValue<any>, vrd.P<any>[]][] = [
    [[], null, null, []],
    [[], 'a', null, [{ type: 'removed', path: '', value: 'a' }]],
    [[], null, 'b', [{ type: 'added', path: '', value: 'b' }]],
    [[], 'a', 'b', [{ type: 'replace', path: '', prevValue: 'a', value: 'b' }]],
    [[], 'a', vrd.vrd({ b: null }), [{ type: 'replace', path: '', prevValue: 'a', value: { b: null } }]],
    [[], vrd.vrd({ a: null }), 'b', [{ type: 'replace', path: '', prevValue: { a: null }, value: 'b' }]],
    // -

    [[], vrd.vrd({ a: null }), vrd.vrd({}), [{ type: 'removed', path: '', value: vrd.vrd({ a: null }) }]],
    [[], vrd.vrd({}), vrd.vrd({ b: null }), [{ type: 'added', path: '', value: vrd.vrd({ b: null }) }]],
    [
      [],
      vrd.vrd({ a: null }),
      vrd.vrd({ b: null }),
      [
        { type: 'removed', path: '', value: vrd.vrd({ a: null }) },
        { type: 'added', path: '', value: vrd.vrd({ b: null }) },
      ],
    ],
    // [[], d({'a': null}), d({'a1': null}), [
    //   {type: 'replace', old_value: d({a: null}), value: d({a1: null})},
    // ]],
    [
      [],
      vrd.vrd({ a: null }),
      vrd.vrd({ a: vrd.vrd({ b: null }) }),
      [{ type: 'added', path: 'a', value: vrd.vrd({ b: null }) }],
    ],
  ];
  for (const spec of specs) {
    const result = vrd.differencesDict(spec[0], spec[1], spec[2], '');
    console.log(dict.isEqual(result, spec[3]), result);
  }
}
