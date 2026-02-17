# Razomy Js

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.

### 📦 Product

Razomy js is a scalable TypeScript Monorepo.

### 🤝 Contribution Checklist

We follow strict architectural rules to keep the system reliable.

**Structure**
- [ ] **Packages:** Maintained in a single layer.
- [ ] **Granularity:** One technical element per file.
- [ ] **Organization:** One domain per folder.
- [ ] **Ordering:**
  - Abstract → Concrete (e.g., `object/car`).
  - Source → Target (e.g., `png/pdf`).

**Naming**
- [ ] **Atomic:** Names must be atomic concepts.
- [ ] **Extendable:** Names are extended via prefixes, suffixes, and other names (composition).
- [ ] **Pluralization:**
  - Singular for single items.
  - Plural (`s`) **only** for group operations.
- [ ] **Casing:**
  - `PascalCase` for types/classes.
  - `camelCase` for vars/functions.
- [ ] **Consistency:** File name matches instance name, property name, and type.
- [ ] **Prefixes:**
  - Use `try` for nullable returns (e.g., `tryGet`).
  - Use `with` for interface extensions.
  - **No** `I` prefix for Interfaces.
- [ ] **Suffixes:** Use `Mut` for mutable types.
- [ ] **Functions:**
  - Follow pattern: `[action][result?]["By"+ arguments?]` (e.g., `get`, `getString`, `getStringByIndex`).
  - Async: No `Async` suffix by default.
  - Conflict: If Sync and Async exist, use `Sync` suffix for the synchronous version.
- [ ] **Abbreviations:** Preferred over full words (e.g., `js` > `javascript`).

**Logic**
- [ ] **Strictness:**
  - Always throw on error (no silent fails).
  - **No input validation** (code assumes valid input; logic responsibility lies with the caller).
  - **No optional execution** (code must be deterministic).
- [ ] **Imports:**
  - External: `@razomy/...`
  - Domain: `./...`
  - Prefer (e.g., `import * as packageName from '@razomy/package-name`) named syntax.
- [ ] **Exports:** Prefer named exports.

**Feature Workflow**
- [ ] **One change per commit:** Describe the reason and the solution.
- [ ] **Identity:** Sign commits with a proper name and a permanent email address (one you plan to keep for years).
- [ ] **Cleanliness:** One change type or one solid feature per merge request.
