import {predictSu} from "../ai/wrappers";
import {TOOLS} from "../tools";


async function analyseUserRequest(ctx, req, tools: typeof TOOLS) {
  return await predictSu(`
Act as you are a computer.
Be military punctual.
You receive human text instruction.
Rephase it in formal structure way so the following agents will do.
Result is a list of steps where each step concrete action for one action.
Example
user:
Replace all world cat in all files
context:
{}
tools:
setContext // set data for context
getAllFiles // iterate each file in directory
getFile // read file
setFile // set file
you:
\`\`\`xml
<tasks>
 <task tools="[setContext]">
     create context counter with default value example {count: 0}
     <action tools="[getAllFiles]">
         iterate files
         <action tools="[getFile]"></<action tools="[getFile]">>
            
           <action tools="[setContext]">
           set increment words into context
           </action>
         </action>
     </action>
 </task>
</tasks>
\`\`\`
`,
    `
${req}
context:
${JSON.stringify(ctx, null, 2)}
tools:
${tools.map(i=>`${i.spec.identifier.name} //${i.spec.meta.description}`)}
`
  );
}


export async function start(dirPath: string, challengePrompt: string) {
  const ctx = {project: {dirPath}}
  const plan = await analyseUserRequest(ctx,challengePrompt, TOOLS);
  console.log(tasks);
}

