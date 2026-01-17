import {Vrd, VrdOrValue} from 'razomy.vrd/vrd';
import {DictKey} from 'razomy.dict/dict';
import {isVrd} from './is_vrd';

export function mapVrd<I, O>(input: Vrd<I>, leafValueCb: (input: I, parent: DictKey) => O, parent: DictKey): Vrd<O>;
export function mapVrd<I, O>(input: I, leafValueCb: (input: I, parent?: DictKey) => O, parent: DictKey): O;
export function mapVrd<I, O>(input: VrdOrValue<I>, leafValueCb: (input: I, parent: DictKey) => O, parent: DictKey): VrdOrValue<O> ;
export function mapVrd<I, O>(
  input: VrdOrValue<I>,
  leafValueCb: (input: I, parent: DictKey) => O,
  parent: DictKey,
  nodeCb: ((input: Vrd<I>, parent: DictKey) => Vrd<O> | O),
): VrdOrValue<O>;
export function mapVrd<I, O>(
  input: VrdOrValue<I>,
  leafValueCb: (input: I, parent: DictKey) => O,
  parent: DictKey,
  nodeCb: ((input: Vrd<I>, parent: DictKey) => Vrd<O> | O) | undefined = undefined,
): VrdOrValue<O> {
  if (isVrd(input)) {
    let iter: any = input;
    if (nodeCb) {
      iter = nodeCb(iter, parent) as any;
      if (!isVrd(iter)) {
        return iter;
      }
    }
    const otput: Vrd<O> = new Vrd<O>();
    for (let inputKey in iter) {
      const value = iter[inputKey];
      otput[inputKey] = mapVrd(value, leafValueCb, inputKey, nodeCb!)
    }
    return otput;
  } else {
    return leafValueCb(input, parent)
  }
}


