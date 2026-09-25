// Imports
import * as abstracts from './abstracts';
import * as acls from './acls';
import * as auths from './auths';
import * as domain from './domain';
import type { AnyEntityType } from './domian';
import * as event from './event';
import * as fs from './fs';
import * as games from './games';
import * as git from './git';
import * as identitys from './identitys';
import * as tx from './tx';

// Named exports
export {
  abstracts,
  acls,
  auths,
  domain,
  event,
  fs,
  games,
  git,
  identitys,
  tx
};
export type {
  AnyEntityType
};

// Default export
const domains = {
  abstracts,
  acls,
  auths,
  domain,
  event,
  fs,
  games,
  git,
  identitys,
  tx,
};


export default domains;
