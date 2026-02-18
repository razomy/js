# Contributing to Razomy js

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Razomy js. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [How to Contribute](#how-to-contribute)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Development Workflow](#development-workflow)
  - [Testing and Linting](#testing-and-linting)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## I Have a Question

If you have questions about the usage of the library or the codebase, please check the [Issues](LINK_TO_ISSUES) page to see if someone has already asked. If not, feel free to open a new Issue labeled `question`.

## How to Contribute

### Prerequisites

You will need the following tools installed on your machine:
- [Node.js](https://nodejs.org/) (Version [18.0.0] or higher)
- [npm/yarn/pnpm]

### Environment Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/razomy/js.git
   cd js
   ```
3. **Install dependencies**:
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

### Development Workflow

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. **TypeScript Compilation**:
   Since this is a TypeScript project, you can run the compiler in watch mode while you work:
   ```bash
   npm run dev
   ```
   *Make sure you do not have any TypeScript errors before committing.*

### Testing and Linting

We use **ESLint** for linting and **[Jest/Mocha/Vitest]** for testing.

- ~~**Run Linter**: Ensure your code follows our style guide.~~
  ```bash
  npm run lint
  ```
- **Run Tests**: Ensure all tests pass.
  ```bash
  npm test
  ```
- ~~**Type Check**: Ensure there are no type errors.~~
  ```bash
  npm run typecheck
  # or tsc --noEmit
  ```

## Pull Request Process

1. Ensure that ~~`npm run lint`~~, ~~`npm run typecheck`~~, and `npm test` all pass.
2. Update the `README.md` with details of changes to the interface, if applicable.
3. Open a Pull Request against the `main` branch.
4. The PR title should follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `fix: resolve timeout issue` or `feat: add user logging`).

## Style Guide

- ~~We use **Prettier** for code formatting. Please run `npm run format` before committing.~~
- Do not use `any` types unless absolutely necessary.
- Prefer `interface` over `type` for public API definitions.

### 🤝 Contribution Checklist

We follow systematic architectural rules to keep the system reliable.

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
    - Plural (`s`) **only** for group operations or grouping.
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
    - **No input validation** (code assumes valid input; logic responsibility lies with the caller). Use `@razomy/schema` for data validation.
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