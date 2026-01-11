# 🌍 Guia de Internacionalização (i18n)

## Visão Geral

Este portfólio agora possui suporte completo para **3 idiomas**:
- 🇧🇷 **Português (Brasil)** - `pt-BR` (padrão)
- 🇺🇸 **English (United States)** - `en-US`
- 🇪🇸 **Español (España)** - `es-ES`

O sistema detecta automaticamente o idioma do navegador do usuário e carrega as traduções apropriadas.

## 📁 Estrutura de Arquivos

```
src/
├── i18n/
│   ├── index.js              # Configuração do Vue I18n
│   └── locales/
│       ├── pt-BR.json        # Traduções em Português
│       ├── en-US.json        # Traduções em Inglês
│       └── es-ES.json        # Traduções em Espanhol
├── components/
│   └── LanguageSelector.vue  # Seletor de idioma com bandeiras
└── main.js                   # Registro do plugin i18n
```

## 🚀 Como Funciona

### 1. Detecção Automática de Idioma

O sistema segue esta prioridade:

1. **Preferência salva**: Se o usuário já escolheu um idioma, usa o `localStorage`
2. **Idioma do navegador**: Detecta via `navigator.language`
3. **Fallback**: Português (pt-BR) como padrão

```javascript
// src/i18n/index.js
function getBrowserLocale() {
  const savedLocale = localStorage.getItem('preferred-language')
  if (savedLocale) return savedLocale
  
  const navigatorLocale = navigator.language
  // ... mapeia para os idiomas disponíveis
}
```

### 2. Seletor de Idioma

O componente `LanguageSelector.vue` permite alternar entre idiomas:

```vue
<template>
  <LanguageSelector />
</template>
```

**Localização atual**: Navbar (canto superior direito)

### 3. Usando Traduções nos Componentes

#### Importar e usar:

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('hero.title') }}</h1>
  <p>{{ t('about.bio.paragraph1', { years: 4 }) }}</p>
</template>
```

#### Computed para valores reativos:

```vue
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('about.features.cleanCode.title'),
    description: t('about.features.cleanCode.description')
  }
])
</script>
```

## 📝 Como Adicionar Novas Traduções

### 1. Adicionar chave nos arquivos JSON

**pt-BR.json:**
```json
{
  "novaSecao": {
    "titulo": "Meu Título",
    "descricao": "Minha descrição"
  }
}
```

**en-US.json:**
```json
{
  "novaSecao": {
    "titulo": "My Title",
    "descricao": "My description"
  }
}
```

**es-ES.json:**
```json
{
  "novaSecao": {
    "titulo": "Mi Título",
    "descricao": "Mi descripción"
  }
}
```

### 2. Usar no componente

```vue
<template>
  <h2>{{ t('novaSecao.titulo') }}</h2>
  <p>{{ t('novaSecao.descricao') }}</p>
</template>
```

## 🎯 Interpolação de Variáveis

Use `{}` para variáveis dinâmicas:

**JSON:**
```json
{
  "about": {
    "bio": {
      "paragraph1": "Com {years} anos de experiência..."
    }
  }
}
```

**Vue:**
```vue
<p>{{ t('about.bio.paragraph1', { years: yearsExperience }) }}</p>
```

## 🔧 Componentes Atualizados

Todos os componentes principais foram atualizados para suportar i18n:

- ✅ **HeroSection.vue** - Título, subtítulo, CTAs, terminal
- ✅ **About.vue** - Biografia, features, meta informações
- ✅ **Portfolio.vue** - Projetos, descrições, status
- ✅ **Skills.vue** - Categorias, summary
- ✅ **Contact.vue** - Informações de contato, status
- ✅ **Footer.vue** - Navegação, status, copyright
- ✅ **Navbar.vue** - Menu de navegação + LanguageSelector

## 🌐 Como Adicionar um Novo Idioma

### 1. Criar arquivo de tradução

```bash
src/i18n/locales/fr-FR.json
```

### 2. Atualizar index.js

```javascript
import fr from './locales/fr-FR.json'

const i18n = createI18n({
  // ...
  messages: {
    'pt-BR': pt,
    'en-US': en,
    'es-ES': es,
    'fr-FR': fr  // Novo idioma
  }
})
```

### 3. Atualizar LanguageSelector.vue

```javascript
const languages = {
  'pt-BR': { name: 'PT', flag: '🇧🇷', fullName: 'Português' },
  'en-US': { name: 'EN', flag: '🇺🇸', fullName: 'English' },
  'es-ES': { name: 'ES', flag: '🇪🇸', fullName: 'Español' },
  'fr-FR': { name: 'FR', flag: '🇫🇷', fullName: 'Français' }  // Novo
}
```

### 4. Atualizar mapeamento no index.js

```javascript
const localeMap = {
  'pt': 'pt-BR',
  'en': 'en-US',
  'es': 'es-ES',
  'fr': 'fr-FR'  // Novo
}
```

## 🐛 Troubleshooting

### Tradução não aparece

1. Verifique se a chave existe em **todos** os arquivos de idioma
2. Certifique-se de usar a sintaxe correta: `t('chave.subchave')`
3. Para computed values, use `.value` ao acessar

### Idioma não muda

1. Limpe o localStorage: `localStorage.removeItem('preferred-language')`
2. Verifique o console do navegador para erros
3. Recarregue a página (Ctrl + Shift + R)

### Efeito de digitação quebra ao mudar idioma

O HeroSection já está preparado com `watch` para recriar o efeito:

```javascript
watch(fullText, () => {
  startTypeEffect()
})
```

## 📚 Recursos

- **Vue I18n Docs**: https://vue-i18n.intlify.dev/
- **Composition API**: https://vue-i18n.intlify.dev/guide/advanced/composition.html

## ✨ Boas Práticas

1. ✅ Sempre use `computed()` para listas/arrays que dependem de traduções
2. ✅ Mantenha as chaves organizadas por seção/componente
3. ✅ Use nomes descritivos para as chaves
4. ✅ Teste em todos os 3 idiomas antes de commitar
5. ✅ Mantenha a consistência de tradução entre idiomas

---

**Desenvolvido com ❤️ para um portfólio verdadeiramente global!** 🌍
