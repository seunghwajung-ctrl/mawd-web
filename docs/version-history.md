# MAWD Web Version History

Use this file with GitHub tags to find important website milestones quickly.

## Current Version Map

| Version | Git tag | Commit | What to use it for |
|---|---|---|---|
| v0.5 | `v0.5-cardnews-application-flow` | `9a14cc1` | Current production version with updated application flow and cardnews |
| v0.4 | `v0.4-production-flow` | `d1c944e` | Production application-flow baseline after final PRD was added |
| v0.3 | `v0.3-final-landing` | `dc89f1c` | Finalized landing page with Google Form integration and sponsor/contact refinements |
| v0.2 | `v0.2-pixel-redesign` | `eac89f9` | Pixel-art redesign with circuit background and UX enhancements |
| v0.1 | `v0.1-nextjs-migration` | `aec5c8f` | First migrated Next.js version from the original static marketing site |

## GitHub Links

- Tags: <https://github.com/seunghwajung-ctrl/mawd-web/tags>
- Releases: <https://github.com/seunghwajung-ctrl/mawd-web/releases>
- Commit history: <https://github.com/seunghwajung-ctrl/mawd-web/commits/main>

## Naming Rule

Use annotated git tags for version checkpoints:

```bash
git tag -a v0.6-short-description -m "v0.6: Short description"
git push origin v0.6-short-description
```

Use a new tag when a version is useful to revisit later, such as:

- a major copy/design direction change
- a production deployment
- a cardnews or poster asset update
- a form/application-flow change

Small fixes can stay as normal commits unless they mark a meaningful public version.
