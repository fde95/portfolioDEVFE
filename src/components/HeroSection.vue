<script setup></script>
<template>
  <section class="hero container">
    <h1 class="glitch cyber-title leading-tigh hero__title">
      Desenvolvedor
      <br />
      <span>Front-end</span>
    </h1>
    <p
      class="hero__subtitle terminal-text "
    >
      Transformando ideias em experiências digitais extraordinárias
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
