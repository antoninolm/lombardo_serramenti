import { createContext } from 'react'
import { dictionaries } from './dictionaries'

export const STORAGE_KEY = 'lombardo-lang'
export const SUPPORTED_LANGS = ['it', 'scn']

function getPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), obj)
}

function interpolate(value, vars) {
  if (typeof value !== 'string' || !vars) return value
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => vars[name] ?? '')
}

export function translate(lang, key, vars) {
  const primary = getPath(dictionaries[lang], key)
  if (primary !== undefined) return interpolate(primary, vars)

  const fallback = getPath(dictionaries.it, key)
  if (fallback !== undefined) return interpolate(fallback, vars)

  return key
}

export const LanguageContext = createContext({
  lang: 'it',
  setLang: () => {},
  t: (key, vars) => translate('it', key, vars),
})
