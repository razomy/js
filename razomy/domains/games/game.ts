import type { HasPrimaryId } from '../../abstracts/domains/has_id';
import type { Char128, Char64, Vector128 } from '../../abstracts/primitives/primitives';
import type { HasNickName } from '../identitys/has_name';
import type { CudDateTime, HasName, IdRef } from '@razomy/abstracts/domains';
import type { Url } from '../../abstracts/graphs/path_string';
import type { BoundRectangle } from '@razomy/abstracts/coordinates';
import type {KeyEdge} from "../../abstracts/graphs/edge_list_graph";

export interface HasImageUrl {
  imageUrl: Url;
}

export interface HasTitle {
  title: string;
}


export interface UserGame extends HasPrimaryId, CudDateTime, HasNickName {
  /*
   * @uniq
   */
  nickName: Char64;
  // game: Char64,
}

export interface UserGameChild extends HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userGame: IdRef<UserGame>;
  games: IdRef<Game>[];
}

export interface Game extends HasPrimaryId, CudDateTime {
  title: Char128;
}

export interface GameChild extends HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  game: IdRef<Game>;
}

export interface Reward {}

export interface Achievement extends HasPrimaryId, HasImageUrl, HasTitle, HasName {
  reward: IdRef<Reward>;
}

export interface UserGameAchievement extends UserGameChild, GameChild, HasImageUrl, HasTitle, HasName {
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
  friendTo: KeyEdge<Player>[];
}

export interface Location extends GameChild {
  name: string;
  boundaries: BoundRectangle;
}

export interface Item extends GameChild {
  name: string;
}

export interface PlayerMatch extends GameChild, UserGameChild, CudDateTime {
  userSkill: Vector128;
}
