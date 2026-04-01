import * as fss from '@razomy/fss';
import * as stringCase from '@razomy/string-case';
import * as abstracts from "@razomy/abstracts";
import {functionToString, docTypeToString, type FlatDeclaration} from "../ts-translators/ast/string";
import {collectDeclarations} from "../ts-translators/ast/string";

export function createReadme(path: string, packageJson: any, packageDeclaration: abstracts.translators.PackageBinding) {
  const scopeName = stringCase.camelCase(packageDeclaration.identifier.name.replace('@razomy/', ''));

  const allDecls = collectDeclarations(packageDeclaration.body, []);
  allDecls.sort((a, b) => a.path.join('.').localeCompare(b.path.join('.')));

  const description = fss.file.tryGetSync(path + '/description.rn')?.replaceAll('md {', '') || null;

  const vision = `
## 🕊️ Vision

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.
  `.trim();

  const report = `
## 🐛 Reporting Issues

We use GitHub Issues as the official bug tracker for this project.

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
`.trim();
  const s = 'https://img.shields.io/';
  const title = `
# ${packageJson.name}

[![TypeScript](${s}npm/types/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
[![Node.js Version](${s}node/v/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
![Deno](${s}badge/Deno-Supported-blue)
![Bun](${s}badge/Bun-Supported-black)
![Cloudflare Workers](${s}badge/Cloudflare_Workers-Supported-orange)
[![License](${s}npm/l/${packageJson.name})](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](${s}npm/v/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
[![minzipped size](${s}bundlephobia/minzip/${packageJson.name})](https://bundlephobia.com/package/${packageJson.name})
[![GitHub stars](${s}github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](${s}npm/dw/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})

[Npm](https://www.npmjs.com/package/${packageJson.name}) |
[Npmx](https://npmx.dev/package/${packageJson.name}) |
[GitHub](https://github.com/razomy/js/tree/main/${packageJson.repository.directory}) |
[Razomy Io](https://io.razomy.org${packageJson.repository.directory.replace('-', '/').replace('razomy', '')}) |
[Razomy Cli](https://github.com/razomy/cli)

> ${packageJson.description}
`.trim();

  const donate = `
## 💖 Fuel Our Shared Future

We can't build this without you.
If this library has saved you time or helped turn chaos into clarity in your own projects,
 please consider backing the developers behind it. 
 Building reliable, open-source tools takes immense time and energy.
Your sponsorship isn't just a donation; 
it’s the fuel that keeps this project actively maintained, bug-free, and thriving for everyone who relies on it.

Help us keep the momentum going. Choose how you want to light the way:

- [✨ Spark of Creativity](https://donate.stripe.com/28EbJ07jlbQR83sc2d0Jq08)
- [🌟 Flame of Innovation (Recommended)](https://donate.stripe.com/3cI6oGbzB1cddnMc2d0Jq06)
- [🔥 Torch of Progress](https://donate.stripe.com/28EcN48np9IJ6Zo9U50Jq09)
- [🚀 Beacon of Excellence](https://donate.stripe.com/6oU9AS0UX8EFerQc2d0Jq07)
`.trim();

  const install = `
### Install

\`\`\`sh
npm i ${packageJson.name}
# or
bun add ${packageJson.name}
# or
razomy cli add ${packageJson.name}
\`\`\`
`.trim();

  const typeSpecs = allDecls.filter(i => i.node.kind !== 'FunctionBinding');
  const functionSpecs = allDecls.filter(i => i.node.kind === 'FunctionBinding') as FlatDeclaration<abstracts.translators.FunctionBinding>[];
  const functionPath = allDecls.length > 0 ? allDecls[0].path : ['functionName'];

  const imports = `
### Import

\`\`\`ts
import * as ${scopeName} from '${packageJson.name}';
// or
import * as ${scopeName} from "npm:${packageJson.name}";
// or
import * as ${scopeName} from "https://esm.sh/${packageJson.name}";
// or
import * as ${scopeName} from "https://unpkg.com/${packageJson.name}";
// or
import { ${functionPath[0]} } from '${packageJson.name}';
// or
razomy run ${packageJson.name} ${functionPath.join(' ')}
\`\`\`

  `.trim();

  const typesToc = typeSpecs.map((s) => `- [${s.path.join('.')}](#${s.name.toLowerCase()})`).join('\n');
  const functionsToc = functionSpecs.map((s) => `- [${s.path.join('.')}](#${s.name.toLowerCase()})`).join('\n');
  const toc = `
## 📑 Table of Contents

${typesToc.length ? '**Types**\n\n' + typesToc + '\n\n' : ''}${functionsToc.length ? '**Functions**\n\n' + functionsToc : ''}
  `.trim();

  const functions = functionSpecs
    .map(functionToString)
    .join('\n\n')
    .trim();

  const types = typeSpecs
    .map(docTypeToString)
    .join('\n\n')
    .trim();

  const examples = `
## 📚 Documentation

${types.length ? '### Types\n\n' + types + '\n\n' : ''}${functions.length ? '### Functions\n\n' + functions : ''}
`.trim();

  const licenseAndContributing = `
## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/razomy/js/issues).

## 📝 License

Copyright © ${new Date().getFullYear()} [Razomy](https://github.com/razomy).
This project is [MIT](https://github.com/razomy/js/blob/main/LICENSE) licensed.
`.trim();

  const readme = `
${title}${description ? '\n' + description : ''}

## 🚀 Start

${install}

${imports}

${toc}

${examples}

${vision}

${donate}

${licenseAndContributing}

${report}
`.trim() + '\n';
  fss.file.setSync(`${path}/README.md`, readme);
  fss.file.setSync(`${path}/dist/README.md`, readme);
}
