import { isMacDsStoreKey } from './is_mac_ds_store_key';
import * as exceptions from '@razomy/exceptions';
import * as abstracts from '@razomy/abstracts';

export const pythonDependencies = ['.venv'];
export const nodejsDependencies = ['node_modules'];
export const unityDependencies = ['Library'];

export const knownDependencies = [...pythonDependencies, ...nodejsDependencies, ...unityDependencies];

export const gitSlug = '.git';
export const macDsStoreFile = '.DS_Store';

export class IsMacDsStoreKeyArgumentException extends exceptions.ArgumentException<abstracts.graphs.WithPathString> {
  constructor(path: string) {
    super(isMacDsStoreKey.name, { pathString: path });
  }
}
