export interface ITreeNodeAttribute {
  parent: ITreeNodeAttribute | null;
  prev: ITreeNodeAttribute | null;
  next: ITreeNodeAttribute | null;
  children: ITreeNodeAttribute[];
  siblings: ITreeNodeAttribute[];
}
