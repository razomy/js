import { camelCase } from '@razomy/string-case';
import * as fss from '@razomy/fss';
import type { FunctionSpecification } from './get_package_functions';

// ADDED: targetDir parameter so it doesn't hardcode to 'string-case'
export function createPackageReadme(packageJson: any, specs: FunctionSpecification[], targetDir: string) {
  const scopeName = camelCase(packageJson.name.replace('@razomy/', ''));

  // Sort specs alphabetically once to use in both TOC and Docs
  const sortedSpecs = [...specs].sort((a, b) => a.name.localeCompare(b.name));

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
* A brief description of the issue.
* Steps to reproduce the bug.
* Your current environment (Node version, OS, etc.).
  `.trim();

  const title = `
# ${packageJson.name}

[![License](https://img.shields.io/npm/l/${packageJson.name})](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/${packageJson.name})](https://bundlephobia.com/package/${packageJson.name})
[![TypeScript](https://img.shields.io/npm/types/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
[![Node.js Version](https://img.shields.io/node/v/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
[![npm version](https://img.shields.io/npm/v/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
[![npm downloads](https://img.shields.io/npm/dw/${packageJson.name})](https://www.npmjs.com/package/${packageJson.name})
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/${packageJson.name}) | 
[Npmx](https://npmx.dev/package/${packageJson.name}) | 
[GitHub](https://github.com/razomy/js/tree/main/${packageJson.repository.directory}) | 
[Io](https://io.razomy.org${packageJson.repository.directory.replace('-', '/').replace('razomy', '')})

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
* [✨ Spark of Creativity](https://donate.stripe.com/28EbJ07jlbQR83sc2d0Jq08)
* [🌟 Flame of Innovation (Recommended)](https://donate.stripe.com/3cI6oGbzB1cddnMc2d0Jq06)
* [🔥 Torch of Progress](https://donate.stripe.com/28EcN48np9IJ6Zo9U50Jq09)
* [🚀 Beacon of Excellence](https://donate.stripe.com/6oU9AS0UX8EFerQc2d0Jq07)
`.trim();

  const install = `
### Install
\`\`\`sh
npm i ${packageJson.name}
\`\`\`
`.trim();

  // FIXED: Prevents crash if specs array is empty
  const sampleImport = sortedSpecs.length > 0 ? sortedSpecs[0].name : 'functionName';
  const imports = `
### Import
\`\`\`ts
import * as ${scopeName} from "${packageJson.name}";
// or
import { ${sampleImport} } from "${packageJson.name}";
\`\`\`
  `.trim();

  // ADDED: Table of contents
  const toc = `
## 📑 Table of Contents
**Functions**
${sortedSpecs.map((s) => `- [${s.name}](#${s.name.toLowerCase()})`).join('\n')}
  `.trim();

  // IMPROVED: Markdown formatting for functions (Using ### for function names makes them linkable by the TOC)
  const examples = `
## 📚 Documentation
### Functions
${sortedSpecs
    .map(
      (s) => `
#### ${s.name}

\`${s.name}(${s.parameters.map((i) => `${i.name}: ${i.type}`).join(', ')}): ${s.returns.type}\`

${s.title ? `${s.title}\n` : ''}
${s.description}

Examples
${s.examples
        .map((e) =>
          `
\`\`\`ts
${e.code} // ${e.expected}
\`\`\`
`.trim(),
        )
        .join('\n\n')}
`,
    )
    .join('\n\n') // Added a horizontal rule between functions for better readability
    .trim()}
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
${title}

## 🚀 Start
${install}

${imports}

${toc}

${examples}

${vision}

${donate}

${licenseAndContributing}

${report}
`.trim();
  fss.file.set('../string-case/README.md', readme);
  fss.file.set('../string-case/dist/README.md', readme);
}
