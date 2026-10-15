import * as abstractions from "@razomy/abstractions";


export interface ILexerNode extends abstractions.patterns.ISyntax {
  kind: Token;
}


export interface HasStack extends abstractions.patterns.IComponent {
  stack: number[];
}

export interface HasDeep extends abstractions.patterns.IComponent {
  deep: number;
}
export type Token = never;

export interface HasTokenType<T = Token> extends abstractions.patterns.IComponent {
  tokenType: T;
}

export interface HasToken<T = Token> extends abstractions.patterns.IComponent {
  token: T;
}

export interface HasTokens<TToken extends HasTokenType<any> = HasTokenType<Token>> {
  tokens: TToken[];
}



/** Связующее звено для сообщений об ошибках и LSP (IDE) */
export interface Span extends abstractions.patterns.IComponent {
  offset: number;
  length: number;
}
