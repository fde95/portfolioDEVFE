<script setup>
import { ref, onMounted, onUnmounted, h, defineComponent } from "vue";

/* Texto e efeitos */
const fullText = "DESENVOLVEDOR FRONT-END";
const subtitle =
  "Transformando ideias em experiências digitais extraordinárias";
const displayText = ref("");
const showCursor = ref(true);
const cvUrl = "/#contact"; // ajuste se necessário

let typeInterval = null;
let cursorInterval = null;

onMounted(() => {
  // efeito de digitação
  let i = 0;
  typeInterval = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText[i];
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);

  // cursor blink
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
});

onUnmounted(() => {
  clearInterval(typeInterval);
  clearInterval(cursorInterval);
});

/* navegação suave */
function scrollTo(href) {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

/* ícone inline */
const Icon = defineComponent({
  name: "Icon",
  props: {
    name: { type: String, required: true },
    class: { type: String, default: "" },
    size: { type: Number, default: 32 },
  },
  setup(props) {
    const paths = {
      "chevron-down": [
        h("polyline", {
          points: "6 9 12 15 18 9",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
      ],
    };
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          width: props.size,
          height: props.size,
          class: props.class,
        },
        paths[props.name] || []
      );
  },
});
</script>

<template>
  <section class="hero">
    <!-- Conteúdo -->
    <div class="container hero__container">
      <div class="hero__content">
        <!-- Título com glitch -->
        <h1 class="cyber-title glitch hero__title" :data-text="displayText">
          {{ displayText }}<span v-if="showCursor" class="hero__cursor">|</span>
        </h1>

        <!-- Subtítulo -->
        <p class="terminal-text hero__subtitle">
          {{ subtitle }}
        </p>

        <!-- CTAs -->
        <div class="hero__ctas">
          <button
            class="button--matrix hero__btn"
            @click="scrollTo('#portfolio')"
          >
            <span>VER PROJETOS</span>
          </button>
          <a
            class="button--matrix hero__btn"
            :href="cvUrl"
            rel="noopener"
          >
            <span>CONTRATAR</span>
          </a>
        </div>

        <!-- Terminal info -->
        <div class="card--matrix hero__terminal">
          <div class="hero__term-head">
            <span class="hero__dot hero__dot--red"></span>
            <span class="hero__dot hero__dot--yellow"></span>
            <span class="hero__dot hero__dot--green"></span>
            <span class="hero__file">terminal</span>
          </div>

          <div class="hero__term-lines">
            <div>
              <span class="hero__prompt">user@portfolio:~$</span>
              <span class="hero__cmd">whoami</span>
            </div>
            <div class="hero__term-line">felipe.spinoza</div>
            <div class="hero__term-line">
              → Desenvolvedor Front-End focado em código limpo e semântico
            </div>
            <div class="hero__term-line">
              → Especialista em Vue.js, JavaScript (ES6+) e Vite
            </div>
            <div class="hero__term-line">
              → Experiência com SCSS (BEM), animações e interfaces performáticas
            </div>
            <div class="hero__term-line">
              → Criador de soluções digitais práticas e experiências web
              impactantes
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicador de scroll -->
    <button
      class="hero__scroll"
      @click="scrollTo('#about')"
      aria-label="Ir para a próxima seção"
    >
      <Icon name="chevron-down" class="hero__scroll-icon" />
    </button>

    <!-- Grid de fundo -->
    <div class="hero__bg">
      <div class="hero__bg-grid"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  margin-top: 2.8rem;
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;

  &__container {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  &__content {
    text-align: center;
    margin: 0 auto;
    max-width: 64rem;
    padding: 0 1rem;
  }

  &__title {
    font-weight: 900;
    font-size: clamp(2.2rem, 6vw, 5rem);
    line-height: 1.1;
    margin-bottom: 2rem;
  }
  &__cursor {
    color: hsl(var(--matrix-green));
  }

  &__subtitle {
    margin: 0 auto 3rem;
    opacity: 0.8;
    font-size: clamp(1rem, 2.5vw, 1.35rem);
    animation: fade-in-up 0.6s 0.9s both;
  }

  &__ctas {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 3.5rem;
    animation: fade-in-up 0.6s 1.2s both;
  }
  &__btn {
    padding: 0.75rem 2rem;
  }

  /* terminal */
  &__terminal {
    margin: 0 auto;
    max-width: 41rem;
    padding: 1.25rem;
    font: 400 0.9rem/1.5 "Fira Code", monospace;
    animation: fade-in-up 0.6s 1.5s both;
    text-align: left;
  }
  &__term-head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }
  &__dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    &--red {
      background: hsl(var(--matrix-red));
    }
    &--yellow {
      background: hsl(50 100% 50%);
    }
    &--green {
      background: hsl(var(--matrix-green));
    }
  }
  &__file {
    margin-left: 0.75rem;
    color: hsl(var(--matrix-gray));
    font-size: 0.85rem;
  }
  &__prompt {
    color: hsl(var(--matrix-green));
  }
  &__cmd {
    color: hsl(var(--matrix-white));
    margin-left: 0.5rem;
  }
  &__term-line {
    color: hsl(var(--matrix-green));
  }

  /* scroll down */
  &__scroll {
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    animation: bounce 1.6s infinite;
    color: hsl(var(--matrix-green));
    transition: color 0.25s ease;
    z-index: 1;
    border: none;
    &:hover {
      color: hsl(var(--matrix-green-bright));
    }
  }
  &__scroll-icon {
    width: 2rem;
    height: 2rem;
  }

  /* fundo em grid */
  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  &__bg-grid {
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}

/* animações reutilizadas */
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, -8px);
  }
  60% {
    transform: translate(-50%, -4px);
  }
}
/* fade-in-up já existe no seu global; se não, descomente:
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
*/
</style>
