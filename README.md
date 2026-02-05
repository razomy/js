#### Contribution Checklist
**Structure**
- [ ] **Packages:** Maintained in a single layer.
- [ ] **Granularity:** One element per file.
- [ ] **Organization:** One domain per folder.
- [ ] **Ordering:** 
- Abstract → Concrete (`object/car`)
- Source → Target (`png/pdf`).

**Naming**
- [ ] **Atomic:**
- Names are atomic.
- Names extendable with prefixes, suffixes and other names
- [ ] **Pluralization:** 
- Singular for single items; 
- Plural (`s`) for group operations.
- [ ] **Casing:** 
- `PascalCase` for types/classes;
- `camelCase` for vars/functions.
- [ ] **Consistency:** File name matches instance name, property name and type.
- [ ] **Prefixes:**
    - [ ] Use `try` for nullable returns.
    - [ ] Use `with` for interface extensions.
    - [ ] No `I` prefix for Interfaces.
- [ ] **Suffixes:** Use `Mut` for mutable types.
- [ ] **Functions:** Follow pattern `[arguments?][action][result?]` (e.g.,`get`, `fileUrlGet`, `getString`).
- [ ] **Abbreviations:** Preferred over full words (e.g., `js` > `javascript`).

**Logic**
- [ ] **Strictness:** 
- Always throw on error;
- no input validation;
- no optional execution.
- [ ] **Imports:**
    - [ ] External: `@razomy/...`
    - [ ] Domain: `./...`
    - [ ] Prefer `imports * as packageName from '@razomy/package.name`.
- [ ] **Exports:** Prefer named exports.
