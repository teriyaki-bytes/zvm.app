import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizePagePath, resolvePagePreview } from './link-previews.ts';

const current = 'https://www.zvm.app/blog/whats-new-in-zvm-9-4/';
const page = { title: 'Settings', description: 'Configure ZVM.' };
const pages = { '/reference/configuring-settings/': page, '/': { title: 'Home', description: 'ZVM' } };

test('relative, absolute, www, and apex links resolve to a known page', () => {
  for (const href of [
    '/reference/configuring-settings/',
    '/reference/configuring-settings',
    '../../reference/configuring-settings/?source=blog#available-settings',
    'https://zvm.app/reference/configuring-settings/',
    'https://www.zvm.app/reference/configuring-settings/',
    '/reference/configuring-settings/index.html',
  ]) assert.equal(resolvePagePreview(href, current, pages), page, href);
});

test('production links also resolve during local development', () => {
  const local = 'http://localhost:4321/blog/whats-new-in-zvm-9-4/';
  assert.equal(resolvePagePreview('https://zvm.app/reference/configuring-settings/', local, pages), page);
  assert.equal(resolvePagePreview('/reference/configuring-settings/', local, pages), page);
});

test('external links, downloads, missing pages, and special schemes have no preview', () => {
  for (const href of [
    'https://example.com/reference/configuring-settings/',
    'https://zvm.app.example.com/reference/configuring-settings/',
    'https://zvm.app:1234/reference/configuring-settings/',
    'https://user:password@zvm.app/reference/configuring-settings/',
    '/reference/does-not-exist/', '/install.sh', '/images/chart.svg',
    'mailto:hello@zvm.app', 'javascript:alert(1)', 'data:text/html,test',
    'https://[invalid', '/%ZZ', '/constructor', '/__proto__',
  ]) assert.equal(resolvePagePreview(href, current, pages), undefined, href);
});

test('same-page links and fragments keep ordinary anchor behavior', () => {
  const here = 'https://www.zvm.app/reference/configuring-settings/';
  for (const href of ['#settings', '?source=blog#settings', here, 'https://zvm.app/reference/configuring-settings/']) {
    assert.equal(resolvePagePreview(href, here, pages), undefined, href);
  }
});

test('homepage, trailing slashes, and encoded paths normalize consistently', () => {
  assert.equal(normalizePagePath('/'), '/');
  assert.equal(normalizePagePath('/index.html'), '/');
  assert.equal(normalizePagePath('/reference/café/'), '/reference/caf%C3%A9/');
  assert.equal(normalizePagePath('/reference/caf%C3%A9/'), '/reference/caf%C3%A9/');
  assert.equal(resolvePagePreview('/', current, pages), pages['/']);
});
