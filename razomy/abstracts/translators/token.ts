export interface WithTokenType<T = Token> {
  tokenType: T;
}

export interface WithToken<T = Token> {
  token: T;
}

export interface WithTokens<TToken extends WithTokenType<any> = WithTokenType<Token>> {
  tokens: TToken[];
}

export type Token = never;

export interface TokenNode {
  kind: Token;
}

/** Связующее звено для сообщений об ошибках и LSP (IDE) */
export interface Span {
  sourceId: number;//file_id
  start: number;
  end: number;
}
