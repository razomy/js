import * as aiAgentProject from '@razomy/ai-agent-project';

export async function askCompanyByCli(challengePrompt: string, cliContext: { dirPath: string }) {
  const ctx: aiAgentProject.actors.ActorContext = {
    tool: {
      project: { dirPath: cliContext.dirPath },
      getDirFiles: [],
      getFile: {},
      setFile: {},
    },
    llm: {
      messages: [],
      tools: [],
    },
  };
  await aiAgentProject.actors.directorCompany(challengePrompt, ctx);
}
