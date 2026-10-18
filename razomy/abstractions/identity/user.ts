import * as abstractions from "@razomy/abstractions";

export interface User extends abstractions.patterns.HasPrimaryId, abstractions.patterns.CrudDateTime {
  userProfiles: abstractions.patterns.IdRef<UserProfile>[];
  userGames: abstractions.patterns.IdRef<abstractions.game.UserGame>[];
  userAuths: abstractions.patterns.IdRef<abstractions.auth.UserAuth>[];
}

export interface UserChild extends abstractions.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  user: abstractions.patterns.IdRef<User>;
}

export interface UserProfile extends UserChild, abstractions.patterns.CrudDateTime {
  name: string;
  avatar: string;
  contactEmail: string;
}
