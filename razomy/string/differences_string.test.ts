import {differences_string} from 'razomy.string';

describe(`string`, () => {
  describe(`differences_string.name`, () => {
    it('1', () => {
      expect(differences_string([
          "a\n",//
          "b\n",//
          "c\n",//-
          "d\n",//
          "e\n",//
          "f\n",//
          "g\n",//
        ].join(''), [
          "1\n",// +
          "a\n",//
          "b\n",//
          "2\n",// ++
          "c3\n",// ++
          "d\n",//
          "e\n",//
          "4\n",// +
          "f\n",//
          "g\n",//
        ].join('')),
      ).toStrictEqual([
        {"type": "added", "value": "1\n"},
        {"type": "unchanged", "value": "a\nb\n"},
        {"type": "removed", "value": "c\n"},
        {"type": "added", "value": "2\nc3\n"},
        {"type": "unchanged", "value": "d\ne\n"},
        {"type": "added", "value": "4\n"},
        {"type": "unchanged", "value": "f\ng\n"}
      ]);
    });

    it('2', () => {
      expect(differences_string([
          "a\n",//
          "b\n",//-
          "c\n",//-
          "d\n",//
          "e\n",//
          "f\n",//
          "g\n",//
        ].join(''), [
          "a\n",
          "1\n",//+
          "2\n",//+
          "3\n",//+
          "d\n",
          "e\n",
          "f\n",
          "g\n",
          "b\n",//+
          "c\n",//+
        ].join('')
      )).toStrictEqual([
        {"type": "unchanged", "value": "a\n"},
        {"type": "removed", "value": "b\nc\n"},
        {"type": "added", "value": "1\n2\n3\n"},
        {"type": "unchanged", "value": "d\ne\nf\ng\n"},
        {"type": "added", "value": "b\nc\n"}
      ]);
    });
  });
});
