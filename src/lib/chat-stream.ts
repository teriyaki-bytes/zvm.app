/** Decode framed text, and never accept a truncated stream as a completed reply. */
export async function readChatResponse(response: Response, onText: (text: string) => void): Promise<string> {
  if (!response.body) throw new Error('No response received. Please try again.');
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let pending = '', text = '', complete = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      pending += value;
      const lines = pending.split('\n');
      pending = lines.pop()!;
      for (const line of lines.filter(Boolean)) {
        const event = JSON.parse(line);
        if (event.type === 'error') throw new Error(event.error);
        if (event.type === 'done') complete = true;
        if (event.type !== 'text') continue;
        if (typeof event.text !== 'string') throw new Error('Invalid reply. Please try again.');
        text += event.text;
        onText(text);
      }
    }
    if (!complete || pending || !text.trim()) throw new Error('The reply was interrupted. Please try again.');
    return text;
  } finally { await reader.cancel(); }
}
