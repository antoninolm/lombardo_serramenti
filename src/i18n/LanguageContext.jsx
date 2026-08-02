import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext, STORAGE_KEY, SUPPORTED_LANGS, translate } from './languageContext'

function readInitialLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LANGS.includes(stored)) return stored
  } catch {
    // localStorage non disponibile: si resta sullo stato in memoria.
  }
  return 'it'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next)) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage non disponibile: la scelta resta solo in memoria.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
