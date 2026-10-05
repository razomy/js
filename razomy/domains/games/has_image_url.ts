import * as abstracts from "@razomy/abstracts";
import * as domains from "@razomy/domains";

export interface HasImageUrl {
  imageUrl: abstracts.components.Url;
}

export interface HasTitle {
  title: string;
}


export interface UserGame extends abstracts.patterns.HasPrimaryId, abstracts.components.CrudDateTime, domains.identitys.HasNickName {
  /*
   * @uniq
   */
  nickName: abstracts.primitives.Char64;
  // game: Char64,
}

export interface UserGameChild extends abstracts.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userGame: abstracts.patterns.IdRef<UserGame>;
  games: abstracts.patterns.IdRef<Game>[];
}

export interface Game extends abstracts.patterns.HasPrimaryId, abstracts.components.CrudDateTime {
  title: abstracts.primitives.Char128;
}

export interface GameChild extends abstracts.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  game: abstracts.patterns.IdRef<Game>;
}

export interface Reward extends abstracts.patterns.IEntity{}

export interface Achievement extends abstracts.patterns.HasPrimaryId, HasImageUrl, HasTitle, abstracts.patterns.HasName {
  reward: abstracts.patterns.IdRef<Reward>;
}

export interface UserGameAchievement extends UserGameChild, GameChild, HasImageUrl, HasTitle, abstracts.patterns.HasName {
  isViewed: boolean;
  isTouched: boolean;
  isReceived: boolean;
}

export interface FriendEdge {
  startDateAt: string;
  source: Player;
  target: Player;
}

export interface Player {
  friendTo: abstracts.graphs.KeyEdge<Player>[];
}

export interface Location extends GameChild {
  name: string;
  boundaries: abstracts.components.BoundRectangle;
}

export interface Item extends GameChild {
  name: string;
}

export interface PlayerMatch extends GameChild, UserGameChild, abstracts.components.CrudDateTime {
  userSkill: abstracts.primitives.Vector128;
}
