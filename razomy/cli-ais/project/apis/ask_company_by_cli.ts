import {type ActorContext, directorCompany} from '../../../ai-agent-project/actors/director_company';

export async function askCompanyByCli(challengePrompt: string, cliContext: { dirPath: string }) {
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
