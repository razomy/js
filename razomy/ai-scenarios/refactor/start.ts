import * as main from "@razomy/main";
//
// function refactor() {
//   return `
// Your task is to complete project refactoring.
// You need to run build command.
// If it return error
//  go and fix it
// if there no errors
//  done
//
// If there is problem with imports
// Use absolute import style like
// import * as <packageName camelCase> from "<packgeName>";
// import * as aiScenarios from "@razomy/ai-scenarios";
// aiScenarios.refactor.actors.ActorContext
// `;
// }



main.ifMain(import.meta.url, async () => {
  // await aiScenarios.refactor.ai.start(path.resolve('razomy'), refactor());
})
