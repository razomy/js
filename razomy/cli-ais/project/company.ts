import {type ActorContext, directorCompany} from './actor';

export async function runCompanyByCli(challengePrompt: string, cliContext: { dirPath: string }) {
  const ctx: ActorContext = {
    tool: {
      project: {dirPath: cliContext.dirPath},
      getDirFiles: [],
      getFile: {},
      setFile: {},
    },
    llm: {
      messages: [],
      tools: []
    }
  }
  await directorCompany(challengePrompt, ctx);
}
