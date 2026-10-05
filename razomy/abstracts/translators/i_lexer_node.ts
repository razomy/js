import * as abstracts from "@razomy/abstracts";


export interface ILexerNode extends abstracts.patterns.ISyntax {
  kind: Token;
}


export interface HasStack extends abstracts.patterns.IComponent {
  stack: number[];
}

export interface HasDeep extends abstracts.patterns.IComponent {
  deep: number;
}
export type Token = never;

export interface HasTokenType<T = Token> extends abstracts.patterns.IComponent {
  tokenType: T;
}

export interface HasToken<T = Token> extends abstracts.patterns.IComponent {
  token: T;
}

export interface HasTokens<TToken extends HasTokenType<any> = HasTokenType<Token>> {
  tokens: TToken[];
}



/** Связующее звено для сообщений об ошибках и LSP (IDE) */
export interface Span extends abstracts.patterns.IComponent {
  offset: number;
  length: number;
}
