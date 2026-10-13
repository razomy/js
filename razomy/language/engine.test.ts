import * as language from '@razomy/language';

describe('language', () => {
  describe('engine', () => {
    // 1. Standard scenarios
    it('parse test', () => {
      const code = `
Main [
    "Привет, Разроми!" 
    .> Shell.Log
    . [ "Это результат из Flow-блока" ]
    .> Shell.Log
]
`;

      console.log('=== 1. ПАРСИНГ ===');
      const ast = language.parseRazomyCode(code);

      if (ast) {
        console.log('\n=== 2. ТРАНСПИЛЯЦИЯ В TYPESCRIPT ===');
        const transpiler = new language.RazomyToTSTranspiler();
        const tsCode = transpiler.transpile(ast);
        expect(tsCode).toBe(`
        const Main = (() => {
  return ((__ctx) => { if(typeof Shell.Log === "function") Shell.Log(__ctx); return __ctx; })((typeof (() => {
  return "Это результат из Flow-блока";
})() === "function" ? (() => {
  return "Это результат из Flow-блока";
})()(((__ctx) => { if(typeof Shell.Log === "function") Shell.Log(__ctx); return __ctx; })("Привет, Разроми!")) : (() => {
  return "Это результат из Flow-блока";
})()));
})();
        `.trim());
        console.log(tsCode);

        console.log('\n=== 3. ВЫПОЛНЕНИЕ В ИНТЕРПРЕТАТОРЕ ===');
        const interpreter = new language.RazomyInterpreter();
        const result = interpreter.run(ast);
        console.log('\nРезультат выполнения всего файла:', result);
        expect(result).toStrictEqual({"type": "String", "value": "Это результат из Flow-блока"});
      }
    });
  });
});
