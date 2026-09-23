import type { CudDateTime, IdRef } from '@razomy/abstracts/domains';
import type { UserAuth } from '../auths/auth';
import type { HasPrimaryId } from '../../abstracts/domains/has_id';
import type {UserGame} from "../games/game";

export interface User extends HasPrimaryId, CudDateTime {
  userProfiles: IdRef<UserProfile>[];
  userGames: IdRef<UserGame>[];
  userAuths: IdRef<UserAuth>[];
}

export interface UserChild extends HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  user: IdRef<User>;
}

export interface UserProfile extends UserChild, CudDateTime {
  name: string;
  avatar: string;
  contactEmail: string;
}
