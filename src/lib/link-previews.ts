export interface PagePreview {
  title: string;
  description: string;
  image?: { src: string; alt: string };
}

export type PreviewIndex = Record<string, PagePreview>;

export function normalizePagePath(pathname: string): string {
  const path = new URL(pathname, 'https://www.zvm.app').pathname;
  return `${path.replace(/\/index\.html$/, "/").replace(/\/+$/, "")}/`;
}

/** Only known pages on this origin or ZVM's two public hostnames qualify. */
export function resolvePagePreview(
  href: string,
  currentUrl: string,
  pages: PreviewIndex,
): PagePreview | undefined {
  if (!URL.canParse(currentUrl) || !URL.canParse(href, currentUrl)) return;
  const current = new URL(currentUrl);
  const target = new URL(href, current);
  if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password) return;

  const publicSite = !target.port && ['zvm.app', 'www.zvm.app'].includes(target.hostname);
  if (target.origin !== current.origin && !publicSite) return;

  const path = normalizePagePath(target.pathname);
  if (path === normalizePagePath(current.pathname)) return;
  if (Object.hasOwn(pages, path)) return pages[path];
}
