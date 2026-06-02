import type { DeepPartial, Theme } from './types'
import { defaultTheme } from './defaultTheme'

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>
  for (const key of Object.keys(override)) {
    const o = (override as Record<string, unknown>)[key]
    const b = (base as Record<string, unknown>)[key]
    out[key] = isObject(o) && isObject(b) ? deepMerge(b, o as DeepPartial<typeof b>) : o
  }
  return out as T
}

/** Build a full Theme from partial overrides on top of the Bootstrap defaults. */
export function createTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return deepMerge(defaultTheme, overrides)
}
