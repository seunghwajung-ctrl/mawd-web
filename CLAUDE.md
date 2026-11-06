@AGENTS.md

## Team sessions (다비 · 다빈 · 다봉)

Each role runs as its own Claude Code session. They do not share conversation context; share decisions through files in `docs/` or with `SendMessage`.

| Role | Owns |
|---|---|
| 다비 (dabi) | Developer: code in this repo |
| 다빈 (dabin) | PM: specs, priorities, decisions |
| 다봉 (dabong) | Marketer: content, copy, outreach |

Session names change whenever a session restarts. Last confirmed mapping (2026-11-07, tmux window `team`): 다비 = `mawd-web-e7`, 다빈 = `mawd-work-80` (pane %2), 다봉 = `mawd-work-a5` (pane %1).

Before messaging a teammate, run `ListAgents`. If the names differ from the mapping above, ask each session for its role and update this section. When you send a request, include your own session name so the teammate can reply.
