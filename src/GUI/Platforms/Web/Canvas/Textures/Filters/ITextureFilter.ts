export interface IFilter {
  filter(): void;
}

export interface ITextureFilter {
  filter(imageData: any): void;
}
