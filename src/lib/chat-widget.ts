import type { ChatMessage } from './chat-policy';
import { readChatResponse } from './chat-stream';

const STORAGE_KEY = 'zvm-docs-chat-v1';
type Renderer = (text: string) => string;

class ZvmChat extends HTMLElement {
  private history: ChatMessage[] = [];
  private controller?: AbortController;
  private renderMarkdown?: Renderer;
  private events = new AbortController();
  private lastQuestion = '';
  private failedNodes: HTMLElement[] = [];

  private get panel() { return this.querySelector<HTMLElement>('.chat-panel')!; }
  private get input() { return this.querySelector<HTMLTextAreaElement>('textarea')!; }
  private get launcher() { return this.querySelector<HTMLButtonElement>('.chat-launcher')!; }
  private get messages() { return this.querySelector<HTMLElement>('.chat-messages')!; }
  private get notice() { return this.querySelector<HTMLElement>('.chat-notice')!; }

  connectedCallback() {
    const { signal } = this.events;
    // Keep chat text and links out of the site's document-level analytics handlers.
    this.addEventListener('click', (event) => event.stopPropagation(), { signal });
    this.addEventListener('copy', (event) => event.stopPropagation(), { signal });
    this.launcher.addEventListener('click', () => this.toggle(!!this.panel.hidden), { signal });
    this.querySelector('.chat-close')!.addEventListener('click', () => this.toggle(false), { signal });
    this.querySelector('form')!.addEventListener('submit', (event) => {
      event.preventDefault();
      void this.send(this.input.value.trim());
    }, { signal });
    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        this.querySelector('form')!.requestSubmit();
      }
    }, { signal });
    this.addEventListener('keydown', (event) => this.handleKeys(event), { signal });
    this.querySelectorAll<HTMLButtonElement>('[data-question]').forEach((button) => {
      button.addEventListener('click', () => void this.send(button.dataset.question!), { signal });
    });
    this.querySelector('.chat-stop')!.addEventListener('click', () => this.controller?.abort(), { signal });
    this.querySelector('.chat-reset')!.addEventListener('click', () => this.reset(), { signal });
    this.querySelector('.chat-retry')!.addEventListener('click', () => {
      this.failedNodes.forEach((node) => node.remove());
      void this.send(this.lastQuestion);
    }, { signal });
    void this.restore();
  }

  disconnectedCallback() { this.controller?.abort(); this.events.abort(); }

  private toggle(open: boolean) {
    this.panel.hidden = !open;
    this.launcher.setAttribute('aria-expanded', String(open));
    if (open) this.input.focus(); else this.launcher.focus();
    this.save();
  }

  private handleKeys(event: KeyboardEvent) {
    if (this.panel.hidden) return;
    if (event.key === 'Escape') { this.toggle(false); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...this.panel.querySelectorAll<HTMLElement>('a, button, textarea, [tabindex="0"]')]
      .filter((element) => element.getClientRects().length && !element.matches(':disabled'));
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  private async loadRenderer() {
    if (this.renderMarkdown) return;
    const [{ marked }, { default: DOMPurify }] = await Promise.all([import('marked'), import('dompurify')]);
    this.renderMarkdown = (text) => DOMPurify.sanitize(marked.parse(text, { async: false }), {
      ALLOWED_TAGS: ['p', 'br', 'pre', 'code', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'h3', 'h4', 'hr'],
      ALLOWED_ATTR: ['href', 'title'],
    });
  }

  private bubble(role: ChatMessage['role'], content: string) {
    const element = document.createElement('div');
    element.className = `chat-message chat-message-${role}`;
    element.setAttribute('aria-label', role === 'user' ? 'You' : 'ZVM assistant');
    if (role === 'assistant' && this.renderMarkdown) this.renderAnswer(element, content);
    else element.textContent = content;
    this.messages.append(element);
    return element;
  }

  private renderAnswer(element: HTMLElement, text: string) {
    element.innerHTML = this.renderMarkdown!(text);
    element.querySelectorAll('a').forEach((link) => {
      try {
        const url = new URL(link.href, window.location.href);
        if (!['http:', 'https:'].includes(url.protocol)) { link.removeAttribute('href'); return; }
        if (url.origin !== window.location.origin) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      } catch { link.removeAttribute('href'); }
    });
  }

  private scrollToEnd() {
    const conversation = this.querySelector('.chat-conversation')!;
    conversation.scrollTop = conversation.scrollHeight;
  }

  private setBusy(busy: boolean) {
    this.querySelector<HTMLButtonElement>('.chat-send')!.hidden = busy;
    this.querySelector<HTMLButtonElement>('.chat-stop')!.hidden = !busy;
    this.querySelector<HTMLButtonElement>('.chat-reset')!.disabled = busy;
    this.input.disabled = busy;
    this.messages.setAttribute('aria-busy', String(busy));
    this.querySelectorAll<HTMLButtonElement>('[data-question]').forEach((button) => button.disabled = busy);
  }

  private async send(question: string) {
    if (!question || question.length > 4000 || this.controller) return;
    const controller = new AbortController();
    this.controller = controller;
    this.lastQuestion = question;
    this.querySelector<HTMLElement>('.chat-welcome')!.hidden = true;
    this.querySelector<HTMLElement>('.chat-recovery')!.hidden = true;
    const user = this.bubble('user', question);
    const answer = this.bubble('assistant', 'Looking through the docs…');
    this.failedNodes = [user, answer];
    this.input.value = '';
    this.notice.textContent = 'Looking through the docs…';
    this.setBusy(true);
    this.scrollToEnd();
    let text = '';
    try {
      await this.loadRenderer();
      // Keep whole exchanges and leave room for the new question within server limits.
      const history = this.history.slice(-10).map((message) => ({ ...message, content: message.content.slice(0, 4000) }));
      while (history.reduce((sum, message) => sum + message.content.length, question.length) > 20_000) history.splice(0, 2);
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: question }] }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Chat is unavailable right now. Please try again.');
      }
      text = await readChatResponse(response, (current) => {
        text = current;
        this.renderAnswer(answer, text);
        this.notice.textContent = 'ZVM is replying…';
        this.scrollToEnd();
      });
      this.history.push({ role: 'user', content: question }, { role: 'assistant', content: text });
      this.history = this.history.slice(-40);
      this.save();
      this.failedNodes = [];
      this.notice.textContent = 'Reply ready.';
      this.messages.setAttribute('aria-live', 'polite');
      // Announce once at completion instead of announcing every token.
      answer.setAttribute('aria-label', `ZVM assistant: ${answer.textContent}`);
    } catch (error) {
      if (!text) answer.textContent = 'Let’s try that again.';
      this.notice.textContent = controller.signal.aborted ? 'Reply stopped.' :
        error instanceof Error ? error.message : 'Couldn’t connect. Please try again.';
      this.querySelector<HTMLElement>('.chat-recovery')!.hidden = false;
    } finally {
      controller.abort();
      this.controller = undefined;
      this.setBusy(false);
      this.messages.setAttribute('aria-live', 'off');
      if (!this.panel.hidden) this.input.focus();
      this.scrollToEnd();
    }
  }

  private save() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: this.history, open: !this.panel.hidden })); }
    catch { /* Private browsing and full storage should not prevent chat. */ }
  }

  private async restore() {
    try {
      const state = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (!state || !Array.isArray(state.messages)) return;
      // Stored content stays untrusted and is rendered through the same sanitizer.
      this.history = state.messages.filter((message: ChatMessage) =>
        ['user', 'assistant'].includes(message?.role) && typeof message?.content === 'string').slice(-40);
      if (this.history.length) {
        await this.loadRenderer();
        this.querySelector<HTMLElement>('.chat-welcome')!.hidden = true;
        for (const message of this.history) this.bubble(message.role, message.content);
      }
      this.panel.hidden = !state.open;
      this.launcher.setAttribute('aria-expanded', String(!!state.open));
      this.scrollToEnd();
    } catch { this.history = []; }
  }

  private reset() {
    this.history = [];
    this.failedNodes = [];
    this.messages.replaceChildren();
    this.notice.textContent = '';
    this.querySelector<HTMLElement>('.chat-welcome')!.hidden = false;
    this.querySelector<HTMLElement>('.chat-recovery')!.hidden = true;
    this.input.value = '';
    this.save();
    this.input.focus();
  }
}

if (!customElements.get('zvm-chat')) customElements.define('zvm-chat', ZvmChat);
