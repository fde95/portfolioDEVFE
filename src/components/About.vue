<script setup>
import { ref, onMounted, onUnmounted, h, defineComponent, computed } from "vue";

const isVisible = ref(false);
const sectionEl = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) isVisible.value = true;
    },
    { threshold: 0.3 }
  );
  if (sectionEl.value) observer.observe(sectionEl.value);
  onUnmounted(() => {
    if (sectionEl.value) observer.unobserve(sectionEl.value);
  });
});

const Icon = defineComponent({
  name: "Icon",
  props: {
    name: { type: String, required: true },
    class: { type: String, default: "" },
    size: { type: Number, default: 24 },
  },
  setup(props) {
    const paths = {
      code: [
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
      zap: [
        h("polygon", {
          points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
      ],
      users: [
        h("path", {
          d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
        h("circle", {
          cx: 9,
          cy: 7,
          r: 4,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("path", {
          d: "M22 21v-2a4 4 0 0 0-3-3.87",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
        h("path", {
          d: "M16 3.13a4 4 0 0 1 0 7.75",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
      ],
      target: [
        h("circle", {
          cx: 12,
          cy: 12,
          r: 10,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("circle", {
          cx: 12,
          cy: 12,
          r: 6,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("circle", {
          cx: 12,
          cy: 12,
          r: 2,
          fill: "none",
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

const features = [
  {
    icon: "code",
    title: "Código Limpo",
    description: "Desenvolvimento com padrões de qualidade e melhores práticas",
  },
  {
    icon: "zap",
    title: "Performance",
    description: "Aplicações otimizadas para máxima velocidade e eficiência",
  },
  {
    icon: "users",
    title: "UX/UI Focado",
    description: "Interfaces intuitivas que conectam usuários aos produtos",
  },
  {
    icon: "target",
    title: "Resultados",
    description: "Soluções que geram impacto real nos negócios dos clientes",
  },
];

const START_YEAR = 2022
const yearsExperience = computed(() => {
  const y = new Date().getFullYear() - START_YEAR
  return Math.max(0, y)
})
</script>

<template>
  <section id="about" ref="sectionEl" class="section about">
    <div class="container about__container">
      <header class="about__header">
        <span class="about__tag">[SOBRE.EXE]</span>
        <h2 class="cyber-title about__title glitch" :data-text="'QUEM SOU EU'">
          QUEM SOU EU
        </h2>
      </header>

      <div class="about__grid">
        <div class="about__bio" :class="{ 'is-visible': isVisible }">
          <div class="card--matrix about__card">
            <div class="about__card-head">
              <span class="about__dot about__dot--red"></span>
              <span class="about__dot about__dot--yellow"></span>
              <span class="about__dot about__dot--green"></span>
              <span class="about__file">about.md</span>
            </div>

            <div class="about__card-body">
              <p class="about__line about__line--title">
                # Desenvolvedor Front-End
              </p>
              <p class="about__line">
                Com {{ yearsExperience }} anos de experiência, participei de
                projetos que exigiram alta performance e interfaces modernas
                para grandes empresas de diversos setores. Tenho
                como foco criar soluções escaláveis, com código limpo e
                centradas na experiência do usuário.
              </p>
              <p class="about__line">
                Atualmente, como Desenvolvedor Pleno na Verisure, aplico as
                melhores práticas e tecnologias do mercado para transformar
                ideias complexas em interfaces simples, intuitivas e de alto
                desempenho. Unindo usabilidade, performance e inovação em cada
                entrega.
              </p>

              <div class="about__meta">
                <p class="about__meta-line">
                  <span class="about__meta-key">→ location:</span> São Paulo,
                  Brasil
                </p>
                <p class="about__meta-line">
                  <span class="about__meta-key">→ email:</span>
                  <a class="about__link" href="mailto:contato@devfe.com.br"
                    >contato@devfe.com.br</a
                  >
                </p>
                <p class="about__meta-line">
                  <span class="about__meta-key">→ status:</span> Disponível para
                  projetos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="about__features" :class="{ 'is-visible': isVisible }">
          <div
            v-for="(f, i) in features"
            :key="f.title"
            class="card--matrix feature"
            :style="{ animationDelay: i * 150 + 'ms' }"
          >
            <div class="feature__row">
              <div class="feature__icon-square">
                <Icon :name="f.icon" class="feature__icon" />
              </div>
              <div class="feature__content">
                <h3 class="feature__title">{{ f.title }}</h3>
                <p class="feature__desc">{{ f.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about__bg-code" aria-hidden="true">
        <div class="about__bg-block" v-for="i in 20" :key="i">
          <span
            v-for="j in 80"
            :key="j"
            :class="['about__bg-char', Math.random() > 0.7 ? 'is-bright' : '']"
          >
            {{ Math.random() > 0.5 ? "1" : "0" }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.about {
  position: relative;

  &__container {
    position: relative;
  }

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
    opacity: 0.9;
  }

  &__title {
    margin-top: 1rem;
    font-weight: 900;
    font-size: clamp(2rem, 6vw, 3.75rem);
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center !important;
    cursor: default;

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
  }

  &__link {
    &:hover {
      color: hsl(var(--matrix-white));
    }
  }

  &__bio {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__card {
    padding: 2rem;
  }

  &__card-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  &__dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    display: inline-block;
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
    font: 400 0.875rem/1 "Fira Code", monospace;
  }

  &__card-body {
    display: grid;
    gap: 1rem;
  }
  &__line {
    color: hsl(var(--matrix-white));
    opacity: 0.9;
    line-height: 1.7;
    font-size: 0.95rem;
  }
  &__line--title {
    color: hsl(var(--matrix-green));
  }

  &__meta {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--matrix-green) / 0.2);
  }
  &__meta-line {
    color: hsl(var(--matrix-green));
    font-size: 0.95rem;
  }
  &__meta-key {
    color: hsl(var(--matrix-gray));
    margin-right: 0.35rem;
  }

  &__features {
    opacity: 0;
    transform: translateX(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    &.is-visible {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &__bg-code {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 0.05;
    @media (max-width: 767.98px) {
      display: none !important;
    }
  }
  &__bg-block {
    font: 400 0.75rem/1 "Fira Code", monospace;
    white-space: nowrap;
    color: hsl(var(--matrix-green));
  }
  &__bg-char.is-bright {
    color: hsl(var(--matrix-green-bright));
  }
}

.feature {
  padding: 1.5rem;
  transition: transform 0.3s ease;
  animation: fade-in-up 0.6s both;
  margin-bottom: 1.5rem;
  cursor: default;
  &:hover {
    transform: scale(1.03);
  }

  &__row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__icon-square {
    flex: 0 0 3rem;
    height: 3rem;
    border: 1px solid hsl(var(--matrix-green) / 0.3);
    display: grid;
    place-items: center;
    border-radius: var(--radius);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    .feature:hover & {
      border-color: hsl(var(--matrix-green));
      box-shadow: var(--shadow-matrix);
    }
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    color: hsl(var(--matrix-green));
  }

  &__content {
    display: grid;
    gap: 0.25rem;
  }
  &__title {
    color: hsl(var(--matrix-green));
    font-weight: 800;
    font-size: 1.05rem;
  }
  &__desc {
    color: hsl(var(--matrix-white) / 0.8);
    line-height: 1.6;
    font-size: 0.95rem;
  }
}
</style>
