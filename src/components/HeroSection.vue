<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  // estado relativo
  const displayText = ref('')
  const currentIndex = ref(0)
  const showCursor = ref(true)

  const fullText = "Desenvolvedor Front-end"
  const subtitle = "Transformando ideias em experiências digitais extraordinárias"

  let typingTimeout = null
  let cursorInterval = null

  // efeito de digitação
  const typeWriter = () => {
    if (currentIndex.value < fullText.length) {
      typingTimeout = setTimeout (() => {
        displayText.value += fullText[currentIndex.value]
        currentIndex.value++
        typeWriter()
      }, 100)
    }
  }

  // cursor piscando
  const startCursorBlink = () => {
    cursorInterval = setInterval(() => {
      showCursor.value = !showCursor.value
    }, 500)
  }

  // ciclo de vida
  onMounted(() => {
    typeWriter()
    startCursorBlink()
  })
  onUnmounted(() => {
    clearTimeout(typingTimeout)
    clearInterval(cursorInterval)
  })
</script>
<template>
  <section class="hero container">
    <h1 class="glitch cyber-title leading-tigh hero__title" :data-text="displayText">
      {{ displayText }}<span v-if="showCursor" class="hero__cursor">|</span>
    </h1>
    <p
      class="hero__subtitle terminal-text "
    >
        {{ subtitle }}
    </p>
    <div class="flex hero__buttons">
      <button class="button button--matrix">
        <a href="#">Ver Projetos</a>
      </button>
      <button class="button button--matrix">
        <a href="#">Baixar CV</a>
      </button>
    </div>
    <div class="hero__card card--matrix">
      <div class="hero__card__header">
        <div class="hero__card__header--bullets">
          <div class="bg-matrix-red"></div>
          <div class="bg-matrix-yellow"></div>
          <div class="bg-matrix-green"></div>
        </div>
        <div class="hero__card_header--title">
          <span class="text-matrix-gray">
            Terminal
          </span>
        </div>
      </div>
      <div class="hero__card__body">
        <span>
          user@portfolio:~$ 
          <span class="text-matrix-white">whoami</span>
        </span>
        <p>
          felipe.espinoza <br/>
          ➜ Desenvolvedor Front-End focado em código limpo e semântico <br/>
          ➜ Especialista em Vue.js, JavaScript (ES6+) e Vite <br/>
          ➜ Experiência com SCSS (BEM), animações e interfaces performáticas <br/>
          ➜ Criador de soluções digitais práticas e experiências web impactantes
        </p>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.hero {
  text-align: center;
  position: relative;
  max-width: 56rem;
  padding: 3rem 0;
  &__title {
    font-size: 6rem;
    line-height: 1;
    margin-bottom: 3rem;
  }
  &__subtitle {
    font-size: 1.5rem;
    line-height: 2;
    margin-bottom: 2rem;
    opacity: 0.8;
  }
  &__buttons {
    margin-bottom: 3rem;
  }
  &__card{
    text-align: start;
    font-size: .875rem;
    line-height: 1.5rem;
    max-width: 41rem;
    margin: 0 auto;
    &__header{
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      &--bullets{
        display: flex;
      }
      &__body{
        color: var(--matrix-green);
      }
    }
  }
}
</style>
