import * as language from "@razomy/language";

describe("Razomy V4.0 Language Engine", () => {
  it("1. Transpiles type algebra (A B & C) and morphism chains (A [[_ + C] . [_ + E]]) cleanly", () => {
    const code = `
A B & C

Morphism [[_ + C] . [_ + E]]
`;
    const ast = language.parseRazomyCode(code);
    expect(ast).not.toBeNull();

    const transpiler = new language.RazomyToTSTranspiler();
    const tsCode = transpiler.transpile(ast);

    expect(tsCode).toBe(
      [
        `export type A = B & C;`,
        ``,
        `export function Morphism(_0: any) {`,
        `  const _1 = _0 + C;`,
        `  const _2 = _1 + E;`,
        `  return _2;`,
        `}`
      ].join("\n")
    );
  });

  it("2. Transpiles Main pipeline into clean linear TypeScript and executes it", () => {
    const code = `
Main [
    "Привет, Разроми!" 
    .> Shell.Log
    . [ "Это результат из Flow-блока" ]
    .> Shell.Log
]
`;
    const ast = language.parseRazomyCode(code);
    expect(ast).not.toBeNull();

    const transpiler = new language.RazomyToTSTranspiler();
    const tsCode = transpiler.transpile(ast);

    expect(tsCode).toBe(
      [
        `export function Main() {`,
        `  Shell.Log("Привет, Разроми!");`,
        `  const _1 = "Это результат из Flow-блока";`,
        `  Shell.Log(_1);`,
        `  return _1;`,
        `}`
      ].join("\n")
    );

    const interpreter = new language.RazomyInterpreter();
    const result = interpreter.run(ast);
    expect(result).toBe("Это результат из Flow-блока");
  });

  it("3. Supports V4.0 Lineage, Index Access (Jonn.0, Jonn.-1), and Type Subtraction (/)", () => {
    const code = `
User {
  Id String
  PasswordHash String
}

PublicUser User / User.PasswordHash

Sample {
  First "Alpha"
  Second "Beta"
  Last "Omega"
}

FirstVal Sample.0
LastVal Sample.-1
`;
    const ast = language.parseRazomyCode(code);
    expect(ast).not.toBeNull();

    const transpiler = new language.RazomyToTSTranspiler();
    const tsCode = transpiler.transpile(ast);

    expect(tsCode).toContain(`export type PublicUser = Omit<User, "PasswordHash">;`);
    expect(tsCode).toContain(`export const FirstVal = Sample[0];`);
    expect(tsCode).toContain(`export const LastVal = Sample.at(-1);`);

    const interpreter = new language.RazomyInterpreter();
    const lastResult = interpreter.run(ast);
    expect(lastResult).toBe("Omega");
  });
});
