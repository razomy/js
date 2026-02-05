import {ArgumentException} from '@razomy/exceptions';
import {WithPathString} from '@razomy/path.string';
import {isMacDsStoreKey} from './is_mac_ds_store_key';

export const pythonDependencies = ['.venv'];
export const nodejsDependencies = ['node_modules'];
export const unityDependencies = ['Library'];

export const knownDependencies = [
  ...pythonDependencies,
  ...nodejsDependencies,
  ...unityDependencies,
];

export const gitSlug = '.git';
export const macDsStoreFile = '.DS_Store';

export class IsMacDsStoreKeyArgumentException extends ArgumentException<WithPathString> {
  constructor(path: string) {
    super(isMacDsStoreKey.name, {pathString: path});
  }
}
