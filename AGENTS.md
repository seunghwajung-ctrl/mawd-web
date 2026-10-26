<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Baseline Version (read first)

The approved baseline is tag `v0.6-startup-challenge-baseline` (commit `a5d448b`), restored from Vercel production deployment `dpl_E4GvCnVtVCufJ5ijeRM33AnqzhwL` (2026-10-14 21:54 KST). It has the MAWD START-UP CHALLENGE card first, with its image at `public/programs/mawd-startup-challenge.jpg`.

1. Start every task from the latest `origin/main` (`git fetch origin && git checkout main && git pull --ff-only`). It must contain `v0.6-startup-challenge-baseline` (`git merge-base --is-ancestor v0.6-startup-challenge-baseline HEAD`). If not, stop and ask.
2. Never reset, revert, or "restore" `main` to an older commit or tag (including `541ae87`, `763a2c6`, `v0.1`–`v0.5`) unless the owner explicitly asks for that exact target.
3. Deploy only by pushing committed work to `main`; Vercel builds production from it. Never run `vercel deploy`/`vercel --prod` from a local working tree: that ships uncommitted files that then exist nowhere in git, which is how this baseline was nearly lost.
4. Commit every asset the site references (images in `public/`, data in `data/`) in the same commit as the code that uses it.

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
