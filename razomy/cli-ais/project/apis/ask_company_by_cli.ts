import * as aiScenarios from "@razomy/ai-scenarios";

export async function askCompanyByCli(challengePrompt: string, cliContext: { dirPath: string }) {
  const ctx: aiScenarios.refactor.actors.ActorContext = {
    tool: {
      project: { dirPath: cliContext.dirPath },
      // getDirFiles: [],
      // getFile: {},
      // setFile: {},
    },
    llm: {
      messages: [],
      tools: [],
    },
  };
  await aiScenarios.refactor.actors.directorCompany(challengePrompt, ctx);
}
