import {ifMain} from "@razomy/main";
import path from "node:path";
import {start} from "./actors/actors";


function refactor() {
  return `
Your task is to complete project refactoring.
You need to run build command.
If it return error
 go and fix it
if there no errors
 done

If there is problem with imports
Use absolute import style like
import * as <packageName camelCase> from "<packgeName>";
import * as aiScenarios from "@razomy/ai-scenarios";
aiScenarios.refactor.actors.ActorContext
`;
}



ifMain(import.meta.url, async () => {
  await start(path.resolve('razomy'), refactor());
})
