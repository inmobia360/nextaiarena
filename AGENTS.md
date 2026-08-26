# NextAI Arena — working agreement

Read these files before making product or architecture changes:

- `CONTEXTO_TECNICO_ESTRATEGICO_AI_TOOLS_ARENA.md`
- `Buenas_Practicas_y_Decisiones_Estrategicas.md`
- `.codex/skills/nextai-arena-orchestrator/SKILL.md`

## Product invariants

- Spain is the validation market; the product is international by design.
- Support B2B, B2C, and professional users through a shared core.
- Use the five confirmed MVP categories; use tags for narrower sectors and use cases.
- Organic ranking is separate from sponsored inventory.
- Preserve the official brand assets and their light/dark transparent variants.

## Development commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

Never commit `.env` files, credentials, API keys, or generated secrets.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
