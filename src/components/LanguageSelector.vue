<!--
  Componente de Seleção de Idioma - Dropdown
  
  Permite ao usuário alternar entre os idiomas disponíveis:
  - Português (Brasil)
  - English (United States)
  - Español (España)
  
  Features:
  - Detecção automática do idioma do navegador
  - Persistência da escolha no localStorage
  - Dropdown compacto com bandeiras
  - Indicador visual do idioma ativo
-->

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Hook do vue-i18n para controlar o idioma
const { locale, availableLocales } = useI18n()

// Controle do dropdown
const isOpen = ref(false)

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
  
  // Atualizar lang do HTML para acessibilidade
  document.documentElement.setAttribute('lang', lang.split('-')[0])
  
  // Fechar dropdown
  isOpen.value = false
}

/**
 * Toggle do dropdown
 */
function toggleDropdown(event) {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

/**
 * Fechar dropdown ao clicar fora
 */
function handleClickOutside(event) {
  if (!event.target.closest('.lang-selector')) {
    isOpen.value = false
  }
}

// Lifecycle hooks para adicionar/remover listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="lang-selector">
    <!-- Botão do dropdown -->
    <button
      class="lang-btn"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      :aria-label="`Idioma atual: ${languages[locale].fullName}`"
    >
      <span class="lang-flag">{{ languages[locale].flag }}</span>
      <span class="lang-name">{{ languages[locale].name }}</span>
      <svg 
        class="lang-chevron" 
        :class="{ 'is-open': isOpen }"
        width="12" 
        height="12" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Menu dropdown -->
    <div 
      class="lang-dropdown" 
      :class="{ 'is-open': isOpen }"
      role="menu"
    >
      <button
        v-for="lang in availableLocales"
        :key="lang"
        @click="changeLanguage(lang)"
        class="lang-option"
        :class="{ 'is-active': locale === lang }"
        :aria-label="`Mudar idioma para ${languages[lang].fullName}`"
        role="menuitem"
      >
        <span class="lang-option__flag">{{ languages[lang].flag }}</span>
        <span class="lang-option__name">{{ languages[lang].fullName }}</span>
        <span v-if="locale === lang" class="lang-option__check">✓</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lang-selector {
  position: relative;
  display: inline-block;
}

/* Botão principal do dropdown */
.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid hsl(var(--matrix-green) / 0.3);
  border-radius: var(--radius);
  background: transparent;
  color: hsl(var(--matrix-white) / 0.7);
  font: 400 0.85rem/1 'Fira Code', monospace;
  cursor: pointer;
  transition: all 0.25s ease;
  min-width: 80px;

  &:hover {
    border-color: hsl(var(--matrix-green));
    color: hsl(var(--matrix-green));
    box-shadow: 0 0 10px hsl(var(--matrix-green) / 0.3);
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

.lang-chevron {
  margin-left: auto;
  transition: transform 0.25s ease;
  
  &.is-open {
    transform: rotate(180deg);
  }
}

/* Dropdown menu */
.lang-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 160px;
  background: hsl(var(--matrix-black) / 0.98);
  border: 1px solid hsl(var(--matrix-green) / 0.3);
  border-radius: var(--radius);
  box-shadow: 0 4px 20px hsl(var(--matrix-black) / 0.5),
              0 0 15px hsl(var(--matrix-green) / 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.25s ease;
  z-index: 100;
  overflow: hidden;

  &.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* Opções do dropdown */
.lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: hsl(var(--matrix-white) / 0.7);
  font: 400 0.85rem/1 'Fira Code', monospace;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: hsl(var(--matrix-green) / 0.1);
    color: hsl(var(--matrix-green));
  }

  &.is-active {
    background: hsl(var(--matrix-green) / 0.15);
    color: hsl(var(--matrix-green));
  }

  &:not(:last-child) {
    border-bottom: 1px solid hsl(var(--matrix-green) / 0.1);
  }
}

.lang-option__flag {
  font-size: 1.2rem;
  line-height: 1;
}

.lang-option__name {
  flex: 1;
}

.lang-option__check {
  color: hsl(var(--matrix-green));
  font-weight: 700;
}

/* Responsividade mobile */
@media (max-width: 768px) {
  .lang-selector {
    width: 100%;
  }

  .lang-btn {
    width: 100%;
    justify-content: space-between;
  }

  .lang-dropdown {
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>
