/**
 * Configuração do Vue I18n para internacionalização
 * 
 * Este módulo configura o sistema de tradução do portfólio,
 * detectando automaticamente o idioma do navegador e carregando
 * as traduções apropriadas.
 * 
 * Idiomas suportados:
 * - pt-BR: Português (Brasil) - padrão
 * - en-US: Inglês (Estados Unidos)
 * - es-ES: Espanhol (Espanha)
 */

import { createI18n } from 'vue-i18n'
import pt from './locales/pt-BR.json'
import en from './locales/en-US.json'
import es from './locales/es-ES.json'

/**
 * Detecta o idioma preferido do navegador do usuário
 * 
 * Prioriza:
 * 1. Idioma salvo no localStorage (preferência do usuário)
 * 2. Idioma do navegador (navigator.language)
 * 3. Português (pt-BR) como fallback
 * 
 * @returns {string} Código do idioma (pt-BR, en-US ou es-ES)
 */
function getBrowserLocale() {
  // Verifica se há idioma salvo pelo usuário
  const savedLocale = localStorage.getItem('preferred-language')
  if (savedLocale) {
    return savedLocale
  }

  // Detecta idioma do navegador
  const navigatorLocale = navigator.languages !== undefined
    ? navigator.languages[0]
    : navigator.language

  if (!navigatorLocale) {
    return 'pt-BR'
  }

  // Extrai apenas o código do idioma (pt, en, es)
  const locale = navigatorLocale.trim().split(/-|_/)[0]
  
  // Mapeia para os idiomas disponíveis no sistema
  const localeMap = {
    'pt': 'pt-BR',
    'en': 'en-US',
    'es': 'es-ES'
  }

  return localeMap[locale] || 'pt-BR'
}

/**
 * Instância do Vue I18n configurada
 * 
 * Configurações:
 * - legacy: false -> usa Composition API
 * - locale: idioma detectado automaticamente
 * - fallbackLocale: pt-BR como padrão
 * - messages: todas as traduções carregadas
 */
const i18n = createI18n({
  legacy: false, // Usa Composition API (useI18n)
  locale: getBrowserLocale(), // Idioma inicial detectado
  fallbackLocale: 'pt-BR', // Idioma de fallback
  messages: {
    'pt-BR': pt,
    'en-US': en,
    'es-ES': es
  }
})

export default i18n
