<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Surgical Fix Default

For every change to existing MAWD code, use a **minimal, scope-locked patch** by default. This applies unless the requester explicitly asks for a broader refactor, redesign, or architecture change.

1. Before editing, state the exact allowed files and the reason for each. Read only those files and their direct dependencies.
2. Do not edit, reformat, rename, move, or "clean up" code outside the allowed files. Preserve unrelated uncommitted work.
3. Do not add dependencies, alter application architecture, or change shared design-system behavior unless explicitly requested.
4. Stop and ask before proceeding if the fix requires more than 3 files, more than 150 changed lines, or any file outside the stated scope.
5. After editing, run `git diff --name-only`, `git diff --check`, and the smallest relevant test/build command. Report the changed files, diff summary, and verification result.

Default instruction to follow:

```text
/surgical-fix
Make the smallest safe change that resolves the requested issue. Only edit the agreed allowed files. Do not refactor, reformat, redesign, or modify adjacent working code. Stop and report if the fix expands beyond scope.
```
