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
}
</style>
