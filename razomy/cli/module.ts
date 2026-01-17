export type CliFunction<TArgs extends string[]> = (...args: TArgs) => number | Promise<number>

export interface Module extends Record<string, CliFunction<string[]>> {
}

export type TerminalArgs<
  Rm extends keyof Module & string,
> = [Rm, ...Parameters<Module[Rm]>]
