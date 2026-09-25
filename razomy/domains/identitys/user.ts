import * as abstracts from "@razomy/abstracts";
import * as domains from "@razomy/domains";

export interface User extends abstracts.domains.HasPrimaryId, abstracts.domains.CudDateTime {
  userProfiles: abstracts.domains.IdRef<UserProfile>[];
  userGames: abstracts.domains.IdRef<domains.games.UserGame>[];
  userAuths: abstracts.domains.IdRef<domains.auths.UserAuth>[];
}

export interface UserChild extends abstracts.domains.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  user: abstracts.domains.IdRef<User>;
}

export interface UserProfile extends UserChild, abstracts.domains.CudDateTime {
  name: string;
  avatar: string;
  contactEmail: string;
}
