import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { createGateway, streamText } from 'ai';
import { chatInstructions } from '../../lib/chat-docs';
import {
  MODEL_CATALOG_URL, MAX_BODY_BYTES, getFreeChatModels, parseMessages,
} from '../../lib/chat-policy';

export const prerender = false;

const unavailable = 'Chat is taking a break. Please try again shortly, or browse the documentation.';
const jsonError = (message: string, status: number) => Response.json(
  { error: message }, { status, headers: { 'Cache-Control': 'no-store' } },
);

// A bounded per-instance throttle. The $0 key budget remains the account-level spend boundary.
const requests = new Map<string, { count: number; reset: number }>();
function isRateLimited(address: string): boolean {
  const now = Date.now();
  const previous = requests.get(address);
  if (previous && previous.reset > now) return ++previous.count > 10;
  for (const [key, value] of requests) if (value.reset <= now) requests.delete(key);
  if (requests.size >= 2000) return true;
  requests.set(address, { count: 1, reset: now + 60_000 });
  return false;
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Please send a message.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) throw new Error('Please send a shorter conversation.');
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  // Same-origin browser requests only; no CORS access to this public endpoint.
  if (request.headers.get('origin') !== url.origin) return jsonError('Please use chat on this site.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return jsonError('Please send a JSON message.', 415);
  }
  if (isRateLimited(clientAddress)) return jsonError('A few too many messages. Try again in a minute.', 429);

  let messages;
  try { messages = parseMessages(await readBody(request)); }
  catch { return jsonError('Please send a shorter message or start a new conversation.', 400); }

  // Explicit key only: never silently fall back to project OIDC or another credential/budget.
  const apiKey = getSecret('VERCEL_AI_GATEWAY_API_KEY');
  if (!apiKey) return jsonError(unavailable, 503);
  let models: string[];
  try {
    // Recheck on every request; missing, ambiguous, or changed prices disable inference.
    const catalog = await fetch(MODEL_CATALOG_URL, { signal: AbortSignal.timeout(8000), cache: 'no-store' });
    if (!catalog.ok) return jsonError(unavailable, 503);
    models = getFreeChatModels(await catalog.json());
    if (!models.length) return jsonError(unavailable, 503);
  } catch { return jsonError(unavailable, 503); }

  const abort = new AbortController();
  const signal = AbortSignal.any([abort.signal, request.signal, AbortSignal.timeout(55_000)]);
  const gateway = createGateway({ apiKey });
  const result = streamText({
    model: gateway(models[0]),
    system: chatInstructions,
    messages,
    maxOutputTokens: 2400,
    maxRetries: 0,
    abortSignal: signal,
    reasoning: 'low',
    providerOptions: { gateway: { models: models.slice(1) } },
    // Never log prompts, credentials, or raw provider errors from a public conversation.
    onError: () => {},
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) => controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
      try {
        let hasText = false;
        for await (const part of result.stream) {
          if (part.type === 'error' || part.type === 'abort') throw new Error('Generation interrupted');
          if (part.type === 'finish' && part.finishReason !== 'stop') throw new Error('Incomplete response');
          if (part.type === 'text-delta') { hasText = true; send({ type: 'text', text: part.text }); }
        }
        if (!hasText) throw new Error('Empty response');
        send({ type: 'done' });
      } catch {
        if (!abort.signal.aborted) send({ type: 'error', error: unavailable });
      } finally {
        if (!abort.signal.aborted) controller.close();
      }
    },
    cancel() { abort.abort(); },
  });
  return new Response(stream, { headers: {
    'Content-Type': 'application/x-ndjson; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  } });
};
