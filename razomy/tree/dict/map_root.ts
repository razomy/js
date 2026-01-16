import { Leaf } from 'razomy.tree/leaf';
import  { map_branch,RootDict, RootOrBranchDict} from './map_branch';

export function map_root<I, O>(input: RootDict<I>, leaf_value_cb: (input: Leaf<I>, parent: RootOrBranchDict<I>) => O) {
    const otput: RootDict<O> = {
            children: {}
          };
    for (let input_key in input.children) {
    const value = input[input_key];
    otput[input_key] = map_branch(otput, value, leaf_value_cb)
    }

    return otput;
}
