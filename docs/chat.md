# Documentation assistant

The floating **Ask ZVM** widget is available on documentation, blog, and home
pages. It streams answers from Vercel AI Gateway. The current guides and
command references are bundled into the server prompt at build time, with
their canonical documentation paths. No embeddings or external search service
are required. Zig language answers use the model's knowledge, so the assistant
asks about the user's version when APIs differ.

## Local development

Use Node.js 24 and the package manager declared in `package.json`:

```sh
pnpm install
cp .env.example .env
# Set VERCEL_AI_GATEWAY_API_KEY in .env; never use a PUBLIC_ prefix.
pnpm dev
pnpm test
pnpm build
```

Keep the existing `.env` if it already contains your key. The production build
also fetches the site's installation scripts from GitHub, so it needs network
access.

## Vercel

Deploy to the `zvm.app` project in the `teriyaki` team. `vercel.json` selects
Astro even if the project previously used another framework. The Vercel
adapter generates the `/api/chat` Function with a 60-second limit; all
documentation pages remain prerendered. Set `VERCEL_AI_GATEWAY_API_KEY` as a
Sensitive environment variable for Production and Preview before deploying.
A local `.env` does not automatically configure Vercel's environment.

The key is read at request time with `getSecret()` from `astro:env/server`.
The key is never passed to the model, returned by the endpoint, or bundled
into browser assets. Do not fall back to project OIDC: the supplied key's
$0 budget is the intended spend boundary.

## Free models and availability

`src/lib/chat-policy.ts` defines the reviewed free-model preference list:

1. `reflection/beam-free`
2. `nvidia/nemotron-3.5-lightning-free`

Every request checks the live Gateway catalog. Only listed language models
with explicit zero input/output prices, no variable provider pricing, and no
other nonzero price fields are eligible. Removed, retired, paid, or ambiguous
entries are skipped. Gateway receives only eligible models as fallbacks.
No paid model is selected when a free model fails. Catalog failures and a
lack of eligible models disable inference and offer the user documentation
links. An interrupted reply can be retried and is excluded from future
conversation context.

Free availability is promotional, not guaranteed. A reviewed model list
reduces dependence on one provider, but if every listed model disappears, add
and test a new free model from the live catalog, then redeploy. Never add an
unrestricted model auto-router. The server's catalog check and the key budget
are separate controls; keep the key's hard limit at $0 to guard against a
price change between the check and inference. Free inference does not waive
Vercel hosting/Function usage limits.

## Security and data handling

- The endpoint accepts same-origin JSON requests, with a 32 KiB body limit,
  at most 12 alternating user/assistant messages, and 4,000 characters per
  message. Client-provided system prompts, models, keys, and tools are ignored.
- Replies are Markdown sanitized with DOMPurify; raw scripts, images, event
  handlers, and unsafe URL schemes are removed. External HTTP links receive
  `noopener noreferrer`.
- A bounded in-memory throttle allows ten requests per IP per minute **per
  Function instance**. This is not a distributed abuse limit. Origin checking
  prevents browser cross-site use; scripts can forge it. Use Vercel Firewall
  rules if traffic requires a shared abuse limit.
- There is no shell execution, filesystem browsing, or arbitrary URL-fetching
  tool available to the model. Topic restrictions are model instructions and
  are not a guarantee that every off-topic prompt will be refused.
- Request/response caching is disabled. Application code does not log chat
  text or raw provider errors. Completed conversations live in browser
  `sessionStorage` for navigation within the tab; **New chat** clears them.
  The widget is excluded from site click/copy analytics and masked for replay.
- Messages are sent to Vercel and its model provider. The selected free
  endpoints do not promise zero retention or no training. The widget tells
  users not to submit secrets.

## Verification

`pnpm test` covers catalog price changes, model removal/fallback selection,
message validation, documentation source paths, and existing link previews.
Also verify a live conversation after deployment: installation, switching
without changing the default, an unrelated question, and a follow-up. A local
dev check does not prove production secret configuration or routing.
