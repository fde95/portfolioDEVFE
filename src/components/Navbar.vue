<script setup></script>

<template>
  <nav class="container navbar">
    <!-- Logo -->
    <a href="#">
      <div class="navbar__logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-terminal  text-matrix-green"
          data-lov-id="src/components/Navigation.tsx:65:14"
          data-lov-name="Terminal"
          data-component-path="src/components/Navigation.tsx"
          data-component-line="65"
          data-component-file="Navigation.tsx"
          data-component-name="Terminal"
          data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-matrix-green%20group-hover%3Atext-matrix-green-bright%20transition-colors%22%7D"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" x2="20" y1="19" y2="19"></line>
        </svg>
        DEVFE.EXE
      </div>
    </a>

    <!-- Menu -->
    <ul class="navbar__menu">
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#about">Sobre</a>
      </li>
      <li>
        <a href="#portfolio">Projetos</a>
      </li>
      <li>
        <a href="#skills">Skills</a>
      </li>
      <li>
        <a href="#contact">Contato</a>
      </li>
    </ul>

    <!-- Button -->
    <button class="button button--matrix navbar__button">
      <a href="#">Contatar</a>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: sticky;

  &__logo {
    font-family: "Orbitron", monospace;
    font-weight: 700;
    display: flex;
    gap: 0.5rem;
  }

  &__menu {
    display: flex;
    gap: 2rem;
    font-family: "Fira Code", monospace;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  &__button {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}
</style>
