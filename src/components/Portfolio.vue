<script setup>
import { ref, onMounted, onUnmounted, h, defineComponent } from "vue";

const isVisible = ref(false);
const sectionEl = ref(null);
onMounted(() => {
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) isVisible.value = true;
    },
    { threshold: 0.2 }
  );
  if (sectionEl.value) obs.observe(sectionEl.value);
  onUnmounted(() => {
    if (sectionEl.value) obs.unobserve(sectionEl.value);
  });
});

const hoveredCard = ref(null);

const Icon = defineComponent({
  name: "Icon",
  props: {
    name: { type: String, required: true },
    class: { type: String, default: "" },
    size: { type: Number, default: 20 },
  },
  setup(props) {
    const paths = {
      code: [
        // Code2
        h("polyline", {
          points: "16 18 22 12 16 6",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
        h("polyline", {
          points: "8 6 2 12 8 18",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
      ],
      github: [
        // GitHub logo simplificado
        h("path", {
          d: "M12 .5a11.5 11.5 0 0 0-3.64 22.43c.58.11.79-.25.79-.56v-2.03c-3.23.7-3.91-1.41-3.91-1.41-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.74 1.27 3.41.97.11-.75.41-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.73 0-1.27.46-2.31 1.21-3.13-.12-.3-.53-1.52.11-3.17 0 0 .99-.32 3.24 1.2a11.3 11.3 0 0 1 5.9 0c2.25-1.52 3.24-1.2 3.24-1.2.64 1.65.23 2.87.11 3.17.75.82 1.21 1.86 1.21 3.13 0 4.45-2.72 5.43-5.31 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
          fill: "currentColor",
        }),
      ],
      external: [
        // ExternalLink
        h("path", {
          d: "M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("polyline", {
          points: "15 3 21 3 21 9",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("line", {
          x1: 10,
          y1: 14,
          x2: 21,
          y2: 3,
          stroke: "currentColor",
          "stroke-width": 2,
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

/* ===== Dados ===== */
const projects = [
  {
    id: 1,
    title: "MATRIX PORTFÓLIO",
    description:
      "Landing page desenvolvida em código puro e inspirada no universo digital da Matrix. Projeto focado em performance, UI/UX avançado e transições fluídas. Ideal para demonstrar domínio em front-end e manipulação de interface visual refinada.",
    tech: ["Vite", "VueJS", "JavaScript", "ES6+", "SASS", "Git"],
    status: "BETA",
    category: "FRONTEND",
    githubUrl: "https://github.com/fde95/portfolioDEVFE",
    demoUrl: "https://portfolio.devfe.com.br/",
  },
  {
    id: 2,
    title: "ACADEMIA GAVIÕES",
    description:
      "Site institucional completo e responsivo, com painel de informações dinâmico e integração entre filiais. Interface moderna, navegação intuitiva e tradução automática para diversos idiomas, garantindo acessibilidade e melhor ranqueamento.",
    tech: ["Joomla", "HTML 5", "CSS 3", "JavaScript", "jQuery"],
    status: "LIVE",
    category: "FULLSTACK",
    demoUrl: "https://www.academiagavioes.com.br/",
  },
  {
    id: 3,
    title: "SUPERIX — SOLUÇÕES WEB",
    description:
      "Redesign do site institucional da agência Superix, priorizando experiência imersiva e fluidez de navegação. Layout responsivo, leve e otimizado para SEO, reforçando a identidade visual e o posicionamento digital da marca.",
    tech: ["Joomla", "HTML 5", "CSS 3", "JavaScript", "jQuery"],
    status: "LIVE",
    category: "FULLSTACK",
    demoUrl: "https://www.superix.com.br/",
  },
  {
    id: 4,
    title: "NOVA IMAGEM",
    description:
      "Desenvolvimento de site institucional sob medida para empresa de manutenção hospitalar. Migração completa do CMS para código puro, garantindo leveza, segurança e um design moderno voltado à performance e usabilidade.",
    tech: ["Vite", "VueJS", "JavaScript", "ES6+", "SASS", "Git"],
    status: "DEVELOPMENT",
    category: "FRONTEND",
    githubUrl: "https://github.com/fde95/novaImagemVueJS",
    demoUrl: "https://novaimagem.com.br/",
  },
];

function statusClass(status) {
  switch (status) {
    case "DEPLOYED":
    case "LIVE":
      return "is-ok";
    case "BETA":
      return "is-warn";
    case "DEVELOPMENT":
      return "is-bad";
    default:
      return "is-muted";
  }
}
</script>

<template>
  <section id="portfolio" ref="sectionEl" class="section portfolio">
    <div class="container portfolio__container">
      <!-- Cabeçalho -->
      <header class="portfolio__header">
        <span class="portfolio__tag">[PROJETOS.DIR]</span>
        <h2
          class="cyber-title portfolio__title glitch"
          :data-text="'PORTFOLIO'"
        >
          PORTFOLIO
        </h2>
        <p class="portfolio__subtitle">
          Uma seleção dos meus projetos mais impactantes, demonstrando expertise
          em desenvolvimento full-stack e soluções inovadoras.
        </p>
      </header>

      <!-- Grid de projetos -->
      <div class="portfolio__grid">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="card--matrix project-card"
          :class="{ 'is-visible': isVisible }"
          :style="{ animationDelay: index * 200 + 'ms' }"
          @mouseenter="hoveredCard = project.id"
          @mouseleave="hoveredCard = null"
        >
          <!-- Cabeçalho do card -->
          <div class="project-card__head">
            <div class="project-card__cat">
              <Icon name="code" class="project-card__code-icon" />
              <span class="project-card__cat-text">{{ project.category }}</span>
            </div>

            <div class="project-card__status">
              <span
                class="project-card__status-dot"
                :class="statusClass(project.status)"
              ></span>
              <span
                class="project-card__status-text"
                :class="statusClass(project.status)"
              >
                {{ project.status }}
              </span>
            </div>
          </div>

          <!-- Título -->
          <h3 class="project-card__title">{{ project.title }}</h3>

          <!-- Descrição -->
          <p class="project-card__desc">
            {{ project.description }}
          </p>

          <!-- Tech stack -->
          <div class="project-card__tags">
            <span
              v-for="(t, i) in project.tech"
              :key="i"
              class="tag tag--tech"
              >{{ t }}</span
            >
          </div>

          <!-- Ações (links dinâmicos) -->
          <div class="project-card__actions">
            <a
              v-if="project.githubUrl"
              class="link-btn"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Abrir código no GitHub de ${project.title}`"
            >
              <Icon name="github" class="link-btn__icon" />
              <span class="link-btn__text">CODE</span>
            </a>

            <a
              v-if="project.demoUrl"
              class="link-btn"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Abrir demo de ${project.title}`"
            >
              <Icon name="external" class="link-btn__icon" />
              <span class="link-btn__text">DEMO</span>
            </a>
          </div>
          <!-- Overlay hover -->
          <div
            class="project-card__hover"
            :class="{ 'is-on': hoveredCard === project.id }"
            aria-hidden="true"
          />
        </article>
      </div>

      <!-- Botão “ver mais” -->
      <!-- <div
        class="portfolio__more"
        :class="{ 'is-visible': isVisible }"
        style="animation-delay: 800ms"
      >
        <button class="button--matrix">
          <span>VER TODOS OS PROJETOS</span>
        </button>
      </div> -->

      <!-- Terminal info -->
      <div
        class="portfolio__terminal"
        :class="{ 'is-visible': isVisible }"
        style="animation-delay: 1000ms"
      >
        <div class="card--matrix portfolio__terminal-card">
          <div class="portfolio__terminal-line">
            <span class="portfolio__prompt">user@portfolio:~$</span>
            <span class="portfolio__cmd">ls -la projects/</span>
          </div>
          <div class="portfolio__terminal-hint">
            total {{ projects.length }} projects found • showing featured work
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.portfolio {
  position: relative;

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }
  &__tag {
    display: inline-block;
    font: 400 0.75rem/1 "Fira Code", monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(var(--matrix-green));
  }
  &__title {
    margin-top: 1rem;
    font-size: clamp(2rem, 6vw, 3.75rem);
    font-weight: 900;
  }
  &__subtitle {
    margin: 1rem auto 0;
    max-width: 48rem;
    color: hsl(var(--matrix-white) / 0.7);
    line-height: 1.6;
    font-size: 1.05rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    @media (min-width: 880px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__more {
    text-align: center;
    margin-top: 3rem;
    opacity: 0;
    transform: translateY(24px);
    animation: fade-in-up 0.6s both;
    &.is-visible {
      opacity: 1;
      transform: none;
    }
  }

  &__terminal {
    margin-top: 4rem;
    opacity: 0;
    transform: translateY(24px);
    animation: fade-in-up 0.6s both;
    &.is-visible {
      opacity: 1;
      transform: none;
    }
  }
  &__terminal-card {
    padding: 1rem;
    font: 400 0.9rem/1.4 "Fira Code", monospace;
  }
  &__terminal-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  &__prompt {
    color: hsl(var(--matrix-green));
  }
  &__cmd {
    color: hsl(var(--matrix-white));
  }
  &__terminal-hint {
    color: hsl(var(--matrix-green) / 0.7);
    font-size: 0.8rem;
  }
}

.project-card {
  position: relative;
  padding: 1.5rem;
  cursor: pointer;
  transform: translateY(24px);
  opacity: 0;
  animation: fade-in-up 0.6s ease both;
  transition: transform 0.3s ease;

  //   &.is-visible {
  //     /* classe aplicada no container, animação já cuida do resto */
  //   }

  &:hover {
    transform: translateY(-2px);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  &__cat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__code-icon {
    width: 20px;
    height: 20px;
    color: hsl(var(--matrix-green));
  }
  &__cat-text {
    color: hsl(var(--matrix-green));
    font: 400 0.8rem/1 "Fira Code", monospace;
    letter-spacing: 0.08em;
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    display: inline-block;
  }
  &__status-text {
    font: 400 0.75rem/1 "Fira Code", monospace;
  }

  /* mapeamento de cores via modificadores */
  .is-ok {
    color: hsl(var(--matrix-green));
    background-color: transparent;
  }
  .is-warn {
    color: hsl(50 100% 50%);
  }
  .is-bad {
    color: hsl(var(--matrix-red));
  }
  .is-muted {
    color: hsl(var(--matrix-gray));
  }

  &__title {
    color: hsl(var(--matrix-green));
    font-weight: 800;
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
    transition: color 0.25s ease;
    &:hover {
      color: hsl(var(--matrix-green-bright));
    }
  }

  &__desc {
    color: hsl(var(--matrix-white) / 0.8);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .tag--tech {
    border: 1px solid hsl(var(--matrix-green) / 0.2);
    background: hsl(var(--matrix-green) / 0.1);
    color: hsl(var(--matrix-green));
    border-radius: var(--radius);
    padding: 0.25rem 0.5rem;
    font: 400 0.75rem/1 "Fira Code", monospace;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  .link-btn {
    display: flex;
    flex-wrap: nowrap;
    border: none;
    gap: 0.5rem;
    color: hsl(var(--matrix-green));
    transition: color 0.25s ease, transform 0.25s ease;
    scale: 0.9;
    &__text {
      font-size: 14px;
    }
    &__icon {
      width: 16px;
      height: 16px;
    }
    &:hover {
      color: white;
      scale: 0.95;
    }
  }

  &__hover {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: var(--radius);
    background: linear-gradient(90deg, hsla(120, 100%, 50%, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    &.is-on {
      opacity: 1;
    }
  }
}
</style>
