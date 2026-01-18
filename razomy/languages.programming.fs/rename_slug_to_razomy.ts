import path from 'path';
import {PathString} from 'razomy.path.string';
import {rename} from 'razomy.fs';
import {razomyOutput} from './is_output';

export function renameSlugToRazomy(path_: PathString) {
  const dir = path.dirname(path_);
  const res = path.join(dir, razomyOutput[0]);
  rename(path_, res)
}
