export interface WithTokenType<T> {
  tokenType: T
}

export interface WithToken<T> {
  token: T
}

export interface WithTokens<TToken extends WithTokenType<any>> {
  tokens: TToken[]
}
