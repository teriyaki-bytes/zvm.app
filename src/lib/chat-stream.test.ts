import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readChatResponse } from './chat-stream.ts';

function response(chunks: Uint8Array[]) {
  return new Response(new ReadableStream({
    start(controller) { chunks.forEach((chunk) => controller.enqueue(chunk)); controller.close(); },
  }));
}
const encode = (value: string) => new TextEncoder().encode(value);

test('UTF-8 text and JSON frames may split across any network chunk', async () => {
  const bytes = encode('{"type":"text","text":"Zig → "}\n{"type":"text","text":"ZVM"}\n{"type":"done"}\n');
  const chunks = [...bytes].map((byte) => new Uint8Array([byte]));
  const received: string[] = [];
  assert.equal(await readChatResponse(response(chunks), (text) => received.push(text)), 'Zig → ZVM');
  assert.deepEqual(received, ['Zig → ', 'Zig → ZVM']);
});

test('incomplete, empty, and provider-error streams never become successful answers', async () => {
  for (const body of [
    '{"type":"text","text":"partial"}\n',
    '{"type":"done"}\n',
    '{"type":"text","text":"partial"}\n{"type":"error","error":"Try again"}\n',
    '{"type":"text","text":42}\n{"type":"done"}\n',
    '{"type":"text","text":"partial"}\n{"type":"done"}',
  ]) await assert.rejects(readChatResponse(response([encode(body)]), () => {}));
});
