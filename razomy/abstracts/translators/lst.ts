export interface HasTokenType<T = Token> {
  tokenType: T;
}

export interface HasToken<T = Token> {
  token: T;
}

export interface HasTokens<TToken extends HasTokenType<any> = HasTokenType<Token>> {
  tokens: TToken[];
}

export type Token = never;

export interface TokenNode {
  kind: Token;
}

/** Связующее звено для сообщений об ошибках и LSP (IDE) */
export interface Span {
  offset: number;
  length: number;
}
