import * as abstracts from "@razomy/abstracts";
import * as domains from "@razomy/domains";

export interface HasImageUrl {
  imageUrl: abstracts.graphs.Url;
}

export interface HasTitle {
  title: string;
}


export interface UserGame extends abstracts.domains.HasPrimaryId, abstracts.domains.CudDateTime, domains.identitys.HasNickName {
  /*
   * @uniq
   */
  nickName: abstracts.primitives.Char64;
  // game: Char64,
}

export interface UserGameChild extends abstracts.domains.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userGame: abstracts.domains.IdRef<UserGame>;
  games: abstracts.domains.IdRef<Game>[];
}

export interface Game extends abstracts.domains.HasPrimaryId, abstracts.domains.CudDateTime {
  title: abstracts.primitives.Char128;
}

export interface GameChild extends abstracts.domains.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  game: abstracts.domains.IdRef<Game>;
}

export interface Reward {}

export interface Achievement extends abstracts.domains.HasPrimaryId, HasImageUrl, HasTitle, abstracts.domains.HasName {
  reward: abstracts.domains.IdRef<Reward>;
}

export interface UserGameAchievement extends UserGameChild, GameChild, HasImageUrl, HasTitle, abstracts.domains.HasName {
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
  boundaries: abstracts.coordinates.BoundRectangle;
}

export interface Item extends GameChild {
  name: string;
}

export interface PlayerMatch extends GameChild, UserGameChild, abstracts.domains.CudDateTime {
  userSkill: abstracts.primitives.Vector128;
}
