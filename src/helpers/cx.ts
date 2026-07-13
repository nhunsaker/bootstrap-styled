// Tiny classname joiner used by the helpers to append the exact Bootstrap
// helper class(es) alongside any caller-supplied `className`. Falsy parts are
// dropped so callers can pass conditional classes inline.
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
