import * as vrd from '@razomy/vrd';
import * as dict from '@razomy/dict';

export function test() {
  const specs: [any, vrd.VrdOrValue<any>, vrd.VrdOrValue<any>, vrd.P<any>[]][] = [
    [[], null, null, []],
    [[], 'a', null, [{ type: 'removed', path: '', value: 'a' }]],
    [[], null, 'b', [{ type: 'added', path: '', value: 'b' }]],
    [[], 'a', 'b', [{ type: 'replace', path: '', prevValue: 'a', value: 'b' }]],
    [[], 'a', vrd.create({ b: null }), [{ type: 'replace', path: '', prevValue: 'a', value: { b: null } }]],
    [[], vrd.create({ a: null }), 'b', [{ type: 'replace', path: '', prevValue: { a: null }, value: 'b' }]],
    // -

    [[], vrd.create({ a: null }), vrd.create({}), [{ type: 'removed', path: '', value: vrd.create({ a: null }) }]],
    [[], vrd.create({}), vrd.create({ b: null }), [{ type: 'added', path: '', value: vrd.create({ b: null }) }]],
    [
      [],
      vrd.create({ a: null }),
      vrd.create({ b: null }),
      [
        { type: 'removed', path: '', value: vrd.create({ a: null }) },
        { type: 'added', path: '', value: vrd.create({ b: null }) },
      ],
    ],
    // [[], d({'a': null}), d({'a1': null}), [
    //   {type: 'replace', old_value: d({a: null}), value: d({a1: null})},
    // ]],
    [
      [],
      vrd.create({ a: null }),
      vrd.create({ a: vrd.create({ b: null }) }),
      [{ type: 'added', path: 'a', value: vrd.create({ b: null }) }],
    ],
  ];
  for (const spec of specs) {
    const result = vrd.differencesDict(spec[0], spec[1], spec[2], '');
    console.log(dict.isEqual(result, spec[3]), result);
  }
}
