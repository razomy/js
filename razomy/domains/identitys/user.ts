import * as abstracts from "@razomy/abstracts";
import * as domains from "@razomy/domains";

export interface User extends abstracts.patterns.HasPrimaryId, abstracts.components.CrudDateTime {
  userProfiles: abstracts.patterns.IdRef<UserProfile>[];
  userGames: abstracts.patterns.IdRef<domains.games.UserGame>[];
  userAuths: abstracts.patterns.IdRef<domains.auths.UserAuth>[];
}

export interface UserChild extends abstracts.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  user: abstracts.patterns.IdRef<User>;
}

export interface UserProfile extends UserChild, abstracts.components.CrudDateTime {
  name: string;
  avatar: string;
  contactEmail: string;
}
