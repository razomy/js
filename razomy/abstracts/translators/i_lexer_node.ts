import * as abstracts from "@razomy/abstracts";


export interface ILexerNode extends abstracts.patterns.IEntity {
  kind: Token;
}


export interface HasStack {
  stack: number[];
}

export interface HasDeep {
  deep: number;
}
export type Token = never;

export interface HasTokenType<T = Token> {
  tokenType: T;
}

export interface HasToken<T = Token> {
  token: T;
}

export interface HasTokens<TToken extends HasTokenType<any> = HasTokenType<Token>> {
  tokens: TToken[];
}



/** Связующее звено для сообщений об ошибках и LSP (IDE) */
export interface Span {
  offset: number;
  length: number;
}
