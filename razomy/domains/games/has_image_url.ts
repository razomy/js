import * as abstractions from "@razomy/abstractions";
import * as domains from "@razomy/domains";

export interface HasImageUrl {
  imageUrl: abstractions.components.Url;
}

export interface HasTitle {
  title: string;
}


export interface UserGame extends abstractions.patterns.HasPrimaryId, abstractions.components.CrudDateTime, domains.identitys.HasNickName {
  /*
   * @uniq
   */
  nickName: abstractions.primitives.Char64;
  // game: Char64,
}

export interface UserGameChild extends abstractions.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userGame: abstractions.patterns.IdRef<UserGame>;
  games: abstractions.patterns.IdRef<Game>[];
}

export interface Game extends abstractions.patterns.HasPrimaryId, abstractions.components.CrudDateTime {
  title: abstractions.primitives.Char128;
}

export interface GameChild extends abstractions.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  game: abstractions.patterns.IdRef<Game>;
}

export interface Reward extends abstractions.patterns.IEntity{}

export interface Achievement extends abstractions.patterns.HasPrimaryId, HasImageUrl, HasTitle, abstractions.patterns.HasName {
  reward: abstractions.patterns.IdRef<Reward>;
}

export interface UserGameAchievement extends UserGameChild, GameChild, HasImageUrl, HasTitle, abstractions.patterns.HasName {
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
  friendTo: abstractions.graphs.KeyEdge<Player>[];
}

export interface Location extends GameChild {
  name: string;
  boundaries: abstractions.components.BoundRectangle;
}

export interface Item extends GameChild {
  name: string;
}

export interface PlayerMatch extends GameChild, UserGameChild, abstractions.components.CrudDateTime {
  userSkill: abstractions.primitives.Vector128;
}
