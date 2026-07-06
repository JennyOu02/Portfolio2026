export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix site-relative asset paths (starting with "/") with the GitHub Pages base path. */
export function withBase(src: string): string {
  if (!src) return src;
  return src.startsWith('/') ? `${BASE_PATH}${src}` : src;
}
