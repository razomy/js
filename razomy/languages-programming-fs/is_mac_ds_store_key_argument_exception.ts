import {isMacDsStoreKey} from './is_mac_ds_store_key';
import * as exceptions from '@razomy/exceptions';

export const PYTHON_DEPENDENCIES = ['.venv'];
export const NODEJS_DEPENDENCIES = ['node_modules'];
export const UNITY_DEPENDENCIES = ['Library'];

export const KNOWN_DEPENDENCIES = [...PYTHON_DEPENDENCIES, ...NODEJS_DEPENDENCIES, ...UNITY_DEPENDENCIES];

export const GIT_SLUG = '.git';
export const MAC_DS_STORE_FILE = '.DS_Store';

export class IsMacDsStoreKeyArgumentException extends exceptions.ArgumentException<string> {
  constructor(path: string) {
    super(isMacDsStoreKey.name, path);
  }
}
