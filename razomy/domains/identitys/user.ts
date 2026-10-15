import * as abstractions from "@razomy/abstractions";
import * as domains from "@razomy/domains";

export interface User extends abstractions.patterns.HasPrimaryId, abstractions.components.CrudDateTime {
  userProfiles: abstractions.patterns.IdRef<UserProfile>[];
  userGames: abstractions.patterns.IdRef<domains.games.UserGame>[];
  userAuths: abstractions.patterns.IdRef<domains.auths.UserAuth>[];
}

export interface UserChild extends abstractions.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  user: abstractions.patterns.IdRef<User>;
}

export interface UserProfile extends UserChild, abstractions.components.CrudDateTime {
  name: string;
  avatar: string;
  contactEmail: string;
}
