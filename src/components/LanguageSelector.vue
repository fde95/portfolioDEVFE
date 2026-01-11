<!--
  Componente de Seleção de Idioma
  
  Permite ao usuário alternar entre os idiomas disponíveis:
  - Português (Brasil)
  - English (United States)
  - Español (España)
  
  Features:
  - Detecção automática do idioma do navegador
  - Persistência da escolha no localStorage
  - Visual com bandeiras e códigos de idioma
  - Indicador visual do idioma ativo
-->

<script setup>
import { useI18n } from 'vue-i18n'

// Hook do vue-i18n para controlar o idioma
const { locale, availableLocales } = useI18n()

/**
 * Configuração dos idiomas disponíveis
 * Cada idioma possui nome abreviado e bandeira emoji
 */
const languages = {
  'pt-BR': { name: 'PT', flag: '🇧🇷', fullName: 'Português' },
  'en-US': { name: 'EN', flag: '🇺🇸', fullName: 'English' },
  'es-ES': { name: 'ES', flag: '🇪🇸', fullName: 'Español' }
}

/**
 * Altera o idioma da aplicação
 * Salva a preferência no localStorage para persistência
 * 
 * @param {string} lang - Código do idioma (pt-BR, en-US, es-ES)
 */
function changeLanguage(lang) {
  locale.value = lang
  localStorage.setItem('preferred-language', lang)
  
  // Opcional: atualizar lang do HTML para acessibilidade
  document.documentElement.setAttribute('lang', lang.split('-')[0])
}
</script>

<template>
  <div class="lang-selector">
    <button
      v-for="lang in availableLocales"
      :key="lang"
      @click="changeLanguage(lang)"
      :class="['lang-btn', { 'is-active': locale === lang }]"
      :aria-label="`Mudar idioma para ${languages[lang].fullName}`"
      :title="languages[lang].fullName"
    >
      <span class="lang-flag">{{ languages[lang].flag }}</span>
      <span class="lang-name">{{ languages[lang].name }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.lang-selector {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid hsl(var(--matrix-green) / 0.3);
  border-radius: var(--radius);
  background: transparent;
  color: hsl(var(--matrix-white) / 0.7);
  font: 400 0.85rem/1 'Fira Code', monospace;
  cursor: pointer;
  transition: all 0.25s ease;

  /* Hover: destaque verde */
  &:hover {
    border-color: hsl(var(--matrix-green));
    color: hsl(var(--matrix-green));
    box-shadow: 0 0 10px hsl(var(--matrix-green) / 0.3);
  }

  /* Estado ativo: idioma selecionado */
  &.is-active {
    border-color: hsl(var(--matrix-green));
    background: hsl(var(--matrix-green) / 0.1);
    color: hsl(var(--matrix-green));
    box-shadow: 0 0 15px hsl(var(--matrix-green) / 0.2);
  }
}

.lang-flag {
  font-size: 1.1rem;
  line-height: 1;
}

.lang-name {
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Responsividade: ocultar texto em telas pequenas */
@media (max-width: 480px) {
  .lang-name {
    display: none;
  }
  
  .lang-btn {
    padding: 0.5rem;
  }
}
</style>
