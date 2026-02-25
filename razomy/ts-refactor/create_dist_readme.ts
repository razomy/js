import { camelCase } from '@razomy/string-case';
import * as fss from '@razomy/fss';
import type { FunctionSpecification } from './get_package_functions';

export function createDistReadme(packageJson, specs: FunctionSpecification[]) {
  // ![npm bundle size](https://img.shields.io/bundlephobia/min/${packageJson.name})
  // ![github](https://img.shields.io/github/${packageJson.name})

  const vision = `
### 🕊️Vision

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.
  `.trim();

  const title = `
  # ${packageJson.name}
![npm version](https://img.shields.io/npm/v/${packageJson.name})
![License](https://img.shields.io/npm/l/${packageJson.name})

${packageJson.description}

`.trim();

  const donate = `
### 💖Support Us

If you find this library helpful, please consider supporting the Razomy JS team!

`.trim();

  const install = `
### Install
\`\`\`sh
npm i ${packageJson.name}
\`\`\`
`.trim();
  const imports = `
### Import
\`\`\`ts
import {${specs[0].name}} from "${packageJson.name}";
// or
import * as ${camelCase(packageJson.name.replace('@razomy/', ''))} from "${packageJson.name}";
\`\`\`
  `.trim();

  const examples = `
## 📚 Documentation
${specs
  .sort((a, b) => {
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();
    if (aLower < bLower) {
      return -1;
    }
    if (aLower > bLower) {
      return 1;
    }
    return 0;
  })
  .map(
    (s) => `
### ${s.name}(${s.parameters.map((i) => i.name).join(', ')})
${s.description}
###### Examples
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
  .join('\n')
  .trim()}
`.trim();

  const readme = `
${title}

## 🚀 Start
${install}

${imports}

${examples}

${vision}

${donate}
`.trim();
  fss.file.set('../string-case/dist/README.md', readme);
}
